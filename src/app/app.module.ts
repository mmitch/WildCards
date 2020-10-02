import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TitleComponent } from './title/title.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HighscoreTableComponent } from './highscore-table/highscore-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    MainMenuComponent,
    HighscoreTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
