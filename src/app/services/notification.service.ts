import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  news: string;
  tokenId: number;
  addToken: boolean = false;

  constructor(private apiSvc: ApiService) { }

  public getTokenId() {
    return this.tokenId;
  }

  public getAddToken() {
    return this.addToken;
  }

  public setTokenId(id) {
    this.tokenId = id;
    this.addToken = true;
  }

  sendNotification(news) {
    // For background noti
    return this.apiSvc.sendNoti(news).subscribe((res) => {
      console.log('news: ' + res.body);
    })
    // For foreground noti
    // return this.apiSvc.sendAdminNoti(news).subscribe((res) => {
    //   console.log('news: ' + res);
    // })
  }

}