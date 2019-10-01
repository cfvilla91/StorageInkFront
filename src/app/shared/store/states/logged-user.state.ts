import { User } from 'src/app/shared/models/user.model';


export interface LoggedUserState {
    user: User;
}

export const initialLoggedUserState: LoggedUserState = {
    user: null
};
