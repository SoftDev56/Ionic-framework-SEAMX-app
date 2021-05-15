import { Component, OnInit } from '@angular/core';
import { SeamxEvent } from '../../models/seamxevent';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-allset',
  templateUrl: './allset.page.html',
  styleUrls: ['./allset.page.scss'],
})
export class AllsetPage implements OnInit {

  event: SeamxEvent;

  constructor(private eventSvc: EventsService) { }

  ngOnInit() {
    this.event = this.eventSvc.getActiveEvent();
  }

}
