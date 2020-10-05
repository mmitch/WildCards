import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/model/player';
import { HighscoreService } from 'src/app/service/highscore/highscore.service';
import { View } from 'src/app/view';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  @Output() viewChange = new EventEmitter<View>();

  playerName = '';
  battleStarted = false;
  battleEnded = false;
  isInvalidName = false;

  player?: Player; // FIXME: always have a Player here

  constructor(private highscoreService: HighscoreService) { }

  ngOnInit(): void {
  }

  public onNameChanged(event: Event): void {
    if (event.target) {
      this.playerName = (event.target as HTMLInputElement).value;
    }
  }

  public onStartBattle(): void {
    if (this.playerName == null || this.playerName.length === 0) {
      this.isInvalidName = true;
      return;
    }
    this.isInvalidName = false;
    this.battleStarted = true;
    this.player = new Player(this.playerName);
  }

  public onAttack(): void {
    if (Math.random() < 0.7) {
      if (this.player) { // FIXME: remove this check when player is always there
        this.player.score++;
      }
      // FIXME: add flash Animation here
    }
    else {
      this.battleEnded = true;
      if (this.player) { // FIXME: remove this check when player is always there
          this.highscoreService.addHighscore(this.player.name, this.player.score);
      }
    }
  }

  public onReturnToMainMenu(): void {
    this.viewChange.emit(View.MAIN_MENU);
  }
}
