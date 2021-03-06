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

import { Injectable } from '@angular/core';
import { Highscore, HighscoreEntity } from 'src/app/model/highscore';
import { Player } from 'src/app/model/player';
import { StorageService } from './storage.service';

const enum Item {
  HIGHSCORES = 'HIGHSCORES',
  PLAYER = 'PLAYER',
}

@Injectable({
  providedIn: 'root'
})
export class LocalBrowserStorageService implements StorageService {

  constructor() { }

  public getHighscores(): Highscore[] {
    const highscores = localStorage.getItem(Item.HIGHSCORES);
    if (!highscores) {
      return [];
    }
    const serialized: HighscoreEntity[] = JSON.parse(highscores);
    return serialized.map(s => Highscore.deserialize(s));
  }

  public setHighscores(highscores: Highscore[]): void {
    const serialized = highscores.map(highscore => highscore.serialize());
    localStorage.setItem(Item.HIGHSCORES, JSON.stringify(serialized));
  }

  public getPlayer(): Player | undefined {
    const player = localStorage.getItem(Item.PLAYER);
    return player ? JSON.parse(player) : undefined;
  }

  public setPlayer(player: Player): void {
    localStorage.setItem(Item.PLAYER, JSON.stringify(player));
  }

  public deletePlayer(): void {
    localStorage.removeItem(Item.PLAYER);
  }
}
