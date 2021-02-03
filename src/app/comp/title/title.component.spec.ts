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

import { TitleComponent } from './title.component';

const PROJECT_URL = 'https://github.com/mmitch/WildCards';
const AUTHOR = 'Christian Garbs';
const AUTHOR_LINK = 'https://www.cgarbs.de/';
const LICENSE = 'GNU GPL v3 or later';
const LICENSE_URL = 'http://www.gnu.org/licenses/';
const VOID_TYRANT_URL = 'https://play.google.com/store/apps/details?id=com.armorgames.voidtyrant';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let html: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the app name', () => {
    expect(html.querySelector('h1')?.textContent).toContain('Wild Cards');
  });

  it('should link to the github repository', () => {
    // given

    // when
    const project = html.querySelector<HTMLParagraphElement>('p#project');

    // then
    expect(project?.textContent).toContain('Project homepage:');
    expect(project?.textContent).toContain(PROJECT_URL);

    const link = project?.querySelector('a');
    expect(link?.href).toBe(PROJECT_URL);
    expect(link?.textContent).toBe(PROJECT_URL);
  });

  it('should display copyright information', () => {
    // given

    // when
    const project = html.querySelector<HTMLParagraphElement>('p#copyright');

    // then
    expect(project?.textContent).toContain('Copyright (C) 20');
    expect(project?.textContent).toContain(AUTHOR);

    const link = project?.querySelector('a');
    expect(link?.href).toBe(AUTHOR_LINK);
    expect(link?.textContent).toBe(AUTHOR);
  });

  it('should display the license', () => {
    // given

    // when
    const project = html.querySelector<HTMLParagraphElement>('p#license');

    // then
    expect(project?.textContent).toContain('Licensed under');
    expect(project?.textContent).toContain(LICENSE);

    const link = project?.querySelector('a');
    expect(link?.href).toBe(LICENSE_URL);
    expect(link?.textContent).toBe(LICENSE);
  });

  it('should display the build version placeholder', () => {
    // given

    // when
    const project = html.querySelector<HTMLParagraphElement>('p#build');

    // then
    expect(project?.textContent).toBe('built at local from development/unknown');
  });

  it('should honor its Void Tyrant heritage', () => {
    // given

    // when
    const remake = html.querySelector<HTMLParagraphElement>('p#remake');

    // then
    expect(remake?.textContent).toContain('This is a bare-bones remake of Void Tyrant.');

    const link = remake?.querySelector('a');
    expect(link?.href).toBe(VOID_TYRANT_URL);
    expect(link?.textContent).toBe('Void Tyrant');
  });

  it('should request switch to the main menu when the button is clicked', () => {
    // given
    spyOn(component.viewChange, 'emit');

    // when
    html.querySelector('button')?.click();

    // then
    expect(component.viewChange.emit).toHaveBeenCalledWith(View.MAIN_MENU);
  });
});
