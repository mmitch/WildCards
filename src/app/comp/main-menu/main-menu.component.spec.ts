import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from 'src/app/view';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the title screen when the title button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#title')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.TITLE);
  });

  it('should request switch to the highscore screen when the highscore button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#highscores')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.HIGHSCORES);
  });

  it('should request switch to the battle screen when the start battle button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#battle')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.BATTLE);
  });
});
