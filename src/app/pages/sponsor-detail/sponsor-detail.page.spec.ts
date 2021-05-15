import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SponsorDetailPage } from './sponsor-detail.page';

describe('SponsorDetailPage', () => {
  let component: SponsorDetailPage;
  let fixture: ComponentFixture<SponsorDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SponsorDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
