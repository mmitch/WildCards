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
import { sub } from 'date-fns';
import { Highscore } from 'src/app/model/highscore';
import { createPlayer } from 'src/app/service/player/player.service';
import { StorageService } from '../storage/storage.service';
import { StorageServiceMock } from '../storage/storage.service.mock';

import { HighscoreService } from './highscore.service';

const TODAY = new Date();

describe('HighscoreService', () => {
  let service: HighscoreService;
  let storageMock: StorageServiceMock;

  beforeEach(() => {
    storageMock = new StorageServiceMock();
    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageMock }],
    });
    service = TestBed.inject(HighscoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty highscores if no highscores are present', () => {
    expect(service.getHighscores().length).toBe(0);
  });

  it('should return existing highscores', () => {
    // given
    setExistingHighscores([
      existingHighscore('foo', 5, 0),
      existingHighscore('bar', 3, 0),
    ]);

    // when
    const highscores = service.getHighscores();

    // then
    expect(highscores.length).toBe(2);
  });

  it('should sort highscores by score and date', async () => {
    // given
    setExistingHighscores([
      existingHighscore('middle bar', 3, 3),
      existingHighscore('late bar', 3, 2),
      existingHighscore('early bar', 3, 5),
      existingHighscore('baz', 10, 0),
    ]);

    // when
    addHighscore('foo', 5);

    // then
    const highscores = service.getHighscores();
    expect(highscores.length).toBe(5);

    expect(highscores[0].name).toBe('baz');
    expect(highscores[0].score).toBe(10);

    expect(highscores[1].name).toBe('foo');
    expect(highscores[1].score).toBe(5);

    expect(highscores[2].name).toBe('early bar');
    expect(highscores[2].score).toBe(3);

    expect(highscores[3].name).toBe('middle bar');
    expect(highscores[3].score).toBe(3);

    expect(highscores[4].name).toBe('late bar');
    expect(highscores[4].score).toBe(3);
  });

  it('should only keep the top 10 highscores', () => {
    // given
    setExistingHighscores([
      existingHighscore('A', 10, 0),
      existingHighscore('B', 9, 0),
      existingHighscore('C', 8, 0),
      existingHighscore('D', 7, 0),
      existingHighscore('E', 6, 0),
      existingHighscore('F', 5, 0),
      existingHighscore('G', 4, 0),
      existingHighscore('H', 3, 0),
      existingHighscore('I', 2, 0),
      existingHighscore('J', 1, 0),
    ]);

    // when
    addHighscore('new', 6);

    // then
    const highscores = service.getHighscores();
    expect(highscores.length).toBe(10);

    expect(highscores[0].name).toBe('A');
    expect(highscores[0].score).toBe(10);

    expect(highscores[9].name).toBe('I');
    expect(highscores[9].score).toBe(2);
  });

  /*
   * test helper methods below
   */

  function existingHighscore(
    name: string,
    score: number,
    ageInDays: number
  ): Highscore {
    const date = sub(TODAY, { days: ageInDays });
    return new Highscore({ name, date, score });
  }

  function setExistingHighscores(highscores: Highscore[]): void {
    storageMock.setHighscores(highscores);
  }

  function addHighscore(name: string, score: number): void {
    service.addHighscore(createPlayer(name, score));
  }
});
