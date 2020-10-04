import { TestBed } from '@angular/core/testing';
import { Highscore } from 'src/app/model/highscore';

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

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty highscore list if local storage is empty', () => {
    // given

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(0);
  });

  it('should return existing highscores from local storage', () => {
    // given
    localStorage.setItem('HIGHSCORES', HIGHSCORES_STRING);

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(2);
  });

  it('should write highscores to local storage', () => {
    // given

    // when
    service.setHighscores(HIGHSCORES);

    // then
    expect(localStorage.getItem('HIGHSCORES')).toBe(HIGHSCORES_STRING);
  });
});
