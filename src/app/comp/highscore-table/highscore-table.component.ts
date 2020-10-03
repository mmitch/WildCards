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
  
  constructor(private highscoreService: HighscoreService) { 
  }

  ngOnInit(): void {
    this.highscores = this.highscoreService.getHighscores();
  }

  public showMainMenu() {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
