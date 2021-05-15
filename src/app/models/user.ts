import { Persona } from './persona';

export class User {
    userId: string;
    profile: any;
    firstname: string;
    lastname: string;
    emailAddress: string;
    password: string;
    //userId: number;
    //userSurname: string;
    image: string;
    //userMobilePhone: number;
    //userStatus: boolean;
    //userRegistrationDate: Date;
    //userGoals: string;
    preps: Array<string>;
    events: Array<string>;
    personas: Array<Persona>;
    //userNotificationPref: string;
}