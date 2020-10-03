import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { View } from './view';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PlaceHolder'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const titleService = TestBed.inject(Title);
    expect(titleService.getTitle()).toEqual('PlaceHolder');
  });

  it('should initially render the title screen', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.view).toBe(View.TITLE);
  });

  it('should only render the title component in the title view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.onViewChange(View.TITLE);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('app-title'))          .not.toBeNull();
    expect(compiled.querySelector('app-main-menu'))      .toBeNull();
    expect(compiled.querySelector('app-highscore-table')).toBeNull();
  });

  it('should only render the menu component in the menu view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.onViewChange(View.MAIN_MENU);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('app-title'))          .toBeNull();
    expect(compiled.querySelector('app-main-menu'))      .not.toBeNull();
    expect(compiled.querySelector('app-highscore-table')).toBeNull();
  });

  it('should only render the highscore component in the highscore view', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.onViewChange(View.HIGHSCORES);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('app-title'))          .toBeNull();
    expect(compiled.querySelector('app-main-menu'))      .toBeNull();
    expect(compiled.querySelector('app-highscore-table')).not.toBeNull();
  });
});
