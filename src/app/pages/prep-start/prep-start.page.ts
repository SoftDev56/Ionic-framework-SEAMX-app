import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PrepService } from '../../services/prep.service';
import { EventsService } from '../../services/events.service';
import { Prep } from '../../models/prep';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-prep-start',
  templateUrl: './prep-start.page.html',
  styleUrls: ['./prep-start.page.scss'],
})
export class PrepStartPage implements OnInit {

  fromPreps: boolean;

  cards: Array<Prep>;
  selectedCards: Array<Prep>;
  totalPreps: number;
  daysLeft: number;
  percentCompleted: number;
  totalSelectedPreps: number;
  completePreps: number;

  constructor(
    private navCtrl: NavController,
    private apiSvc: ApiService,
    private prepSvc: PrepService,
    private eventSvc: EventsService
  ) {
      this.fromPreps = false;

      this.cards = [];
      this.selectedCards = [];
  }

  ionViewDidEnter(){
    this.fromPreps = this.prepSvc.fromPreps;
    const event = this.eventSvc.getActiveEvent();
    const personas = this.apiSvc.getPersona();
    personas.preps.forEach((prep: any) => {
      if(prep.isComplete != true) {
        this.cards.push(prep);
      }
    });
    this.totalPreps = this.cards.length;
    this.daysLeft = event.daysLeft;
    this.prepSvc.setTotalPreps(this.totalPreps);
    this.selectedCards = this.prepSvc.getSelectedPreps();
    this.totalSelectedPreps = this.selectedCards.length;
    this.completePreps = this.prepSvc.getCompletePrepsCount();
    this.percentCompleted = this.completePreps / this.totalSelectedPreps;
  }

  ngOnInit() {

  }

  addPrep(prep : Prep){
    // Remove the card from the stack
    this.cards.splice(this.cards.indexOf(prep), 1);
    this.selectedCards.push(prep);
  }

  allSet() {

    this.prepSvc.setSelectedPreps(this.selectedCards);
    if (this.prepSvc.fromPreps) {
      this.navCtrl.navigateRoot('/tab-root/tabs/preps');
    } else {
      this.navCtrl.navigateForward('/invite-friend');
    }
  }

  private deepCopy(preps: Array<Prep>) {
    this.cards = [];
    preps.forEach(prep => {
      this.cards.push(Object.assign({}, prep));
    });
  }
}
