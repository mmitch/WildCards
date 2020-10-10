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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './comp/title/title.component';
import { MainMenuComponent } from './comp/main-menu/main-menu.component';
import { HighscoreTableComponent } from './comp/highscore-table/highscore-table.component';
import { LeadingZeroesPipe } from './pipe/leading-zeroes/leading-zeroes.pipe';
import { BattleComponent } from './comp/battle/battle.component';
import { CreatePlayerComponent } from './comp/create-player/create-player.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MainMenuComponent,
    HighscoreTableComponent,
    LeadingZeroesPipe,
    BattleComponent,
    CreatePlayerComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
