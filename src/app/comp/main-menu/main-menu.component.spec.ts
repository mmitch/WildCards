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
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { LocalStorageServiceMock } from 'src/app/service/local-storage/local-storage.service.mock';
import { PlayerService } from 'src/app/service/player/player.service';
import { View } from 'src/app/view';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let html: HTMLElement;
  let playerService: PlayerService;

  beforeEach(async () => {
    const storageServiceMock = new LocalStorageServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ],
      providers: [ { provide: LocalStorageService, useValue: storageServiceMock } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    createComponent();
    playerService = TestBed.inject(PlayerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the title screen when the title button is clicked', () => {
    // given

    // when
    getButton('title')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.TITLE);
  });

  it('should request switch to the highscore screen when the highscore button is clicked', () => {
    // given

    // when
    getButton('highscores')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.HIGHSCORES);
  });

  it('should request switch to the create player screen when the new game button is clicked', () => {
    // given

    // when
    getButton('start')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.CREATE_PLAYER);
  });

  it('should request switch to the battle screen when the continue button is clicked and a saved player exists', () => {
    // given
    playerService.savePlayer(Player.withName('test'));
    createComponent();

    // when
    getButton('continue')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.BATTLE);
  });

  it('should not switch to the battle screen when the continue button is clicked but no saved player exists', () => {
    // given

    // when
    getButton('continue')?.click();

    // then
    expect(component.viewChange.emit).not.toHaveBeenCalled();
  });

  it('should disable the continue button if there is no saved player', () => {
    // given

    // when
    createComponent();

    // then
    expect(getButton('continue')?.classList).toContain('is-disabled');
  });

  it('should enable the continue button if there is a saved player', () => {
    // given
    playerService.savePlayer(Player.withName('test'));

    // when
    createComponent();

    // then
    expect(getButton('continue')?.classList).not.toContain('is-disabled');
  });

  /*
   * test helper methods below
   */

  function createComponent(): void {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
    spyOn(component.viewChange, 'emit');
  }

  function getButton(id: string): HTMLButtonElement | null {
    return html.querySelector<HTMLButtonElement>('button#' + id);
  }

});
