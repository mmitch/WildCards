/*
 * Copyright (C) 2020  Christian Garbs <mitch@cgarbs.de>
 * Licensed under GNU GPL v3 or later.
 *
 * This file is part of Wild Cards.
 *
 * Wild Cards is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wild Cards is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wild Cards.  If not, see <http://www.gnu.org/licenses/>.
 */

import { TestBed } from '@angular/core/testing';
import { Player } from 'src/app/model/player';
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
    addHighscore('foo', 5);
    addHighscore('bar', 3);

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(2);
  });

  it('should sort highscores by score', () => {
    // given
    addHighscore('foo', 5);
    addHighscore('bar', 3);
    addHighscore('baz', 10);

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
      addHighscore('foo', 5);
      addHighscore('bar', 3);
      addHighscore('baz', 10);
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

  function addHighscore(name: string, score: number): void {
    service.addHighscore(new Player({ name, score }));
  }
});
