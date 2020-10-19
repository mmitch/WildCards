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

export const VERSION = 1;

export class Player {
    name: string;
    score: number;
    version: number;

    public static withName(name: string): Player {
        return new Player({name, score: 0, version: VERSION});
    }

    public static withNameAndScore(name: string, score: number): Player {
        return new Player({name, score, version: VERSION});
    }

    constructor({ name, score, version }: { name: string; score: number; version: number }) {
        this.name = name;
        this.score = score;
        this.version = version;
    }

}
