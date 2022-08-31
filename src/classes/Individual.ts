import { RunConfig } from "../util/config";
import { Rule } from "./Rule";
export class Individual {
    genes: number[];
    fitness: number = 0;
    rulebase: Rule[] = [];

    geneLength: number;
    datasetLength: number;

    constructor(config: RunConfig, genes?: number[]) {

        this.geneLength = config.geneLength;
        this.datasetLength = config.datasetLength;

        if (!genes) {
            this.genes = [];
            for (let i = 0; i < this.geneLength; i++) {
                this.genes.push(Math.floor(Math.random() * (i + 1 % this.datasetLength === 0 ? 2 : 3)));
            }
        } else {
            this.genes = genes;
        }
    }

    fitness_func(globalRules: Rule[]) {
        this.fitness = 0;
        this.rulebase = [];
        for (let i = 0; i < this.geneLength; i += this.datasetLength) {
            const line = this.genes.slice(i, i + this.datasetLength);
            const condition = line.slice(0, this.datasetLength - 1);
            const action = line[this.datasetLength - 1];
            this.rulebase.push(new Rule(condition, action));
        }
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 10; j++) {
                let matches = 0;
                for (let l = 0; l < this.datasetLength - 1; l++) {
                    if (this.rulebase[j].condition[l] === globalRules[i].condition[l] || this.rulebase[j].condition[l] === 2) {
                        matches++;
                    }
                }
                if (matches === this.datasetLength - 1) {
                    if (this.rulebase[j].output === globalRules[i].output) {
                        this.fitness++;
                    }
                    break;
                }
            }
        }
    }

}