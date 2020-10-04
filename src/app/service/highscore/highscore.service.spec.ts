import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageServiceMock } from '../local-storage/local-storage.service.mock';

import { HighscoreService } from './highscore.service';

describe('HighscoreService', () => {
  let service: HighscoreService;
  let storageMock: LocalStorageServiceMock;

  beforeEach(() => {
    storageMock = new LocalStorageServiceMock();
    TestBed.configureTestingModule({
      providers: [
        LocalStorageServiceMock,
          { provide: LocalStorageService, useValue: storageMock }
      ]
    })
    .compileComponents();
    service = TestBed.inject(HighscoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty highscores if no highscores are present', () => {
    expect(service.getHighscores().length).toBe(0);
  });

  it('should return highscores after highscores have been added', () => {
    // given
    service.addHighscore('foo', 5);
    service.addHighscore('bar', 3);

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(2);
  });

  it('should sort highscores by score', () => {
    // given
    service.addHighscore('foo', 5);
    service.addHighscore('bar', 3);
    service.addHighscore('baz', 10);

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(3);

    expect(highscores[0].name).toBe('baz');
    expect(highscores[0].score).toBe(10);

    expect(highscores[1].name).toBe('foo');
    expect(highscores[1].score).toBe(5);

    expect(highscores[2].name).toBe('bar');
    expect(highscores[2].score).toBe(3);
  });

  it('should only keep the top 10 highscores', () => {
    // given
    for (let i = 0; i < 5; i++) {
      service.addHighscore('foo', 5);
      service.addHighscore('bar', 3);
      service.addHighscore('baz', 10);
    }

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(10);

    expect(highscores[0].name).toBe('baz');
    expect(highscores[0].score).toBe(10);

    expect(highscores[9].name).toBe('foo');
    expect(highscores[9].score).toBe(5);
  });
});
