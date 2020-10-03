import { TestBed } from '@angular/core/testing';
import { HighscoreTableComponent } from '../highscore-table/highscore-table.component';
import { Highscore } from '../models/highscore';

import { LocalStorageService } from './local-storage.service';

const HIGHSCORES: Highscore[] = [
  { name: 'foo', date: new Date(), score: 13 },
  { name: 'bar', date: new Date(), score:  7 },
];
const HIGHSCORES_STRING = JSON.stringify(HIGHSCORES);

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty highscore list if local storage is empty', () => {
    localStorage.clear();
    expect(service.getHighscores().length).toBe(0);
  });

  it('should return existing highscores from local storage', () => {
    localStorage.clear();
    localStorage.setItem('HIGHSCORES', HIGHSCORES_STRING);
    expect(service.getHighscores().length).toBe(2);
  });

  it('should write highscores to local storage', () => {
    service.setHighscores(HIGHSCORES);
    expect(localStorage.getItem('HIGHSCORES')).toBe(HIGHSCORES_STRING);
    localStorage.clear();
  });
});
