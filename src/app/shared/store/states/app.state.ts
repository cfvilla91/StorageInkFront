import { RouterReducerState } from '@ngrx/router-store';
import { LoggedUserState, initialLoggedUserState } from './logged-user.state';

export interface AppState {
    router?: RouterReducerState;
    loggedUser: LoggedUserState;
}

export const initialAppState: AppState = {
    loggedUser: initialLoggedUserState
};

export function getInitialState(): AppState {
    return initialAppState;
}
