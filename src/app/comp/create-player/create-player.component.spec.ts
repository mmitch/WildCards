/*
 * Copyright (C) 2020  Christian Garbs <mitch@cgarbs.de>
 * Licensed under GNU GPL v3 or later.
 *
 * This file is part of Wild Cards.
 *
 * Wild Cards is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wild Cards is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wild Cards.  If not, see <http://www.gnu.org/licenses/>.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Player } from 'src/app/model/player';
import { HighscoreService } from 'src/app/service/highscore/highscore.service';
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { LocalStorageServiceMock } from 'src/app/service/local-storage/local-storage.service.mock';
import { PlayerService } from 'src/app/service/player/player.service';
import { View } from 'src/app/view';

import { CreatePlayerComponent } from './create-player.component';

const SAVED_PLAYER: Player = {
  name: 'Foo',
  score: 7,
};

describe('CreatePlayerComponent', () => {
  let component: CreatePlayerComponent;
  let fixture: ComponentFixture<CreatePlayerComponent>;
  let html: HTMLElement;
  let playerService: PlayerService;
  let highscoreService: HighscoreService;

  beforeEach(async () => {
    const storageServiceMock = new LocalStorageServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ CreatePlayerComponent ],
      providers: [ { provide: LocalStorageService, useValue: storageServiceMock } ],
    })
    .overrideComponent( CreatePlayerComponent, {
        set: {
          providers: [ { provide: LocalStorageService, useValue: storageServiceMock } ],
        }})
    .compileComponents();
  });

  beforeEach(() => {
    createComponent();
    playerService = TestBed.inject(PlayerService);
    highscoreService = TestBed.inject(HighscoreService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not save the character if the name is invalid', () => {
    // given
    setNameInput('');

    // when
    clickCreateCharacter();

    // then
    expect(getSavedPlayer()).toBeUndefined();
  });

  it('should not change to battle screen if the name is invalid', () => {
    // given
    setNameInput('');

    // when
    clickCreateCharacter();

    // then
    expect(component.viewChange.emit).not.toHaveBeenCalled();
  });

  it('should show the error if the name is invalid', () => {
    // given
    setNameInput('');

    // when
    clickCreateCharacter();

    // then
    expect(getNameInput().classList).toContain('is-error');
  });

  it('should save the character if the name is valid', () => {
    // given
    setNameInput('Foo Bar');

    // when
    clickCreateCharacter();

    // then
    const savedPlayer = getSavedPlayer();
    expect(savedPlayer?.name).toBe('Foo Bar');
    expect(savedPlayer?.score).toBe(0);
  });

  it('should change to battle screen if the name is valid', () => {
    // given
    setNameInput('Foo Bar');

    // when
    clickCreateCharacter();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.BATTLE);
  });

  it('should show no error if the name is valid', () => {
    // given
    setNameInput('Foo Bar');

    // when
    clickCreateCharacter();

    // then
    expect(getNameInput().classList).not.toContain('is-error');
  });

  it('should not save the character on abort', () => {
    // given
    setNameInput('Foo Bar');

    // when
    clickAbort();

    // then
    expect(getSavedPlayer()).toBeUndefined();
  });

  it('should change to main menu on abort character on abort', () => {
    // given
    setNameInput('Foo Bar');

    // when
    clickAbort();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  it('should abort even with invalid name', () => {
    // given
    setNameInput('');

    // when
    clickAbort();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });

  it('should show no warning if no player already exists', () => {
    // given

    // when
    createComponent();

    // then
    expect(getWarning()).toBeNull();
  });

  it('should show a warning if a player already exists', () => {
    // given
    setSavedPlayer();

    // when
    createComponent();

    // then
    const warning = getWarning();
    expect(warning).not.toBeNull();
    const text = warning?.textContent;
    expect(text).toContain('will overwrite');
    expect(text).toContain('existing character ' + SAVED_PLAYER.name);
    expect(text).toContain('score of ' + SAVED_PLAYER.score);
  });

  it('should add existing character to highscores when creating a new one', () => {
    // given
    setSavedPlayer();
    createComponent();
    setNameInput('New Player');

    // when
    clickCreateCharacter();

    // then
    const highscores = highscoreService.getHighscores();
    expect(highscores.length).toBe(1);
    expect(highscores[0].name).toBe(SAVED_PLAYER.name);
    expect(highscores[0].score).toBe(SAVED_PLAYER.score);
  });

  /*
   * test helper methods below
   */

  function getNameInput(): HTMLInputElement {
    const element = html.querySelector<HTMLInputElement>('input#name_field');
    if (element) {
      return element;
    }
    fail('name input element not found');
    return new HTMLInputElement(); // to keep method signature happy; fail() is not recognized
  }

  function setSavedPlayer(): void {
    playerService.savePlayer(SAVED_PLAYER);
  }

  function setNameInput(name: string): void {
    getNameInput().value = name;
    getNameInput().dispatchEvent(new Event('input'));
  }

  function clickCreateCharacter(): void {
    html.querySelector<HTMLButtonElement>('button#create')?.click();
    fixture.detectChanges();
  }

  function clickAbort(): void {
    html.querySelector<HTMLButtonElement>('button#abort')?.click();
    fixture.detectChanges();
  }

  function getSavedPlayer(): Player | undefined {
    return playerService.loadPlayer();
  }

  function getWarning(): HTMLDivElement | null {
    return html.querySelector<HTMLDivElement>('div#playerExists');
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(CreatePlayerComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
    spyOn(component.viewChange, 'emit');
  }

});
