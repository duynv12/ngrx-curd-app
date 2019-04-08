import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs';
import {UserService} from '../../services/user.service';
import {
  ActionTypes,
  Delete,
  DeleteErr,
  GetUsers,
  DeleteSuccess,
  Create,
  Update,
  UpdateErr,
  UpdateSuccess,
  CreateErr,
  CreateSuccess,
  LoadUser,
  GetUser
} from './user.actions';
import {mergeMap, map, switchMap, catchError} from 'rxjs/operators';
import {User} from '../../models/user';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {
  }

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Load),
    mergeMap(() => this.userService.getUsers().pipe(
      map((res) => {
        return new GetUsers(res);
      })
    ))
  );

  @Effect()
  getUserById$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.LoadUser),
    mergeMap((action: LoadUser) => {
      return this.userService.getUserById(action.id).pipe(
        map((res) => {
          const data = (res[0]) ? res[0] : res;
          return new GetUser(data);
        })
      );
    })
  );

  @Effect()
  createGame$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Create),
    map((action: Create) => action.payload),
    switchMap((user) => this.userService.add(user)),
    map((res) => new CreateSuccess(res.id)),
    catchError((err) => [new CreateErr(err)]),
  );

  @Effect()
  updateUser$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Update),
    map((action: Update) => action.payload),
    switchMap((user) => this.userService.update(user)),
    map(() => new UpdateSuccess()),
    catchError((err) => [new UpdateErr(err)]),
  );

  @Effect()
  deleteUsers$: Observable<Action> = this.actions$.pipe(
    ofType(ActionTypes.Delete),
    map((action: Delete) => action.payload),
    switchMap((user) => this.userService.delete(user)),
    map((user: User) => new DeleteSuccess(user)),
    catchError((err) => [new DeleteErr(err)]),
  );
}
