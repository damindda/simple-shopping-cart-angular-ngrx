import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { checkAuthAction } from 'src/app/store/products/actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {


  authform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitted: boolean = false;
  errorvalues: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {

  }

  checkAuth() {
    this.submitted = true;

    if(this.authform.valid) {
      const useremail: string = this.authform.value.email.toLowerCase();
      this.store.dispatch(checkAuthAction({ email: useremail }));
    } else {
      this.errorvalues = true;
    }

  }

  get formvalues() {
    return this.authform.controls;
  }

}


