import { Component, Input, setTestabilityGetter } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { View } from './view';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  view = View.TITLE;
  allViews = View;

  constructor(private title: Title) {
    title.setTitle('PlaceHolder');
  }

  public onViewChange(newView: View) {
    this.view = newView;
  }

}


