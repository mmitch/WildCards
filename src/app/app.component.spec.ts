import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { View } from './view';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    html = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PlaceHolder'`, () => {
    const titleService = TestBed.inject(Title);
    expect(titleService.getTitle()).toEqual('PlaceHolder');
  });

  it('should initially render the title screen', () => {
    expect(app.view).toBe(View.TITLE);
  });

  it('should only render the title component in the title view', () => {
    // given

    // when
    fixture.componentInstance.onViewChange(View.TITLE);
    fixture.detectChanges();

    // then
    expect(html.querySelector('app-title'))          .not.toBeNull();
    expect(html.querySelector('app-main-menu'))      .toBeNull();
    expect(html.querySelector('app-highscore-table')).toBeNull();
    expect(html.querySelector('app-battle'))         .toBeNull();
  });

  it('should only render the menu component in the menu view', () => {
    // given

    // when
    fixture.componentInstance.onViewChange(View.MAIN_MENU);
    fixture.detectChanges();

    // then
    expect(html.querySelector('app-title'))          .toBeNull();
    expect(html.querySelector('app-main-menu'))      .not.toBeNull();
    expect(html.querySelector('app-highscore-table')).toBeNull();
    expect(html.querySelector('app-battle'))         .toBeNull();
  });

  it('should only render the highscore component in the highscore view', () => {
    // given

    // when
    fixture.componentInstance.onViewChange(View.HIGHSCORES);
    fixture.detectChanges();

    // then
    expect(html.querySelector('app-title'))          .toBeNull();
    expect(html.querySelector('app-main-menu'))      .toBeNull();
    expect(html.querySelector('app-highscore-table')).not.toBeNull();
    expect(html.querySelector('app-battle'))         .toBeNull();
  });

  it('should only render the battle component in the battle view', () => {
    // given

    // when
    fixture.componentInstance.onViewChange(View.BATTLE);
    fixture.detectChanges();

    // then
    expect(html.querySelector('app-title'))          .toBeNull();
    expect(html.querySelector('app-main-menu'))      .toBeNull();
    expect(html.querySelector('app-highscore-table')).toBeNull();
    expect(html.querySelector('app-battle'))         .not.toBeNull();
  });
});
