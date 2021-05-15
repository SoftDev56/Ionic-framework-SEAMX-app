import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllsetPage } from './allset.page';

describe('AllsetPage', () => {
  let component: AllsetPage;
  let fixture: ComponentFixture<AllsetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllsetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllsetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
