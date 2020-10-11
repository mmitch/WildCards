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
import { LocalStorageService } from 'src/app/service/local-storage/local-storage.service';
import { LocalStorageServiceMock } from 'src/app/service/local-storage/local-storage.service.mock';
import { View } from 'src/app/view';

import { CreatePlayerComponent } from './create-player.component';

describe('CreatePlayerComponent', () => {
  let component: CreatePlayerComponent;
  let fixture: ComponentFixture<CreatePlayerComponent>;
  let html: HTMLElement;
  let storageServiceMock: LocalStorageServiceMock;

  beforeEach(async () => {
    storageServiceMock = new LocalStorageServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ CreatePlayerComponent ],
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not save the character if the name is empty', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    setNameInput('');
    html.querySelector('button')?.click();
    fixture.detectChanges();

    // then
    expect(component.viewChange.emit).not.toHaveBeenCalled();
    expect(getNameInput().classList).toContain('is-error');
    expect(storageServiceMock.getPlayer()).toBeUndefined();
  });

  it('should save the character if the name is valid', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    setNameInput('Foo Bar');
    html.querySelector('button')?.click();
    fixture.detectChanges();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.BATTLE);
    expect(getNameInput().classList).not.toContain('is-error');
    expect(storageServiceMock.getPlayer()?.name).toBe('Foo Bar');
    expect(storageServiceMock.getPlayer()?.score).toBe(0);
  });

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

});
