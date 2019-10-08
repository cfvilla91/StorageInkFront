import { Tattoo } from './tattoo.model';

export interface TattooImage {
    Id: number;
    Tattoo: Tattoo;
    FileData: string;
    Extension: string;
    Description: string;
}
