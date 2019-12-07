import { TattooSession } from './tattoo-session.model';
import { Ink } from './ink.model';

export interface TattooSessionInk {
    Id: number;
    TattooSession: TattooSession;
    Ink: Ink;
}
