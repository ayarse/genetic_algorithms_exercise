/**
 * Ayas Nasih - S1600655
 * Villa College - BSCHCS (Jan 2020)
 */

export interface RunConfig {
    geneLength: number,
    population: number,
    mutationRate: number,
    datasetLength: number

    lineCount: number
}

export const data1Config: RunConfig = {
    geneLength: 60,
    population: 10,
    mutationRate: 1,
    datasetLength: 6,

    lineCount: 33,
}

export const data2Config: RunConfig = {
    geneLength: 70,
    population: 10,
    mutationRate: 8,
    datasetLength: 7,

    lineCount: 65,
}

export const data3Config: RunConfig = {
    geneLength: 70,
    population: 10,
    mutationRate: 8,
    datasetLength: 7,

    lineCount: 2001,
}