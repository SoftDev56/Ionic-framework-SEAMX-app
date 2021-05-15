import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})

export class QuestionsPage implements OnInit {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  messageButtons: Array<string>;
  messages: Array<string>;
  userMessages: Array<string>;
  userMessage: string;
  showChat: boolean;


  constructor(
    private apiSvc: ApiService,
    private eventsSvc: EventsService,
    private authSvc: AuthService,
    private profileSvc: ProfileService ) {

    this.showChat = false;

    this.messageButtons = [
      "Getting help with preps",
      "Information about the day of the event",
      "Inviting a friend to join me for a specific race",
      "I have a technical issue with the app on my phone"
    ];

    this.messages = [];

    this.userMessages = [];

  }

  ngOnInit() {
    const allAccordion = document.querySelectorAll('.acc-toggle');

    allAccordion.forEach((toggle) => {
      toggle.addEventListener('click', accFunction);
    });

    let accThis;
    let childEle;

    function accFunction(e) {
      accThis = this;
      childEle = this.parentElement.parentElement;

      if (this.parentElement.classList.contains('acc-open') === true) {
        this.parentElement.classList.remove('acc-open');
        this.parentElement.querySelector('.acc-body').classList.remove('acc-body-active');
      } else {
        closeSiblings();

        this.parentElement.classList.add('acc-open');
        this.parentElement.querySelector('.acc-body').classList.add('acc-body-active');
      }
    }

    function closeSiblings() {

      for (let i = 0; i <= childEle.childElementCount - 1; i++) {

        if (childEle.children[i].classList.contains('acc-open') === true) {

          for (let j = 0; j <= childEle.children[i].childElementCount - 1; j++) {

            if (childEle.children[i].children[j].classList.contains('acc-body-active') === true) {

              childEle.children[i].classList.remove('acc-open');
              childEle.children[i].children[j].classList.remove('acc-body-active');
            }
          }
        }
      }
    }
  }

  ionViewWillEnter() {
    const allAccordion = document.querySelectorAll('.acc-container');
    for (let i = 0; i <= allAccordion.length - 1; i++) {
      if (allAccordion[i].classList.contains('acc-open') === true) {
        for (let j = 0; j <= allAccordion[i].childElementCount - 1; j++) {
          if (allAccordion[i].children[j].classList.contains('acc-body-active') === true) {
            for (let m = 0; m <= allAccordion[i].children[j].childElementCount - 1; m++) {
              if (allAccordion[i].children[j].children[m].classList.contains('acc-body-active') === true) {
                allAccordion[i].children[j].children[m].classList.remove('acc-body-active');
                allAccordion[i].classList.remove('acc-open');
                allAccordion[i].children[j].classList.remove('acc-body-active');
                allAccordion[i].children[j].classList.remove('acc-open');
              }else {
                allAccordion[i].classList.remove('acc-open');
                allAccordion[i].children[j].classList.remove('acc-body-active');
              }
            }
          }
        }
      }
    }
  }

  openChat() {
    this.userMessages = [];
    this.userMessage = "";
    this.showChat = true;
  }

  resetChat() {
    window.location.reload();
  }

  postMessage() {
    const supportEmail = this.eventsSvc.getActiveEvent().supportEmail;
    const userName = this.authSvc.user.firstname + ' ' + this.authSvc.user.lastname;
    const emailAddress = this.authSvc.user.emailAddress;
    const phone = this.authSvc.user.profile.phone;
    // this.apiSvc.getProfile(profileId).subscribe((data: any) => {
      // const phoneNumber = data.body.phone;
      let userInfo: any = {
        emailAddress: emailAddress,
        userName: userName,
        phone: phone,
        organizerEmail: supportEmail
      }
      this.userMessages.push(this.userMessage);
      console.log(userInfo);
      this.apiSvc.sendQuestion(userInfo, this.userMessage).subscribe(
        data => {
          console.log(data.body);
        });
      this.userMessage = "";
    // });
  }

}

