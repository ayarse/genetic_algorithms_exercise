import config from "./config";
import { Generation } from "../classes/Generation";
import { Individual } from "../classes/Individual";

const { population, geneLength, mutationRate, datasetLength } = config;

export const tournamentSelection = (generation: Generation) => {
    const offspring: Individual[] = [];
    for (let i = 0; i < population; i++) {
        let candidate1 = Math.floor(Math.random() * population);
        let candidate2 = Math.floor(Math.random() * population);
        while (candidate1 === candidate2) {
            candidate1 = Math.floor(Math.random() * population);
            candidate2 = Math.floor(Math.random() * population);
        }
        if (generation.individuals[candidate1].fitness
            >= generation.individuals[candidate2].fitness) {
            offspring.push(generation.individuals[candidate1]);
        } else {
            offspring.push(generation.individuals[candidate2]);
        }
    }
    return offspring;
}

export const crossover = (offspring: Individual[]) => {
    for (let i = 0; i < population; i += 2) {
        const crossoverPoint = Math.floor(Math.random() * population);
        for (let j = crossoverPoint; j < geneLength; j++) {
            const temp = offspring[i].genes[j];
            const temp2 = offspring[i + 1].genes[j];
            offspring[i].genes[j] = temp2;
            offspring[i + 1].genes[j] = temp;
        }
    }
    return offspring;
}

export const mutation = (offspring: Individual[]) => {
    for (let i = 0; i < population; i++) {
        for (let j = 0; j < geneLength; j++) {
            if (Math.floor(Math.random() * 100) <= mutationRate) {
                if ((j + 1) % datasetLength === 0) {
                    offspring[i].genes[j] = offspring[i].genes[j] === 0 ? 1 : 0;
                } else {
                    offspring[i].genes[j] = offspring[i].genes[j] === 0
                        ? Math.floor(Math.random() * 2) + 1
                        : offspring[i].genes[j] === 1
                            ? Math.floor(Math.random() * 2)
                            : Math.floor(Math.random() * 2);
                }
            }
        }
    }
    return offspring;
}