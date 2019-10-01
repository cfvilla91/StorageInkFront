import { initialLoggedUserState, LoggedUserState } from '../states/logged-user.state';
import { UserActions, UserActionList, SetLoggedUser } from '../actions/logged-user.actions';


export const loggedUserReducers = (
    state = initialLoggedUserState,
    action: UserActions
): LoggedUserState => {
    switch (action.type) {
        case UserActionList.SetLoggedUser:
            return { ...state, user: action.payload };
        case UserActionList.UnsetLoggedUser:
            return { ...state, user: null };
        default:
            return state;
    }
};
