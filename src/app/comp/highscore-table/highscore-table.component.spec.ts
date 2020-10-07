import { ComponentFixture, TestBed } from '@angular/core/testing';
import { format } from 'date-fns';
import { PipesModule } from 'src/app/pipe/pipes-module';
import { HighscoreService } from 'src/app/service/highscore/highscore.service';
import { View } from 'src/app/view';

import { HighscoreTableComponent } from './highscore-table.component';

describe('HighscoreTableComponent', () => {
  let component: HighscoreTableComponent;
  let fixture: ComponentFixture<HighscoreTableComponent>;
  let html: HTMLElement;
  let highscoreServiceSpy: HighscoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighscoreTableComponent ],
      providers: [ HighscoreService ],
      imports: [ PipesModule ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreTableComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
    highscoreServiceSpy =  TestBed.inject(HighscoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the main menu when the button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector('button')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  it('should show an empty list if no highscores are present', () => {
    // given
    spyOn(highscoreServiceSpy, 'getHighscores').and.returnValue([]);

    component.ngOnInit();
    fixture.detectChanges();

    // when
    const list = getHighscoreList();

    // then
    expect(list.length).toBe(0);
  });

  it('should show all highscores that are present', () => {
    // given
    const today = new Date();
    spyOn(highscoreServiceSpy, 'getHighscores').and.returnValue([
      { name: 'foo', date: today, score: 1000 },
      { name: 'bar', date: today, score:  500 },
    ]);

    component.ngOnInit();
    fixture.detectChanges();

    // when
    const list = getHighscoreList();

    // then
    expect(list.length).toBe(2);
  });

  it('should properly format a highscore', () => {
    // given
    const today = new Date();
    spyOn(highscoreServiceSpy, 'getHighscores').and.returnValue([
      { name: 'foo', date: today, score: 1000 },
    ]);

    component.ngOnInit();
    fixture.detectChanges();

    // when
    const list = getHighscoreList();

    // then
    expect(list.length).toBe(1);
    expect(list[0].textContent).toBe('00001000 ' + format(today, 'yyyy-MM-dd') + ' foo');
  });

  function getHighscoreList(): NodeListOf<HTMLLIElement> {
    return html.querySelectorAll<HTMLLIElement>('ol li');
  }
});
