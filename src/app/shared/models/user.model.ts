import { UserDocument } from './user-document.model';
import { Profile } from './profile.model';

export interface User {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Password: string;
    Profile: Profile;
    UserDocuments: UserDocument[];
}
