import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrepsPage } from './preps.page';

describe('PrepsPage', () => {
  let component: PrepsPage;
  let fixture: ComponentFixture<PrepsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrepsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrepsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
