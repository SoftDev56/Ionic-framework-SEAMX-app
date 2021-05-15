import { Prep } from './prep';
import { Sponsor } from './sponsor';

export class Persona {
    personaId: string;
    title: string;
    prepIds: string;
    target: string;
    fromAge: string;
    toAge: string;
    gender: string;
    location: string;
    preps: Array<Prep>;
    sponsors: Array<Sponsor>;
}