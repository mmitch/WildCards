import { Injectable } from '@angular/core';
import { Highscore } from 'src/app/model/highscore';
import { LocalStorageService } from '../local-storage/local-storage.service';

const MAX_ENTRIES = 10;

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(private localStorageService: LocalStorageService) { }

  public getHighscores(): Highscore[] {
    return this.localStorageService.getHighscores();
  }

  public addHighscore(name: string, score: number): void {
    const newScore: Highscore = { name, date: new Date(), score };

    const highscores = this.getHighscores();
    highscores.push(newScore);

    highscores.sort((a, b) => (b.score - a.score));

    const pruned = highscores.slice(0, MAX_ENTRIES);

    this.localStorageService.setHighscores(pruned);
  }
}
