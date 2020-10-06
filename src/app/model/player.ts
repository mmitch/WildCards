export class Player {
    name: string;
    score: number;

    public static withName(name: string): Player {
        return new Player({name, score: 0});
    }


    constructor({ name, score }: { name: string; score: number; }) {
        this.name = name;
        this.score = score;
    }
}
