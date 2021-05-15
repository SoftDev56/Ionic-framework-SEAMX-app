import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.page.html',
  styleUrls: ['./photo-gallery.page.scss'],
})
export class PhotoGalleryPage implements OnInit {

  // @Input() photos: Array<string>;
  @Input() photos: any[];

  @ViewChild(IonSlides, {static:false})
  slides: IonSlides;
  baseUrl: string;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

      this.photos = this.navParams.get('photos');
      this.baseUrl = environment.serverBaseUrl;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PhotoSliderPage');
    //setTimeout(()=>{
      //this.slides.slideTo(this.navParams.data.index);
    //}, 500);           
  }

  goForward() {
    if (!this.slides.isEnd()) {
      this.slides.slideNext();
    }
  }

  goBackward() {
    if (!this.slides.isBeginning()) {
      this.slides.slidePrev();
    }        
  }

  close() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  ngOnInit() {
  }

}
