import { Injectable } from '@angular/core';
import { Highscore } from '../models/highscore';

const enum Item {
  HIGHSCORES = 'HIGHSCORES'
}

const MAX_ENTRIES = 10;

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getHighscores(): Highscore[] {
    const highscores = localStorage.getItem(Item.HIGHSCORES);
    return highscores ? JSON.parse(highscores) : [];
  }

  // TODO: move highscore logic top extra service, only keep data storage here
  public addHighscore(name: string, score: number): void {
    const newScore: Highscore = {
      name: name,
      date: new Date(),
      score: score
    };
    const highscores = this.getHighscores();
    highscores.push(newScore);

    highscores.sort((a, b) => (b.score - a.score));

    const pruned = highscores.slice(0, MAX_ENTRIES);
    localStorage.setItem(Item.HIGHSCORES, JSON.stringify(pruned));
  }
}
