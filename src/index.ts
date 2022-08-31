/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

import { Rule } from './classes/Rule';
import { data1Config, data2Config, data3Config } from './util/config';
import { loadData, loadDataSet3 } from './util/loaders';
import { findAvgBestLowFitness, findBestFitness } from './ga';
import { dataFile, prompt } from './util/helpers';

let globalRules: Rule[] = [];

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