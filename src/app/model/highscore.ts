export class Highscore {
    name: string;
    date: Date;
    score: number;

    constructor({ name, date, score }: { name: string; date: Date; score: number; }) {
        this.name = name;
        this.date = date;
        this.score = score;
    }
}
