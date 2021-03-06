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
import { Player, VERSION } from 'src/app/model/player';
import { HighscoreService } from '../highscore/highscore.service';
import { StorageService } from '../storage/storage.service';
import { StorageServiceMock } from '../storage/storage.service.mock';

import { createPlayer, PlayerService } from './player.service';

describe('PlayerService', () => {
  let storageServiceMock: StorageServiceMock;
  let highscoreService: HighscoreService;
  let service: PlayerService;

  const PLAYER: Player = {
    name: 'Baz',
    score: 12,
    version: VERSION,
  };

  const PLAYER_UP_TO_DATE: Player = {
    name: 'Baz',
    score: 30,
    version: VERSION,
  };

  const PLAYER_OLD_VERSION: Player = {
    name: 'Baz',
    score: 30,
    version: VERSION - 1,
  };

  beforeEach(() => {
    storageServiceMock = new StorageServiceMock();
    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageServiceMock }],
    });
    highscoreService = TestBed.inject(HighscoreService);
    service = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should write player to local storage', () => {
    // given

    // when
    service.savePlayer(PLAYER);

    // then
    expect(storageServiceMock.getPlayer()).toEqual(PLAYER);
  });

  it('should read a saved player', () => {
    // given
    storageServiceMock.setPlayer(PLAYER);

    // when
    const player = service.loadPlayer();

    // then
    expect(player).toEqual(PLAYER);
  });

  it('should return undefined if no player was saved', () => {
    // given

    // when
    const player = service.loadPlayer();

    // then
    expect(player).toBeUndefined();
  });

  it('should return undefined if player was saved with a different version', () => {
    // given
    storageServiceMock.setPlayer(PLAYER_OLD_VERSION);

    // when
    const player = service.loadPlayer();

    // then
    expect(player).toBeUndefined();
  });

  it('should delete player when she dies', () => {
    // given
    storageServiceMock.setPlayer(PLAYER);

    // when
    service.onPlayerDeath(PLAYER_UP_TO_DATE);

    // then
    expect(storageServiceMock.getPlayer()).toBeUndefined();
  });

  it('should add player to highscore list when she dies', () => {
    // given

    // when
    service.onPlayerDeath(PLAYER_UP_TO_DATE);

    // then
    const highscores = highscoreService.getHighscores();
    expect(highscores.length).toBe(1);
    expect(highscores[0].name).toBe(PLAYER_UP_TO_DATE.name);
    expect(highscores[0].score).toBe(PLAYER_UP_TO_DATE.score);
  });
});

describe('createPlayer()', () => {
  it('should set default score and version when called only with a name', () => {
    // given

    // when
    const player = createPlayer('foo');

    // then
    expect(player.name).toEqual('foo');
    expect(player.score).toEqual(0);
    expect(player.version).toEqual(VERSION);
  });

  it('should set default version when called only with a name and a score', () => {
    // given

    // when
    const player = createPlayer('foo', 127);

    // then
    expect(player.name).toEqual('foo');
    expect(player.score).toEqual(127);
    expect(player.version).toEqual(VERSION);
  });

  it('should set all values when called with all values', () => {
    // given

    // when
    const player = createPlayer('foo', 13, 5);

    // then
    expect(player.name).toEqual('foo');
    expect(player.score).toEqual(13);
    expect(player.version).toEqual(5);
  });
});
