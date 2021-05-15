import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.page.html',
  styleUrls: ['./congrats.page.scss'],
})
export class CongratsPage implements OnInit {

  data: any;
  sponsorLogo: string;
  sponsorQuote: string;
  preselectedSponsorId: string;

  constructor(
    private apiSvc: ApiService,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

      // console.log('navParams: ', this.navParams.data);

      this.data = this.navParams.get('data'); // prepId
      const prepId = this.data.prepId;
      const personas = this.apiSvc.getPersona();
      personas.sponsors.forEach((sponsor: any) => {
        // sponsor.prepIds.split(',').forEach(pi => {
          // if(pi == prepId) {
            this.sponsorLogo = environment.serverBaseUrl + sponsor.logo;
            const sponsorQuotesCount = sponsor.sponsorquotes.length;
            if (sponsorQuotesCount === 1) {
              this.sponsorQuote = sponsor.sponsorquotes[0].quote;
              this.preselectedSponsorId = sponsor.sponsorId;
            } else if (sponsorQuotesCount > 1) {
              const quotenumber = Math.floor(Math.random() * sponsorQuotesCount) + 1;
              this.sponsorQuote = sponsor.sponsorquotes[quotenumber - 1 ].quote;
              this.preselectedSponsorId = sponsor.sponsorId;
            }
          // }
        // })
      });
      // this.apiSvc.getSponsors(this.data.sponsorId).subscribe(
      //   sponsordata => {
      //     this.apiSvc.getSponsorimages(this.data.sponsorId).subscribe(
      //       imgdata => {
      //         sponsordata.body[0].image = imgdata.body;
      //         if(event.sponsors) {
      //           let is_inserted:Boolean = false;
      //           event.sponsors.forEach(es => {
      //             if(es.sponsorId == sponsordata.body[0].sponsorId) {
      //               is_inserted = true;
      //             }
      //           });
      //           if(!is_inserted) {
      //             console.log('if:   ' + event.sponsors.push(sponsordata.body[0]));
      //             this.eventSvc.setActiveEvent(event);
      //           }
      //         }else {
      //           event.sponsors = [];
      //           console.log(event.sponsors.push(sponsordata.body[0]));
      //           this.eventSvc.setActiveEvent(event);
      //         }
      //       this.sponsorLogo = environment.serverBaseUrl + sponsordata.body[0].logo;
      //       }
      //       );
      //   }
      // );
  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
