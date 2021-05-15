import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepCardComponent } from './prep-card.component';

describe('PrepCardComponent', () => {
  let component: PrepCardComponent;
  let fixture: ComponentFixture<PrepCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
