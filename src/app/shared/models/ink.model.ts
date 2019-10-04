import { InkProvider } from './ink-provider.model';

export interface Ink {
    Id: number;
    InkName: string;
    InkCode: string;
    InkProvider: InkProvider;
}
