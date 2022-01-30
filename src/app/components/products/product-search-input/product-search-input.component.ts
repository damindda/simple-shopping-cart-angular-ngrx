import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { clearStoreDataAction, updateKeywordAction } from 'src/app/store/products/actions';

@Component({
  selector: 'app-product-search-input',
  templateUrl: './product-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSearchInputComponent implements OnInit {
  keyword$ = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.getFilteredData();
  }

  getSearchedResults(text: string) {
    this.keyword$.next(text.trim());
    console.log(text);
  }

  getFilteredData() {
    this.keyword$
      .pipe(
        filter((text) => !text || text?.length > 2),
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((data) => {
        this.keyword$.next(data);
        this.store.dispatch(clearStoreDataAction());
        this.store.dispatch(updateKeywordAction({ keyword: data }));
      });

  }
}
