import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prep } from '../../models/prep';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prep-card',
  templateUrl: './prep-card.component.html',
  styleUrls: ['./prep-card.component.scss'],
})
export class PrepCardComponent implements OnInit {

  @Input()
  cardData: Prep;  

  @Input()
  inside: boolean;

  @Input()
  isAnimating: boolean;

  @Input()
  totalCards: number;  

  @Input()
  cardNum: number;  

  @Output()
  addPrep = new EventEmitter();

  @Output()
  delPrep = new EventEmitter();

  @Output()
  tickPrep = new EventEmitter();
  baseUrl: string;

  constructor() {
    this.totalCards = 4;
    this.baseUrl = environment.serverBaseUrl;
  }

  ngOnInit() {
  }

  addNewPrep(){
    this.addPrep.emit();
  }

  markPrepComplete(){
    this.tickPrep.emit();
  }

  deletePrep(){
    this.delPrep.emit();
  }

}
