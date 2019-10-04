import { Client } from './client.model';

export interface ClientDocument {
    Id: number;
    Client: Client;
    FileData: string;
    Extension: string;
    Description: string;
}
