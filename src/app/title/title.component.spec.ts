import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from '../view';

import { TitleComponent } from './title.component';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app name', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('PlaceHolder');
  });

  it('should request switch to the main menu when the button is clicked', () => {
    const fixture = TestBed.createComponent(TitleComponent);
    const comp = fixture.componentInstance;
    spyOn(comp.viewChange, 'emit');

    // TODO: test method call or HTML element click?
    // comp.showMainMenu();
    fixture.nativeElement.querySelector('button').click();

    expect(comp.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  // TODO: it should show the github project link
  // TODO: it should link to the original android app
  // TODO: it should show the licence
});
