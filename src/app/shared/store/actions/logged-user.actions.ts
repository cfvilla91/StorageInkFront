import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.model';

export enum UserActionList {
    SetLoggedUser = '[Logged User] Set',
    UnsetLoggedUser = '[Logged User] Unset'
}


export class SetLoggedUser implements Action {
    public readonly type = UserActionList.SetLoggedUser;
    constructor(public payload: User) { }
}

export class UnsetLoggedUser implements Action {
    public readonly type = UserActionList.UnsetLoggedUser;
}

export type UserActions = SetLoggedUser | UnsetLoggedUser;
