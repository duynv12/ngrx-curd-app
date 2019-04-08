import {Action} from '@ngrx/store';

export enum ActionTypes {
  Load = '[User Component] Load',
  LoadUser = '[User Component] LoadUser',
  List = '[User Component] List',
  Detail = '[User Component] Detail',
  Create = '[User Component] Create',
  CreateErr = '[User Component] CreateErr',
  CreateSuccess = '[User Component] CreateSuccess',
  Update = '[User Component] Update',
  UpdateErr = '[User Component] UpdateErr',
  UpdateSuccess = '[User Component] UpdateSuccess',
  Delete = '[User Component] Delete',
  DeleteErr = '[User Component] DeleteErr',
  DeleteSuccess = '[User Component] DeleteSuccess'
}

export class LoadUsers {
  readonly type = ActionTypes.Load;
}

export class LoadUser {
  readonly type = ActionTypes.LoadUser;
  constructor(public id: string) {}
}

export class GetUsers implements Action {
  readonly type = ActionTypes.List;
  constructor(public payload: any) {}
}

export class GetUser implements Action {
  readonly type = ActionTypes.Detail;
  constructor(public payload: any) {}
}

export class Create implements Action {
  readonly type = ActionTypes.Create;
  constructor(public payload: any) {}
}
export class CreateSuccess implements Action {
  readonly type = ActionTypes.CreateSuccess;
  constructor(public payload: any) {}
}

export class CreateErr implements Action {
  readonly type = ActionTypes.CreateErr;
  constructor(public payload: any) {}
}
export class Update implements Action {
  readonly type = ActionTypes.Update;
  constructor(public payload: any) {}
}
export class UpdateSuccess implements Action {
  readonly type = ActionTypes.UpdateSuccess;
}

export class UpdateErr implements Action {
  readonly type = ActionTypes.UpdateErr;
  constructor(public payload: any) {}
}
export class Delete implements Action {
  readonly type = ActionTypes.Delete;
  constructor(public payload: any) {}
}
export class DeleteSuccess implements Action {
  readonly type = ActionTypes.DeleteSuccess;
  constructor(public payload: any) {}
}

export class DeleteErr implements Action {
  readonly type = ActionTypes.DeleteErr;
  constructor(public payload: any) {}
}

