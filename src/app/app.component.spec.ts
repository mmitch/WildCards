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
});
