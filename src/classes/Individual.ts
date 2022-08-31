import config from "../util/config";
import { Rule } from "./Rule";

const { geneLength, datasetLength } = config;

export class Individual {
    genes: number[];
    fitness: number = 0;
    rulebase: Rule[] = [];

    constructor(genes?: number[]) {
        if (!genes) {
            this.genes = [];
            for (let i = 0; i < geneLength; i++) {
                this.genes.push(Math.floor(Math.random() * (i + 1 % datasetLength === 0 ? 2 : 3)));
            }
        } else {
            this.genes = genes;
        }
    }

    fitness_func(globalRules: Rule[]) {
        this.fitness = 0;
        this.rulebase = [];
        for (let i = 0; i < geneLength; i += datasetLength) {
            const line = this.genes.slice(i, i + datasetLength);
            const condition = line.slice(0, datasetLength - 1);
            const action = line[datasetLength - 1];
            this.rulebase.push(new Rule(condition, action));
        }
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 10; j++) {
                let matches = 0;
                for (let l = 0; l < datasetLength - 1; l++) {
                    if (this.rulebase[j].condition[l] === globalRules[i].condition[l] || this.rulebase[j].condition[l] === 2) {
                        matches++;
                    }
                }
                if (matches === datasetLength - 1) {
                    if (this.rulebase[j].output === globalRules[i].output) {
                        this.fitness++;
                    }
                    break;
                }
            }
        }
    }

}