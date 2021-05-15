import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CongratsPage } from './congrats.page';

describe('CongratsPage', () => {
  let component: CongratsPage;
  let fixture: ComponentFixture<CongratsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CongratsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
