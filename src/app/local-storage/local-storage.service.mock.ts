import { Injectable } from '@angular/core';
import { Highscore } from '../models/highscore';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceMock implements LocalStorageService {

  private highscores: Highscore[];

  constructor() {
    this.highscores = [];
  }

  public getHighscores(): Highscore[] {
    return [...this.highscores];
  }

  public setHighscores(highscores: Highscore[]): void {
    this.highscores = [...highscores];
  }

}
