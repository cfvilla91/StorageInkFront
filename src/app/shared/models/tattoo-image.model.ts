import { Tattoo } from './tattoo.model';

export interface TattooImage {
    Id: number;
    Tattoo: Tattoo;
    ImageData: string;
    Extension: string;
    Description: string;
}
