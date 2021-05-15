import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabRootPage } from './tab-root.page';

describe('TabRootPage', () => {
  let component: TabRootPage;
  let fixture: ComponentFixture<TabRootPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabRootPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabRootPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
