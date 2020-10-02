import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { View } from '../view';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  constructor() { }

  ngOnInit(): void {
  }

  public showMainMenu() {
    this.viewChange.emit(View.MAIN_MENU);
  }

}
