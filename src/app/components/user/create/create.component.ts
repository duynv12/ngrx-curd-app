import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActionTypes, Create} from '../../../store/user/user.actions';
import {Store} from '@ngrx/store';
import * as fromUsers from '../../../store/user/user.reducers';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {

  public formErrors = {
    name: '',
    email: ''
  };

  getUsers: Observable<any>;
  subscription: Subscription;

  createUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private store: Store<fromUsers.State>,
              private router: Router) {
    this.getUsers = this.store.select('userReducers');
  }

  ngOnInit() {
    this.subscription = this.getUsers.subscribe(res => {
      if (res) {
        console.log(res);
        switch (res.action) {
          case  ActionTypes.CreateSuccess:
            this.router.navigateByUrl('/');
            break;
          case  ActionTypes.CreateErr:
            break;
          default:
            break;
        }
      }
    });
  }

  submitForm() {
    for (const field in this.createUserForm.controls) {
      if (this.createUserForm.controls.hasOwnProperty(field)) {
        if (!this.createUserForm.controls[field].errors) {
          this.formErrors[field] = '';
        } else {
          for (const errorName in this.createUserForm.controls[field].errors) {
            if (this.createUserForm.controls[field].errors.hasOwnProperty(errorName)) {
              if (this.createUserForm.controls[field].errors[errorName]) {
                if (field === 'name' && errorName === 'required') {
                  this.formErrors[field] = 'Name must be required';
                } else if (field === 'email' && errorName === 'required') {
                  this.formErrors[field] = 'Email must be required';
                } else if (field === 'email' && errorName === 'email') {
                  this.formErrors[field] = 'Email format error';
                }
              }
            }
          }
        }
      }
    }

    if (!this.formErrors.email && !this.formErrors.name) {
      const user = {
        name: this.createUserForm.controls.name.value,
        email: this.createUserForm.controls.email.value
      };

      this.store.dispatch(new Create(user));
    }
  }

  back() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
