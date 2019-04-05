import {ActionTypes} from './user.actions';
import {User} from '../../models/user';


export interface State {
  data: User[];
  selected: User;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.List:
      state.data = action.payload;
      return {
        ...state,
        action: action.type,
        done: true,
        selected: null,
        error: null
      };
    case ActionTypes.Create:
      // do something
      const user: User = action.payload;
      return {
        ...state,
        action: action.type,
        done: true,
        selected: user,
        error: null
      };
    case  ActionTypes.CreateSuccess:
      console.log(action.payload);
      console.log(state);
      return {
        ...state,
        action: action.type,
        done: false,
        selected: null,
        error: null
      };
    case  ActionTypes.CreateErr:
      console.log(action.payload);
      return {
        ...state,
        action: action.type,
        done: true,
        selected: null,
        error: null
      };
    case ActionTypes.Update:
      // do something
      break;
    case  ActionTypes.UpdateSuccess:
      return {
        ...state,
        action: action.type,
        done: false,
        selected: null,
        error: null
      };
    case  ActionTypes.UpdateErr:
      console.log(action.payload);
      return {
        ...state,
        action: action.type,
        done: true,
        selected: null,
        error: null
      };
    case ActionTypes.Delete:
      return {
        ...state,
        action: action.type,
        done: false,
        selected: null,
        error: null
      };
    case  ActionTypes.DeleteErr:
      return {
        ...state,
        action: action.type,
        done: false,
        selected: null,
        error: action.payload
      };
    case  ActionTypes.DeleteSuccess:
      console.log(action.payload);
      return {
        ...state,
        action: action.type,
        done: true,
        selected: null,
        error: null
      };
    default:
      return state;
  }
}
