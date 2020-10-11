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
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { View } from 'src/app/view';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.css']
})
export class CreatePlayerComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  playerName = '';
  isInvalidName = false;

  constructor(private storageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  public onNameChanged(event: Event): void {
    if (event.target) {
      this.playerName = (event.target as HTMLInputElement).value;
    }
  }

  public onCreatePlayer(): void {
    if (this.playerName == null || this.playerName.length === 0) {
      this.isInvalidName = true;
      return;
    }
    this.isInvalidName = false;
    this.storageService.setPlayer(Player.withName(this.playerName));
    this.viewChange.emit(View.BATTLE);
  }

  public onAbort(): void {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
