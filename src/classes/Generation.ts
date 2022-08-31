import config from "../util/config";
import { Individual } from "./Individual";
import { Rule } from "./Rule";

const { population } = config;

export class Generation {
    individuals: Individual[];
    fittest: number = 0;
    lowestFitness: number = 0;
    averageFitness: number = 0;

    constructor(individuals?: Individual[]) {
        if (!individuals) {
            this.individuals = [];
            for (let i = 0; i < population; i++) {
                this.individuals.push(new Individual());
            }
        } else {
            this.individuals = individuals;
        }
    }

    fitness_func(globalRules: Rule[]) {
        for (let individual of this.individuals) {
            individual.fitness_func(globalRules);
        }

        let total = 0;
        for (let i = 0; i < population; i++) {
            if (this.individuals[i].fitness > this.fittest) {
                this.lowestFitness = this.fittest;
                this.fittest = this.individuals[i].fitness;
            }

            total = total + this.individuals[i].fitness;
        }

        this.averageFitness = total / population;
    }
}