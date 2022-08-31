/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import { RunConfig } from "../util/config";
import { Individual } from "./Individual";
import { Rule } from "./Rule";



export class Generation {
    individuals: Individual[];
    fittest: number = 0;
    lowestFitness: number = 0;
    averageFitness: number = 0;

    population: number;

    constructor(config: RunConfig, individuals?: Individual[]) {

        this.population = config.population;
        if (!individuals) {
            this.individuals = [];
            for (let i = 0; i < this.population; i++) {
                this.individuals.push(new Individual(config));
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
        for (let i = 0; i < this.population; i++) {
            if (this.individuals[i].fitness > this.fittest) {
                this.lowestFitness = this.fittest;
                this.fittest = this.individuals[i].fitness;
            }

            total = total + this.individuals[i].fitness;
        }

        this.averageFitness = total / this.population;
    }
}