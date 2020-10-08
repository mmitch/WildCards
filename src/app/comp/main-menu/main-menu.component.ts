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
import { View } from 'src/app/view';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  constructor() { }

  ngOnInit(): void {
  }

  public onShowTitle(): void {
    this.viewChange.emit(View.TITLE);
  }

  public onStartBattle(): void {
    this.viewChange.emit(View.BATTLE);
  }

  public onShowHighScores(): void {
    this.viewChange.emit(View.HIGHSCORES);
  }

}
