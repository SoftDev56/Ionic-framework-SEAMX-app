import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepStartPage } from './prep-start.page';

describe('PrepStartPage', () => {
  let component: PrepStartPage;
  let fixture: ComponentFixture<PrepStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepStartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
