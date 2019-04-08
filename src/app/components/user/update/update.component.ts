import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActionTypes, LoadUser, Update} from '../../../store/user/user.actions';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as fromUsers from '../../../store/user/user.reducers';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../../models/user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {

  getUsers: Observable<any>;
  subscription: Subscription;
  user = new User();
  public formErrors = {
    name: '',
    email: ''
  };

  public userId: string;

  updateUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<fromUsers.State>,
              private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.getUsers = this.store.select('userReducers');
    });
  }

  ngOnInit() {
    this.loadData();
    this.subscription = this.getUsers.subscribe(res => {
      if (res) {
        console.log(res);
        switch (res.action) {
          case ActionTypes.Detail:
            this.user = res.selected;
            if (this.user) {
              this.updateUserForm.setValue({
                name: this.user.name,
                email: this.user.email
              });
            }
            break;
          case  ActionTypes.UpdateSuccess:
            this.router.navigateByUrl('/');
            break;
          case  ActionTypes.UpdateErr:
            break;
          default:
            break;
        }
      }
    });
  }

  loadData() {
    this.store.dispatch(new LoadUser(this.userId));
  }

  submitForm() {
    for (const field in this.updateUserForm.controls) {
      if (this.updateUserForm.controls.hasOwnProperty(field)) {
        if (!this.updateUserForm.controls[field].errors) {
          this.formErrors[field] = '';
        } else {
          for (const errorName in this.updateUserForm.controls[field].errors) {
            if (this.updateUserForm.controls[field].errors.hasOwnProperty(errorName)) {
              if (this.updateUserForm.controls[field].errors[errorName]) {
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
        id: this.userId,
        name: this.updateUserForm.controls.name.value,
        email: this.updateUserForm.controls.email.value
      };

      this.store.dispatch(new Update(user));
    }
  }

  back() {
    window.history.back();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
