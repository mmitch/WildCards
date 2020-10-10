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
import { View } from 'src/app/view';

import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should request switch to the title screen when the title button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#title')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.TITLE);
  });

  it('should request switch to the highscore screen when the highscore button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#highscores')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.HIGHSCORES);
  });

  it('should request switch to the create player screen when the start battle button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector<HTMLButtonElement>('button#battle')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.CREATE_PLAYER);
  });
});
