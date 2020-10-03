import { ComponentFixture, TestBed } from '@angular/core/testing';
import { View } from 'src/app/view';

import { HighscoreTableComponent } from './highscore-table.component';

describe('HighscoreTableComponent', () => {
  let component: HighscoreTableComponent;
  let fixture: ComponentFixture<HighscoreTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighscoreTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the main menu when the button is clicked', () => {
    const fixture = TestBed.createComponent(HighscoreTableComponent);
    const comp = fixture.componentInstance;
    spyOn(comp.viewChange, 'emit');

    // TODO: test method call or HTML element click?
    // comp.showMainMenu();
    fixture.nativeElement.querySelector('button').click();

    expect(comp.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  // TODO: check empty list
  // TODO: check list with contents
});
