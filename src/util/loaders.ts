import { Rule } from "../classes/Rule";
import { readFile } from "./helpers";

export const loadDataSet3 = async (filename: string) => {
    const rules = [];
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
                rules.push(rule);
                counter = 0;
                gene = "";
            }
        }
    }
    return rules;
}

export const loadData = async (filename: string) => {
    const rules = [];
    const lines = await readFile(filename);
    for (const line of lines) {

        const splitLine = line.split(' ');
        const condition = splitLine[0].split('').map(s => parseInt(s, 10));
        const output = parseInt(splitLine[1], 10);

        const rule = new Rule(condition, output);
        rules.push(rule);
    }
    return rules;
}