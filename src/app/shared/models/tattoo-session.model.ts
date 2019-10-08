import { Tattoo } from './tattoo.model';
import { User } from './user.model';

export interface TattooSession {
    Id: number;
    Tattoo: Tattoo;
    User: User;
    TattooSessionStatus: string;
    StartedAt: Date;
    FinishedAt: Date;
}
