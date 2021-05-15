import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavController, IonContent } from '@ionic/angular';
import { PhotoGalleryPage } from '../photo-gallery/photo-gallery.page';
import { EventsService } from '../../services/events.service';
import { AppEventsService } from '../../services/app-events.service';
import { SeamxEvent } from '../../models/seamxevent';
import { Sponsor } from 'src/app/models/sponsor';
import { environment } from 'src/environments/environment';
import { News } from 'src/app/models/news';
import { Storage } from '@ionic/storage';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  @ViewChild('eventSlides', { static: false }) eventSlides: IonSlides;
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;

  seamxEvent: SeamxEvent;
  personas: any;
  grandSponsors: any = [];
  eventPagescontent: any;
  news: any;
  readNewsList: any = []; // newsIds and eventIds array
  readItem: any = []; // newsIds array
  users: any;

  activeIndex: number;
  baseUrl: string;
  appbaseUrl: string;

  slideOpts = {
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  constructor(
    private apiSvc: ApiService,
    private eventsSvc: EventsService,
    public appEvents: AppEventsService,
    public navCtrl: NavController,
    private modalController: ModalController,
    private storage: Storage
  ) {
    this.activeIndex = 0;
    this.baseUrl = environment.serverBaseUrl;
    this.appbaseUrl = environment.baseUrl;
    this.seamxEvent = this.eventsSvc.getActiveEvent();
    this.personas = this.apiSvc.getPersona();
    this.users = this.apiSvc.getUsers();
  }

  ngOnInit() {
    // this.storage.remove('newsList').then(() => {
    //   console.log('stored');
    // });

    this.seamxEvent = this.eventsSvc.getActiveEvent();
    this.setUserImage(this.users);
    this.personas = this.apiSvc.getPersona();
    console.log(this.personas);
    this.personas.sponsors.forEach((s: any) => {
      if (s.grandSponsor === 'true') {
        console.log('grandSponsor');
        this.grandSponsors.push(s);
      }
    });
    this.eventPagescontent = this.seamxEvent.pagescontent;

    this.appEvents.subscribe('open:event', (data) => {
      this.seamxEvent = this.eventsSvc.getEventByIndex(data.idx);
      this.setUserImage(this.users);
      this.setTimestamp();
      this.getReadNewsList();
    });

    this.setTimestamp();
  }

  ngAfterViewInit() {
    // this.storage.remove('newsList').then(() => {});
    this.getReadNewsList();
    setInterval(() => {
      // change background-color to transparent
      const allNewsItems = document.querySelectorAll('.news-item');
      allNewsItems.forEach((newsitem) => {
        // console.log(allNewsItems);
        // if (newsitem.shadowRoot.children[0]) {
        //   newsitem.shadowRoot.children[0].setAttribute('style', 'background-color:transparent !important');
        // }
        if (newsitem.shadowRoot.children.length > 0) {
          for (let i = 0; i < newsitem.shadowRoot.children.length; i++) {
            if (newsitem.shadowRoot.children[i].className === 'item-native') {
              newsitem.shadowRoot.children[i].setAttribute('style', 'background-color:transparent !important');
            }
          }
        }
      });
    }, 1000);
  }

  ngOnDestroy() {
    this.appEvents.unsubscribe('open:event');
  }

  onSlideChange() {
    this.eventSlides.getActiveIndex().then(aIndex => {
      this.activeIndex = aIndex;
      this.ionContent.scrollToTop(300);
    });
  }

  openGallery() {
    this.presentModal();
  }

  openSponsor(sponsor: Sponsor) {
    this.eventsSvc.setActiveSponsor(sponsor);
    this.navCtrl.navigateForward('/sponsor-detail');
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PhotoGalleryPage,
      componentProps: {
        'photos': this.seamxEvent.images
      }

    });
    return await modal.present();
  }

  getReadNewsList() {
    this.storage.get('newsList').then((newsList) => {
      if (newsList !== null) {
        console.log('newsList exist', newsList);
        newsList.forEach(async (nl: any) => {
          // console.log('nl', nl);
          // console.log('nl.eventId', nl.eventId);
          // console.log('nl.newsIds', nl.newsIds);
          // if (nl.eventId === this.seamxEvent.eventId) {
            this.readNewsList = nl;
            this.readItem = this.readNewsList.newsIds;
            // console.log('this.readItem', this.readItem);

            // this.seamxEvent.news.forEach(ns => {
            //   this.readItem.forEach(item => {
            //     if (ns.newsId === item.id) {
            //       ns.isread = 'isread';
            //     }
            //   });
            // });

            await asyncForEach(this.seamxEvent.news, async (ns: any) => {
              this.readItem.forEach(item => {
                if (ns.newsId === item.id) {
                  ns.isread = 'isread';
                }
              });
            });
            async function asyncForEach(array: any, callback: any) {
              for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
              }
            }
            this.eventsSvc.setEventNews(this.seamxEvent.eventId, this.seamxEvent.news);
          // }
        })
      }
    });
  }

  refreshNews(event) {
    this.getReadNewsList();
  }

  setTimestamp() {
    this.seamxEvent.news.sort((a, b) => {
      let dateA = new Date(a.updatedAt);
      let dateB = new Date(b.updatedAt);
      return dateB.getTime() - dateA.getTime();
    });

    // this.seamxEvent.news.forEach(n => {
    //   if (!n.image.startsWith('http')) {
    //     n.image = environment.baseUrl + n.image;
    //   }
    // });
  }

  getTime(time) {
    let nowSec = new Date().getTime() / 1000; // current seconds
    let seconds = parseFloat(time); // seconds value from DB
    let hours = this.getHours(nowSec, seconds);
    let minutes = Math.round((nowSec - (seconds / 1000)) / 60);
    let daysago = Math.floor(hours / 24);
    if (daysago == 0 && hours != 0) {
      time = hours + ' hours ago';
      return time;
    }
    else if (daysago == 0 && hours == 0) {
      time = minutes + ' minutes ago';
      return time;
    }
    else {
      time = daysago + ' days ago';
      return time;
    }
  }

  getHours(nowSecs, dateSecs) {
    const diffSec = nowSecs - (dateSecs / 1000);
    const hours = diffSec / (60 * 60);
    return Math.abs(Math.round(hours));
  }

  getUserImage(n) {
    const userId = n.image;
    this.users.forEach((user: any, i: number) => {
      if (userId == user.userId) {
        // console.log(userId +'|' + user.userId);
        console.log('user.image', user.image);
        if (user.image) {
          console.log('user.image', user.image);
          return this.baseUrl + user.image;
        }
      }
      if (i == this.users.length - 1) {
        return '';
      }
    });
  }
  setUserImage(users) {
    this.seamxEvent.news.forEach((n: any, i: number) => {
      users.forEach((user: any) => {
        console.log(n.image + '|' + user.userId + '|' + user.image);
        if (n.image == user.userId) {
          if (user.image) {
            console.log('user.image', user.image);
            n.imageUrl = this.appbaseUrl + user.image;
          }
        }
      });
    });
  }

  // newsList is data from storage
  // newsList = { 
  //     eventId,
  //     newsIds: [
  //           { 
  //             id: value },
  //              . . . 
  //           ]
  // }
  // readItem is data of newsIds, and same to newsIds of newsList

  // When click news item
  async readThis(newsindex, news) {
    const newsId = news.newsId; // selected news
    const newsEventId = news.eventId;
    // console.log(newsEventId);
    let readNewsList = []; // Array for store
    // console.log(this.readItem.length + 'this.readItem', this.readItem);
    if (this.readItem.length > 0) {
      // console.log('this.readItem is exist');
      let isread = '';
      // To avoid repeat, check that current newsId already was stored to storage
      // this.readItem.forEach(ri => {
      //   console.log('-' + ri.id + '-' + newsId + '-');
      //   if (ri.id === newsId) {
      //     isread = 'is';
      //   }
      // });

      await asyncForEach(this.readItem, async (ri: any) => {
        if (ri.id === newsId) {
          isread = 'is';
        }
      });
      async function asyncForEach(array: any, callback: any) {
        for (let idx = 0; idx < array.length; idx++) {
          await callback(array[idx], idx, array);
        }
      }

      if (isread !== 'is') {
        this.readNewsList.newsIds.push({ id: newsId });
        readNewsList.push(this.readNewsList);
        // console.log(readNewsList);
        await this.storage.set('newsList', readNewsList).then(() => {
          console.log('stored');
          this.getReadNewsList();
          // this.readItem.push({ id: newsId });
        });
      }
    } else {
      // console.log('this.readItem is not exist');
      readNewsList.push({ eventId: newsEventId, newsIds: [{ id: newsId }] });
      // console.log('add a readNewsList', readNewsList);
      await this.storage.set('newsList', readNewsList).then(async () => {
        await console.log('I read this news ' + news.description);
        this.getReadNewsList();
      });
      // this.storage.get('newsList').then((newsList) => {
      //   console.log('newsList from storage', newsList);
      //   newsList.forEach(nl => {
      //     if (nl.eventId === newsEventId) {
      //       this.readNewsList = nl;
      //       this.readItem = this.readNewsList.newsIds;
      //     }
      //   });
      // });
    }

    let selectedElement = document.getElementById('newsitem-' + newsindex);
    if (selectedElement.classList.contains('isread') === false) {
      selectedElement.classList.add('isread');
    }
  }

  getReadMark(n) {
    if (n.isread === 'isread') {
      // console.log(n);
      return 'isread item md in-list ion-focusable item-label hydrated';
    } else {
      return '';
    }
  }
}
