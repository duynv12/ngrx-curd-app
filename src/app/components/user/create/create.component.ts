import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {Create, Delete} from '../../../store/user/user.actions';
import {Store} from '@ngrx/store';
import * as fromUsers from '../../../store/user/user.reducers';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public formErrors = {
    name: '',
    email: ''
  };

  createUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder,
              private store: Store<fromUsers.State>) {
  }

  ngOnInit() {
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

}
