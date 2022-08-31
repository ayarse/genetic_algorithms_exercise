/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import readline from 'readline';
import path from 'path';
import { Rule } from './classes/Rule';
import { Generation } from './classes/Generation';
import { crossover, mutation, readFile, tournamentSelection } from './util/helpers';
import { plot, Plot } from 'nodeplotlib';
import { data1Config, data2Config, data3Config, RunConfig } from './util/config';

let globalRules: Rule[] = [];

const loadDataSet3 = async (filename: string) => {
    globalRules = [];
    const lines = await readFile(filename);
    for (const line of lines) {
        const data = line.split(" ");
        const last = data.pop()!;

        let gene = "";
        let counter = 0;

        for (const val of data) {
            const floatVal = parseFloat(val);

            gene += floatVal > 0.5 ? "1" : "0";
            counter++;
            if (counter === 6) {
                const condition = gene.split('').map(s => parseInt(s, 10));
                const output = parseInt(last);
                const rule = new Rule(condition, output);
                globalRules.push(rule);
                counter = 0;
                gene = "";
            }
        }
    }
}

const loadData = async (filename: string) => {
    globalRules = [];
    const lines = await readFile(filename);
    for (const line of lines) {

        const splitLine = line.split(' ');
        const condition = splitLine[0].split('').map(s => parseInt(s, 10));
        const output = parseInt(splitLine[1], 10);

        const rule = new Rule(condition, output);
        globalRules.push(rule);
    }
}

const findBestFitness = (config: RunConfig) => {

    const epochs = 500;

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

    plot(data, { title: `Best Fitness Over ${generations.length - 1} Generations` });
}

const findAvgBestLowFitness = (config: RunConfig) => {

    const epochs = 50;

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

    plot(data, { title: `Average, Best, & Lowest Fitness Over ${generations.length - 1} Generations` });
}

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (q: string) => {
    return new Promise((res, rej) => {
        io.question(q, answer => {
            res(answer);
        })
    });
};

const dataFile = (filename: string): string => {
    return path.join(__dirname, `../data/${filename}`);
}

(async function main() {
    let exit = false;
    while (!exit) {
        const answer = await prompt('Choose a data set to run against [1-3]: ');
        let file, config;
        switch (answer) {
            case '1':
                file = dataFile("data1.txt");
                config = data1Config;
                await loadData(file);
                break;
            case '2':
                file = dataFile("data2.txt");
                config = data2Config;
                await loadData(file);
                break;
            case '3':
                file = dataFile("data3.txt");
                config = data3Config;
                await loadDataSet3(file);
                break;
            default:
                process.exit();
                break;
        }


        findBestFitness(config);
        findAvgBestLowFitness(config);
    }
})();