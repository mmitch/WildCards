import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from 'src/app/view';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app name', () => {
    expect(html.querySelector('h1')?.textContent).toContain('PlaceHolder');
  });

  it('should request switch to the main menu when the button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    // TODO: test method call or HTML element click?
    // comp.showMainMenu();
    html.querySelector('button')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  // TODO: it should show the github project link
  // TODO: it should link to the original android app
  // TODO: it should show the licence
});
