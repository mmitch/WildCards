import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { View } from 'src/app/view';

@Component({
  selector: 'app-highscore-table',
  templateUrl: './highscore-table.component.html',
  styleUrls: ['./highscore-table.component.css']
})
export class HighscoreTableComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();
  
  constructor() { }

  ngOnInit(): void {
  }

  public showMainMenu() {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
