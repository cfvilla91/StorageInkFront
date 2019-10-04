import { Client } from './client.model';

export interface Tattoo {
    Id: number;
    TattooTitle: string;
    TattooStyle: string;
    CoverUp: boolean;
    Client: Client;
    TattooStatus: string;
    TattooSessions: string;
}
