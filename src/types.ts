import { word } from "tipa"

export type correspondence = (number | null)[]

export type markedness_constraint = (output: word) => number

export type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number