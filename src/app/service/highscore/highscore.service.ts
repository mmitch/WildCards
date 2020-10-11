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
import { LocalStorageService } from '../local-storage/local-storage.service';

const MAX_ENTRIES = 10;

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(private localStorageService: LocalStorageService) { }

  public getHighscores(): Highscore[] {
    return this.localStorageService.getHighscores();
  }

  public addHighscore(player: Player): void {
    const newScore = new Highscore({ name: player.name, date: new Date(), score: player.score });

    const highscores = this.getHighscores();
    highscores.push(newScore);

    highscores.sort(this.sortByScoreAndDate);

    const pruned = highscores.slice(0, MAX_ENTRIES);

    this.localStorageService.setHighscores(pruned);
  }

  private sortByScoreAndDate(a: Highscore, b: Highscore): number {
    return b.score - a.score || a.date.getTime() - b.date.getTime();
  }
}
