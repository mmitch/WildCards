import { Injectable } from '@angular/core';
import { Highscore } from '../models/highscore';

const enum Item {
  HIGHSCORES = 'HIGHSCORES'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getHighscores(): Highscore[] {
    const highscores = localStorage.getItem(Item.HIGHSCORES);
    return highscores ? JSON.parse(highscores) : [];
  }

  public setHighscores(highscores: Highscore[]): void {
    localStorage.setItem(Item.HIGHSCORES, JSON.stringify(highscores));
  }
}
