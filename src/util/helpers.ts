// import config from "./config";
import { Generation } from "../classes/Generation";
import { Individual } from "../classes/Individual";
import { RunConfig } from "./config";
import readline from 'readline';
import fs from 'fs';

export const readFile = async (filename: string) => {
    const lines: string[] = [];
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let lineCounter = 0;
    for await (const line of rl) {
        lineCounter++;
        if (lineCounter === 1) {
            continue;
        }
        lines.push(line);
    }
    return lines;
}


export const tournamentSelection = (generation: Generation, config: RunConfig) => {
    const { population } = config;
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

export const crossover = (offspring: Individual[], config: RunConfig) => {
    const { population, geneLength } = config;
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

export const mutation = (offspring: Individual[], config: RunConfig) => {
    const { population, geneLength, mutationRate, datasetLength } = config;
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