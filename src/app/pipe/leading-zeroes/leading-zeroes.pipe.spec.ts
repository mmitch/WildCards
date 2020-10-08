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

import { LeadingZeroesPipe } from './leading-zeroes.pipe';

describe('LeadingzeroesPipe', () => {

  const pipe = new LeadingZeroesPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not change the number without a parameter', () => {
    expect(pipe.transform(9)).toBe('9');
  });

  it('should not change the number if it has more digits than desired', () => {
    expect(pipe.transform(12345, 3)).toBe('12345');
  });

  it('should not change the number if it has exactly as many digits as desired', () => {
    expect(pipe.transform(7890, 4)).toBe('7890');
  });

  it('should prepend zeroes if the number has fewer digits than desired', () => {
    expect(pipe.transform(1337, 7)).toBe('0001337');
  });
});
