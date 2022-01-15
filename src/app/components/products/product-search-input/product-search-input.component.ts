import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter
} from 'rxjs';

@Component({
  selector: 'app-product-search-input',
  templateUrl: './product-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchInputComponent implements OnInit {

  keyword$ = new BehaviorSubject<string>('');

  constructor() { }

  ngOnInit(): void {
    this.keyword$
    .pipe(
      filter((text) => !text || text?.length > 2),
      debounceTime(1000),
      distinctUntilChanged(),
    )
    .subscribe((data) => {
      this.keyword$.next(data);
      console.log('value', data);
    });
  }

  getSearchedResults(text: string) {
    this.keyword$.next(text);
  }

}
