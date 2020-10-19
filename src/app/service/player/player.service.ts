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
import { Player, VERSION } from 'src/app/model/player';
import { HighscoreService } from '../highscore/highscore.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private storageService: StorageService,
    private highscoreService: HighscoreService,
    ) { }

  public savePlayer(player: Player): void {
    this.storageService.setPlayer(player);
  }

  public loadPlayer(): Player | undefined {
    const player = this.storageService.getPlayer();
    if (player) {
      if (player.version === VERSION) {
        return player;
      }
      console.warn(`did not load saved player: version mismatch of saved object (got ${player.version}, expected ${VERSION})`);
    }
    return undefined;
  }

  public onPlayerDeath(player: Player): void {
    this.storageService.deletePlayer();
    this.highscoreService.addHighscore(player);
  }
}
