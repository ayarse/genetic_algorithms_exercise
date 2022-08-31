export class Rule {
    condition: number[];
    output: number;

    constructor(condition: number[], output: number) {
        this.condition = condition;
        this.output = output;
    }
}