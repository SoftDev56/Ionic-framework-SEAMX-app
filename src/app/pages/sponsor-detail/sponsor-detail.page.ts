import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Sponsor } from 'src/app/models/sponsor';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sponsor-detail',
  templateUrl: './sponsor-detail.page.html',
  styleUrls: ['./sponsor-detail.page.scss'],
})
export class SponsorDetailPage implements OnInit {

  // sponsor: Sponsor;
  sponsor: any;
  baseUrl: string;

  slideOpts = {
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  constructor(private eventSvc: EventsService) { 
    // this.sponsor = new Sponsor();
    this.baseUrl = environment.serverBaseUrl;
  }

  ngOnInit() {
    this.sponsor = this.eventSvc.getActiveSponsor();
  }

}
