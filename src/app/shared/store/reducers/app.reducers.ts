import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { routerReducer } from '@ngrx/router-store';
import { loggedUserReducers } from './logged-user.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
    router: routerReducer,
    loggedUser: loggedUserReducers
};
