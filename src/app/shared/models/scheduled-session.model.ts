import { Client } from './client.model';
import { User } from './user.model';

export interface ScheduledSession {
    Id: number;
    Start: string;
    End: string;
    Notes: string;
    Client: Client;
    User: User;
}
