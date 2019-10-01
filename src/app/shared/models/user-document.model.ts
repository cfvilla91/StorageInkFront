import { User } from 'src/app/shared/models/user.model';

export interface UserDocument {
    Id: number;
    User: User;
    FileData: string;
    Extension: string;
    Description: string;
}
