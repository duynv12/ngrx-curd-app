import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {Delete, LoadUsers} from '../../../store/user/user.actions';
import * as fromUsers from '../../../store/user/user.reducers';
import {User} from '../../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  getUsers: Observable<any>;
  subscription: Subscription;
  users: any;
  errors: any;

  constructor(private store: Store<fromUsers.State>,
              private router: Router) {
    // Get data from store
    this.getUsers = this.store.select('userReducers');
  }

  ngOnInit() {
    this.loadUser();
    this.subscription = this.getUsers.subscribe(res => {
      if (res) {
        console.log(res);
        this.errors = res.error;
        this.users = res.data;
      }
    });
  }

  addUser() {
    this.router.navigateByUrl('user/create');
  }


  editUser(user: User) {
    this.router.navigateByUrl('user/edit/' + user.id);
  }

  deleteUser(user: User) {
    this.store.dispatch(new Delete(user));
  }

  /**
   * Call effect load data from service
   */
  loadUser() {
    this.store.dispatch(new LoadUsers());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
