import { Injectable } from '@angular/core';
import { Prep } from '../models/prep';
import { User } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { AuthService } from './auth.service';
import { Sponsor } from '../models/sponsor';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  snapshotChangesSubscription: any;
  headers = new HttpHeaders();
  user: User;
  users: any;
  completedPrepIds: any = [];
  completedPreps: any = [];
  public personas: Persona;

  constructor(
    private _http: HttpClient,
    private authSvc: AuthService,
    private transfer: FileTransfer
    ) {}

  public getPersona() {
    return this.personas;
  }

  public setPersona(persona) {
    this.personas = persona;
  }
  public getUsers() {
    return this.users;
  }

  public setUsers(users) {
    this.users = users;
  }

  public getCompletedPreps() {
    return this.completedPreps;
  }
  // public setCompletedPreps(completedPreps) {
  //   this.completedPreps = completedPreps;
  // }

  // Define HttpHeaders
  getHeader() {
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    return this.headers;
  }

  getEvents(eventIds: Array<string>) {
    this.user = this.authSvc.getUser();
    if (this.user !== undefined && this.user.personas) {
      const personaId = this.user.personas['personaId'];
      this.setPersonas(personaId);
    }

    return new Promise<any>((resolve, reject) => {

      // Firebase returns error if you pass empty array
      if (eventIds.length === 0) {
          resolve([]);
      } else {
        // Otherwise fine
        const events = [];
        eventIds.forEach((eventid, i, array) => {
          this.getUserEvents(eventid).subscribe(
            data => {
              const event = data.body[0];

              this.geteventImages(eventid).subscribe(
                data  => {
                  event.images = [];
                  event.images = data.body;
                }
              );

              this.getNews(eventid).subscribe(
                data => {
                  event.news = [];
                  event.news = data.body;
                }
              );

              this.getPageContent(eventid).subscribe(
                data => {
                  event.pagescontent = {};
                  event.pagescontent = data.body[0];
                }
              );

              // this.getPlayers(eventid).subscribe(
              //   data => {
              //     event.players = [];
              //     event.players = data.body;
              //   }
              // );

              this.getRaces(eventid).subscribe(
                data => {
                  event.races = [];
                  event.races = data.body;
                }
              );

              // this.getGrandsponsors(eventid).subscribe(
              //   data => {
              //     event.grandSponsors = [];
              //     if(data){
              //       event.grandSponsors = data.body;

              //     }
              //   }
              // );

              // When last item has been processed
              events.push(event);
              if (i === (array.length - 1 )) {
              resolve(events);
            }
          });
        });
        this.getAllUsers().subscribe((users: any) => {
          this.setUsers(users.body);
        })
      }
    });
  }

  setPersonas(personaId: any) {
    this.getUserPersonas(personaId).subscribe(
      async data => {
        // get preps
        const persona = data.body[0];
        persona.preps = [];
        const prepsIdsArr = data.body[0].prepIds.split(',');
        await asyncForEach(prepsIdsArr, async (pid: any) => {
          await this.getPreps(pid).subscribe(async p => {
              await persona.preps.push(p.body[0]);
          });
        });

        async function asyncForEach(array: any, callback: any) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        this.getCompletedPrepsHistory(this.user.userId).subscribe((completedPreps: any) => {
          if (completedPreps.body && persona.preps) {
            completedPreps.body.forEach((cp: any, idx: number) => {
              persona.preps.forEach((prep: any) => {
                if(cp.title == prep.prepId) {
                  prep.isComplete = true;
                  this.completedPreps.push(prep);
                }
              });
            });
          }
        });

        // get sponsors
        persona.sponsors = [];
        this.getSponsors().subscribe(
          (sponsorsdata: any) => {
            sponsorsdata.body.forEach(async (spon: any) => {
              const personaIdsArr = spon.personaIds.split(',');
              await asyncForEach(personaIdsArr, async (pid: any) => {
                if (pid.toString() === personaId.toString()) {
                  // get sponsorImages
                  const sponsorId = spon.sponsorId;
                  await this.getSponsorimages(sponsorId).subscribe( data => {
                    spon.sponsorimages = [];
                    spon.sponsorimages = data.body;
                  });
                  // get sponsorQuotes
                  await this.getSponsorQuotes(sponsorId).subscribe( data => {
                    spon.sponsorquotes = [];
                    spon.sponsorquotes = data.body;
                  });
                  persona.sponsors.push(spon);
                }
              });
              
              async function asyncForEach(array: any, callback: any) {
                for (let si = 0; si < array.length; si++) {
                  await callback(array[si], si, array);
                }
              }
            });
          });
        this.setPersona(persona);
      }
    );
    // this.getCompletedPrepsHistory(this.user.userId).subscribe((completedPreps: any) => {
    //   if (completedPreps.body) {
    //     console.log('completedPreps.body', completedPreps.body);
    //     completedPreps.body.forEach((cp: any, idx: number) => {
    //       console.log(cp);
    //       console.log(cp.title);
    //       this.completedPrepIds.push(cp.title);
    //       console.log(this.completedPrepIds);
    //       if (idx == completedPreps.body.length - 1) {
    //       }
    //     });
    //   }
    // });
  }

  getUserEvents(eventId: string) {
    return this._http.get(`${environment.apiUrl}/appevents/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  geteventImages(eventId: string) {
    return this._http.get(`${environment.apiUrl}/eventimages/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getNews(eventId: string) {
    return this._http.get(`${environment.apiUrl}/news/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getPreps(prepId: string) {
    return this._http.get(`${environment.apiUrl}/preps/edit/` + prepId, { headers: this.getHeader(), observe: 'response' });
  }
  getSponsors() {
    return this._http.get(`${environment.apiUrl}/sponsors`, { headers: this.getHeader(), observe: 'response' });
  }
  getSponsorimages(sponsorId: string) {
    return this._http.get(`${environment.apiUrl}/sponsorimagegallerys/edit/` + sponsorId, { headers: this.getHeader(), observe: 'response' });
  }
  getSponsorQuotes(sponsorId: string) {
    return this._http.get(`${environment.apiUrl}/quotes/edit/` + sponsorId, { headers: this.getHeader(), observe: 'response' });
  }
  getGrandsponsors(eventId: string) {
    return this._http.get(`${environment.apiUrl}/grandsponsors/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getPageContent(eventId: string) {
    return this._http.get(`${environment.apiUrl}/pagescontent/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getRaces(eventId: string) {
    return this._http.get(`${environment.apiUrl}/race/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getAllPersonas() {
    return this._http.get(`${environment.apiUrl}/personas`, { headers: this.getHeader(), observe: 'response' });
  }
  getUserPersonahistory(userId: string) {
    return this._http.get(`${environment.apiUrl}/personas_selected_history/edit/` + userId, { headers: this.getHeader(), observe: 'response' });
  }
  getUserPersonas(personaId: string) {
    return this._http.get(`${environment.apiUrl}/personas/edit/` + personaId, { headers: this.getHeader(), observe: 'response' });
  }
  getAllUsers() {
    return this._http.get(`${environment.apiUrl}/appusers`, { headers: this.getHeader(), observe: 'response' });
  }
  getPlayers(eventId: string) {
    return this._http.get(`${environment.apiUrl}/players/edit/` + eventId, { headers: this.getHeader(), observe: 'response' });
  }
  getCompletedPrepsHistory(userId: string) {
    return this._http.get(`${environment.apiUrl}/prephistory/edit/` + userId, { headers: this.getHeader(), observe: 'response' });
  }
  getProfile(profileId: string) {
    return this._http.get(`${environment.apiUrl}/profile/edit/` + profileId, { headers: this.getHeader(), observe: 'response' });
  }
  sendInvitation(userName: string, eventIds: string[], eventName: string, emails: string) {
    return this._http.post(`${environment.apiUrl}/email/invite`, {userName: userName, eventIds: eventIds, eventName: eventName, email: emails}, { headers:this.getHeader(), observe: 'response' });
  }
  sendQuestion(userInfo: string, message: string) {
    return this._http.post(`${environment.apiUrl}/email/question`, {userInfo: userInfo, message: message}, { headers:this.getHeader(), observe: 'response' });
  }

  // add data
  addNews(news) {
    const data = {
      time: news.time,
      title: news.title,
      description: news.description,
      image: news.image,
      eventId: news.eventId,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    }
    return this._http.post(`${environment.apiUrl}/news/add`, data, { headers: this.getHeader(), observe: 'response' });
  }

  // update user
  updateUserName(userId: string, fn: string, ln: string) {
    const data = {firstname: fn, lastname: ln};
    return this._http.post(`${environment.apiUrl}/appusers/update/` + userId, data, { headers: this.getHeader(), responseType: 'text' });
  }
  updateUserEmail(userId: string, e: string) {
    const data = {emailAddress: e};
    return this._http.post(`${environment.apiUrl}/appusers/update/` + userId, data, { headers: this.getHeader(), responseType: 'text' });
  }
  updateUserImage(userId: string, file: string) {

    console.log(file);
    const url = environment.apiUrl + '/imgupload';

    const options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {'userId': userId, 'tableName': 'app_user'}
    };

    const fileTransfer = this.transfer.create();

    return fileTransfer.upload(file, url, options);
    // return this._http.post(`${environment.apiUrl}/imgupload`, data, { headers:this.getHeader(), observe: 'response' });
  }

  // send fcm token
  sendFCMToken(token: string) {
    const fcmtoken = {token};
    return this._http.post(`${environment.apiUrl}/handlenoti/add`, fcmtoken, { headers: this.getHeader(), observe: 'response' });
  }
  updateFCMToken(tokenId: string | number, userId: string, notifPeriod: string) {
    const data = {userId, isValid: '1', notifPeriod};
    console.log(tokenId);
    console.log(data);
    return this._http.post(`${environment.apiUrl}/handlenoti/update/` + tokenId, data, { headers: this.getHeader(), responseType: 'text' });
  }
  // For foreground noti
  sendAdminNoti(news: { time: any; title: any; description: any; image: any; eventId: any; createdAt: any; updatedAt: any; }) {
    const data = {
      time: news.time,
      title: news.title,
      description: news.description,
      image: news.image,
      eventId: news.eventId,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    };
    return this._http.post(`${environment.apiUrl}/handlenoti/news/admin`, data, { headers: this.getHeader(), responseType: 'text' });
  }
  // For background noti
  sendNoti(news: { time: any; title: any; description: any; image: any; eventId: any; createdAt: any; updatedAt: any; }) {
    const data = {
      time: news.time,
      title: news.title,
      description: news.description,
      image: news.image,
      eventId: news.eventId,
      createdAt: news.createdAt,
      updatedAt: news.updatedAt
    };
    console.log('news-api: ' + data);
    return this._http.post(`${environment.apiUrl}/handlenoti/news`, data, { headers: this.getHeader(), observe: 'response' });
  }
  // add prep history for this user
  addPrepHistory(userId: string, prep: { title: any; prepcreatedAt: any; prepupdatedAt: any; createdAt: any; updatedAt: any; }) {
    const data = {
      userId: userId,
      title: prep.title,
      prepcreatedAt: prep.prepcreatedAt,
      prepupdatedAt: prep.prepupdatedAt,
      createdAt: prep.createdAt,
      updatedAt: prep.updatedAt
    }
    return this._http.post(`${environment.apiUrl}/prephistory/add`, data, { headers: this.getHeader(), responseType: 'text' });
  }
  addPersonaToHIstory(personas: { userId: any; personaId: any; personaFullname: any; personaEmail: any; createdAt: any; updatedAt: any; }) {
    const data = {
      userId: personas.userId,
      personaId: personas.personaId,
      personaFullname: personas.personaFullname,
      personaEmail: personas.personaEmail,
      createdAt: personas.createdAt,
      updatedAt: personas.updatedAt
    };
    // tslint:disable-next-line: max-line-length
    return this._http.post(`${environment.apiUrl}/personas_selected_history/add`, data, { headers: this.getHeader(), responseType: 'text' });
  }
}
