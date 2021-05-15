import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionsPage } from './questions.page';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('QuestionsPage', () => {
  let component: QuestionsPage;
  let fixture: ComponentFixture<QuestionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsPage ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
