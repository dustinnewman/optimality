import { word, word_break } from "tipa"

export { word }

export type correspondence = (number | null)[]

export type markedness_constraint = (output: word) => number

export type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number

export type constraint = markedness_constraint | faithfulness_constraint

export type tableau = number[][]

export type candidate = word | {
    word: word,
    correspondence: correspondence
}

export type ranking = constraint[][]

export function is_single_word(c: candidate): c is word {
    return Array.isArray(c)
}

export function is_markedness_constraint(fn: constraint): fn is markedness_constraint {
    return fn.length === 1
}

export function is_faithfulness_constraint(fn: constraint): fn is faithfulness_constraint {
    return fn.length === 3
}