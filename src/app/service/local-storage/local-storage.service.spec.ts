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
import { Highscore } from 'src/app/model/highscore';
import { Player } from 'src/app/model/player';

import { LocalStorageService } from './local-storage.service';

const HIGHSCORES: Highscore[] = [
  { name: 'foo', date: new Date(), score: 13 },
  { name: 'bar', date: new Date(), score:  7 },
];
const HIGHSCORES_STRING = JSON.stringify(HIGHSCORES);

const PLAYER: Player = {
  name: 'foo',
  score: 1337,
};
const PLAYER_STRING = JSON.stringify(PLAYER);

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

  it('should write player to local storage', () => {
    // given

    // when
    service.setPlayer(PLAYER);

    // then
    expect(localStorage.getItem('PLAYER')).toBe(PLAYER_STRING);
  });

  it('should delete player from local storage', () => {
    // given
    service.setPlayer(PLAYER);

    // when
    service.deletePlayer();

    // then
    expect(localStorage.getItem('PLAYER')).toBeNull();
  });

  it('should read a saved player', () => {
    // given
    localStorage.setItem('PLAYER', PLAYER_STRING);

    // when
    const player = service.getPlayer();

    // then
    expect(player).toEqual(PLAYER);
  });

  it('should return undefined if no player was saved', () => {
    // given

    // when
    const player = service.getPlayer();

    // then
    expect(player).toBeUndefined();
  });
});
