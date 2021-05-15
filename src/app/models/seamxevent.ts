import { News } from './news';
import { Sponsor } from './sponsor';
import { Prep } from './prep';
import { Race } from './race';

export class SeamxEvent {
    eventId: string;
    name: string;
    description: string;
    type: string;
    city: string;
    startDate: string;
    endDate: string;
    seconds: number;
    miliseconds: number;
    // date: { seconds: number, miliseconds: number};
    image: string;
    mapImage: string;
    supportEmail: string;
    pagescontent: {
        topImagePath: string,
        logo: string,
        locationImagePath: string
    };
    preps: Array<Prep>;
    // Added by NT
    // logo: string; // COMMENTED BY NA
    //eventOrganizer: string;
    //eventOrganizerLogo: string;
    //eventOrganizerDescription: string;
    grandSponsors: Array<Sponsor>;
    //eventGrandSponsorLogo: string;
    //eventGrandSponsorDescription: string[];
    sponsors: Array<Sponsor>;
    //eventMinorSponsorLogo: string[];
    //eventMinorSponsorDescription: string[];
    //eventLocation: string;
    //eventStartingPoint: string;
    //eventEndingPoint: string;
    //eventRegistrationStatus: boolean;
    //eventRegistrationStarting: Date;
    //eventRegistrationEnding: Date;
    //eventRegistrations: number;
    images: any[];
    news: Array<News>;
    races: Array<Race>;
    //language: string[];
    players: Array<string>;

    daysLeft: number;
    hoursLeft: number;
}