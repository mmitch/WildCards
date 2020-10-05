import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './comp/title/title.component';
import { MainMenuComponent } from './comp/main-menu/main-menu.component';
import { HighscoreTableComponent } from './comp/highscore-table/highscore-table.component';
import { LeadingZeroesPipe } from './pipe/leading-zeroes/leading-zeroes.pipe';
import { BattleComponent } from './comp/battle/battle.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MainMenuComponent,
    HighscoreTableComponent,
    LeadingZeroesPipe,
    BattleComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
