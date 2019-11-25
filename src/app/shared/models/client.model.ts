import { ClientDocument } from './client-document.model';

export class Client {
    Id: number;
    FirstName: string;
    LastName: string;
    Uid: string;
    Email: string;
    ClientDocuments: ClientDocument[];

}
