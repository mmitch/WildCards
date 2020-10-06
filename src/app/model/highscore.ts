export class Highscore {
    name: string;
    date: Date;
    score: number;

    constructor(name: string, date: Date, score: number) {
        this.name = name;
        this.date = date;
        this.score = score;
    }
}
