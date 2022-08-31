/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import readline from 'readline';
import path from 'path';
import { Rule } from './classes/Rule';
import { data1Config, data2Config, data3Config } from './util/config';
import { loadData, loadDataSet3 } from './util/loaders';
import { findAvgBestLowFitness, findBestFitness } from './ga';

let globalRules: Rule[] = [];

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
                globalRules = await loadData(file);
                break;
            case '2':
                file = dataFile("data2.txt");
                config = data2Config;
                globalRules = await loadData(file);
                break;
            case '3':
                file = dataFile("data3.txt");
                config = data3Config;
                globalRules = await loadDataSet3(file);
                break;
            default:
                process.exit();
                break;
        }

        findBestFitness({
            config,
            globalRules,
            epochs: 500,
        });

        findAvgBestLowFitness({
            config,
            globalRules,
            epochs: 50
        });
    }
})();