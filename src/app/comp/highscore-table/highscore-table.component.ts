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

import { Component, EventEmitter, NgModule, OnInit, Output } from '@angular/core';
import { Highscore } from 'src/app/model/highscore';
import { HighscoreService } from 'src/app/service/highscore/highscore.service';
import { View } from 'src/app/view';

@Component({
  selector: 'app-highscore-table',
  templateUrl: './highscore-table.component.html',
  styleUrls: ['./highscore-table.component.css'],
})
export class HighscoreTableComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  highscores: Highscore[] = [];

  constructor(private highscoreService: HighscoreService) { }

  ngOnInit(): void {
    this.highscores = this.highscoreService.getHighscores();
  }

  public showMainMenu(): void {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
