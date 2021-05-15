import { Injectable } from '@angular/core';
import { Prep } from '../models/prep';
import { EventsService } from '../services/events.service';
import { AuthService } from '../services/auth.service';
import { News } from '../models/news';
import { DatePipe } from '@angular/common'
import { ApiService } from './api.service';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrepService {

  fromPreps: boolean;
  selectedPreps: Array<Prep> = [];
  completedPreps: Array<Prep>;
  userPrepsHistory: Array<Prep>;
  totalPreps: number;
  news: any = [];
  today: number = Date.now();

  constructor(
    private eventSvc: EventsService,
    private authSvc: AuthService,
    public datepipe: DatePipe,
    private apiSvc: ApiService,
    private notiSvc: NotificationService,
    ) {
    this.fromPreps = false;
    const personas = this.apiSvc.getPersona();
    personas.preps.forEach((prep: any) => {
      if (prep.isComplete == true) {
        this.selectedPreps.push(prep);
      }
    });
    this.completedPreps = this.apiSvc.getCompletedPreps();
  }

  addToComplete(prep: Prep, completedPreps) {
    this.completedPreps.push(prep);
    this.publishNews(prep, completedPreps);
  }

  getCompletePrepsCount(){
    return this.completedPreps.length;
  }

  setTotalPreps(totalPreps: number){
    this.totalPreps = totalPreps;
  }

  getTotoalPreps(){
    return this.totalPreps;
  }

  getSelectedPrepCount(){
    return this.selectedPreps.length;
  }

  setSelectedPreps(preps: Array<Prep>) {
    this.selectedPreps = preps;
  }

  getSelectedPreps(): Array<Prep> {
    return this.selectedPreps;
  }

  setFromPreps(isFrom: boolean) {
    this.fromPreps = isFrom;
  }

  addPrepBack(prep: Prep) {
    const event = this.eventSvc.getActiveEvent();
    event.preps.push(prep);
    event.preps.sort((a: Prep, b: Prep) => {
      return a.number - b.number;
    });
  }

  addPrep(completeprep) {
    const userId = this.authSvc.getUser().userId;
    const prep: any = {
      title : '',
      prepcreatedAt: '',
      prepupdatedAt: '',
      createdAt : '',
      updatedAt : ''
    };
    prep.title = completeprep.prepId;
    prep.prepcreatedAt = completeprep.createdAt.replace(/T/, ' ').replace(/\..+/, '');;
    prep.prepupdatedAt = completeprep.updatedAt.replace(/T/, ' ').replace(/\..+/, '');;
    this.apiSvc.addPrepHistory(userId, prep).subscribe();
  }

  publishNews(prep, completePreps) {
    const event = this.eventSvc.getActiveEvent();
    const time = new Date();
    this.news.time = this.today.toString();
    const username = this.authSvc.getUser().firstname + ' ' + this.authSvc.getUser().lastname;
    this.news.title = username;
    // if(this.authSvc.getUser().image){
    //   this.news.image = this.authSvc.getUser().image.replace(environment.baseUrl, '');
    // }else {
    //   this.news.image = '';
    // }
    this.news.image = this.authSvc.getUser().userId;
    this.news.eventId = event.eventId;
    this.news.createdAt = '';
    this.news.updatedAt = '';
    if (completePreps == 1) {
      this.news.description = username + ' is warming up';
      this.apiSvc.addNews(this.news).subscribe(async res => {
        console.log(res);
        this.displayNews();
       await this.notiSvc.sendNotification(this.news);
      });
    } else if (completePreps == 3) {
      this.news.description = username + ' is getting serious';
      this.apiSvc.addNews(this.news).subscribe(async res => {
        console.log(res);
        this.displayNews();
        await this.notiSvc.sendNotification(this.news);
      });
    } else if (completePreps == 5) {
      this.news.description = username + ' is leveling up';
      this.apiSvc.addNews(this.news).subscribe(async res => {
        console.log(res);
        this.displayNews();
        await this.notiSvc.sendNotification(this.news);
      });
    } else if (completePreps == 10) {
      this.news.description = username + ' is crushing it!';
      this.apiSvc.addNews(this.news).subscribe(async res => {
        console.log(res);
        this.displayNews();
        await this.notiSvc.sendNotification(this.news);
      });
    }
  }

  displayNews() {
    const event = this.eventSvc.getActiveEvent();
    this.apiSvc.getNews(this.news.eventId).subscribe(
      data => {
        event.news = [];
        this.news = data.body;
        event.news = this.news;
        this.eventSvc.setActiveEvent(event);
      }
    );
  }
}
