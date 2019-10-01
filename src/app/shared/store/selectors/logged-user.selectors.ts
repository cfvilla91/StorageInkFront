import { createSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { LoggedUserState } from '../states/logged-user.state';

const selectLoggedUser = (state: AppState) => state.loggedUser;

export const getLoggedUser = createSelector(
    selectLoggedUser,
    (state: LoggedUserState) => state.user
);
