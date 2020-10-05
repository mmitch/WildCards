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
