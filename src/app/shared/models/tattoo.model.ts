import { Client } from './client.model';
import { TattooSession } from './tattoo-session.model';
import { TattooImage } from './tattoo-image.model';

export interface Tattoo {
    Id: number;
    TattooTitle: string;
    TattooStyle: string;
    CoverUp: boolean;
    Client: Client;
    TattooStatus: string;
    TattooSessions: TattooSession[];
    TattooImages: TattooImage[];
}
