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

import { CreatePlayerComponent } from './create-player.component';

describe('CreatePlayerComponent', () => {
  let component: CreatePlayerComponent;
  let fixture: ComponentFixture<CreatePlayerComponent>;
  let html: HTMLElement;
  let playerService: PlayerService;

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
    fixture = TestBed.createComponent(CreatePlayerComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
    spyOn(component.viewChange, 'emit');
    playerService = TestBed.inject(PlayerService);
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

});
