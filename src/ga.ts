/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import { plot, Plot } from "nodeplotlib";
import { Generation } from "./classes/Generation";
import { Rule } from "./classes/Rule";
import { RunConfig } from "./util/config";
import { crossover, mutation, tournamentSelection } from "./util/helpers";

interface GAConfig {
    config: RunConfig;
    globalRules: Rule[];
    epochs: number;
}

export const findBestFitness = ({ config, globalRules, epochs }: GAConfig) => {

    const generations: Generation[] = [];
    generations.push(new Generation(config));
    generations[0].fitness_func(globalRules);
    let max = 0;
    const plotData: number[] = [];
    const plotBestFit: number[] = [];

    for (let i = 0; i < epochs; i++) {
        let offspring = tournamentSelection(generations[0], config);
        offspring = crossover(offspring, config);
        offspring = mutation(offspring, config);
        generations.push(new Generation(config, offspring));
        if (generations[i].fittest > max) {
            max = generations[i].fittest;
        }
        console.log(`Generation: ${i} Fittest: ${max}`);
        plotData.push(i);
        plotBestFit.push(max);
        generations[i + 1].fitness_func(globalRules);
    }

    const data: Plot[] = [
        {
            x: plotData,
            y: plotBestFit,
            type: 'scatter',
            labels: ['Generation', 'Fittest'],
            name: "Fittest"
        },
    ];

    plot(data, {
        title: `Best Fitness Over ${generations.length - 1} Generations`,
        xaxis: {
            title: "Generation"
        },
        yaxis: {
            title: "Fitness"
        }
    });
}

export const findAvgBestLowFitness = ({ config, globalRules, epochs }: GAConfig) => {

    const generations: Generation[] = [];
    generations.push(new Generation(config));
    generations[0].fitness_func(globalRules);
    let max = 0;
    let max2 = 0;
    let avg = 0;
    let low = 0;
    const plotData: number[] = [];
    const plotBestFit: number[] = [];
    const plotAvgFit: number[] = [];
    const plotLowFit: number[] = [];
    for (let i = 0; i < epochs; i++) {
        let offspring = tournamentSelection(generations[0], config);
        offspring = crossover(offspring, config);
        offspring = mutation(offspring, config);
        generations.push(new Generation(config, offspring));
        avg = generations[i].averageFitness;
        max = generations[i].fittest;
        low = generations[i].lowestFitness;
        console.log(`Generation: ${i} Fittest: ${max} Average: ${avg} Lowest: ${low}`);
        plotData.push(i);
        plotBestFit.push(max);
        plotAvgFit.push(avg);
        plotLowFit.push(low);
        if (generations[i].fittest > max2) {
            max2 = generations[i].fittest;
        }
        generations[i + 1].fitness_func(globalRules);
    }
    console.log("Max Fitness: " + max2);
    const data: Plot[] = [
        {
            x: plotData,
            y: plotBestFit,
            type: 'scatter',
            labels: ['Generation', 'Fittest'],
            name: "Fittest"
        },
        {
            x: plotData,
            y: plotAvgFit,
            type: 'scatter',
            labels: ['Generation', 'Average'],
            name: "Average"
        },
        {
            x: plotData,
            y: plotLowFit,
            type: 'scatter',
            labels: ['Generation', 'Lowest'],
            name: "Lowest"
        },
    ];

    plot(data, {
        title: `Average, Best, & Lowest Fitness Over ${generations.length - 1} Generations`,
        xaxis: {
            title: "Generation"
        },
        yaxis: {
            title: "Fitness"
        }
    });
}