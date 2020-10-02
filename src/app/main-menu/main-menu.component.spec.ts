import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from '../view';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the title screen when the title button is clicked', () => {
    const fixture = TestBed.createComponent(MainMenuComponent);
    const comp = fixture.componentInstance;
    spyOn(comp.viewChange, 'emit');

    // TODO: test method call or HTML element click?
    // comp.showTitle();
    fixture.nativeElement.querySelector('button#title').click();

    expect(comp.viewChange.emit).toHaveBeenCalledWith(View.TITLE);
  });

  it('should request switch to the highscore screen when the highscore button is clicked', () => {
    const fixture = TestBed.createComponent(MainMenuComponent);
    const comp = fixture.componentInstance;
    spyOn(comp.viewChange, 'emit');

    // TODO: test method call or HTML element click?
    // comp.showHighScores();
    fixture.nativeElement.querySelector('button#highscores').click();

    expect(comp.viewChange.emit).toHaveBeenCalledWith(View.HIGHSCORES);
  });
});
