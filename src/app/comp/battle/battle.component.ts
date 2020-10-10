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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { HighscoreService } from 'src/app/service/highscore/highscore.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { View } from 'src/app/view';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  playerName = '';
  battleStarted = false;
  battleEnded = false;
  isInvalidName = false;

  player?: Player; // FIXME: always have a Player here

  constructor(
    private highscoreService: HighscoreService,
    private storageService: LocalStorageService)
    { }

  ngOnInit(): void {
  }

  public onNameChanged(event: Event): void {
    if (event.target) {
      this.playerName = (event.target as HTMLInputElement).value;
    }
  }

  public onStartBattle(): void {
    if (this.playerName == null || this.playerName.length === 0) {
      this.isInvalidName = true;
      return;
    }
    this.isInvalidName = false;
    this.battleStarted = true;
    this.player = Player.withName(this.playerName);
  }

  public onAttack(): void {
    if (Math.random() < 0.7) {
      if (this.player) { // FIXME: remove this check when player is always there
        this.player.score++;
      }
      // FIXME: add flash Animation here
    }
    else {
      this.battleEnded = true;
      if (this.player) { // FIXME: remove this check when player is always there
          this.highscoreService.addHighscore(this.player);
      }
      this.storageService.deletePlayer();
    }
  }

  public onSave(): void {
    if (this.player) { // FIXME: remove this check when player is always there
      this.storageService.setPlayer(this.player);
    }
    this.onReturnToMainMenu();
  }

  public onReturnToMainMenu(): void {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
