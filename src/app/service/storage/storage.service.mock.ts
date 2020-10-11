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
import { Highscore } from 'src/app/model/highscore';
import { Player } from 'src/app/model/player';
import { StorageService } from './storage.service';

@Injectable()
export class StorageServiceMock implements StorageService {

  private highscores: Highscore[];
  private player?: Player;

  constructor() {
    this.highscores = [];
  }

  public getHighscores(): Highscore[] {
    return [...this.highscores];
  }

  public setHighscores(highscores: Highscore[]): void {
    this.highscores = [...highscores];
  }

  public getPlayer(): Player | undefined {
    return this.player;
  }

  public setPlayer(player: Player): void {
    this.player = this.copy(player);
  }

  public deletePlayer(): void {
    this.player = undefined;
  }

  private copy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
