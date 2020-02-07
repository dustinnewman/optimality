import {
    constraint,
    word,
    tableau,
    is_markedness_constraint,
    candidate,
    is_single_word,
    ranking,
    correspondence
} from "./types"
import { parse } from "tipa"

interface EVAL_results {
    tableau: tableau,
    winner: word | word[]
}

function do_constraint(original: word, cand: candidate, constraint: constraint, row: number[]): number {
    let violations = 0
    if (is_markedness_constraint(constraint)) {
        if (is_single_word(cand)) {
            violations = constraint(cand)
            row.push(violations)
        } else {
            violations = constraint(cand.word)
            row.push(violations)
        }
    } else {
        if (!is_single_word(cand)) {
            violations = constraint(original, cand.word, cand.correspondence)
            row.push(violations)
        }
    }
    return violations
}

// Note that this is different from the builtin `eval` (lowercase)
function do_EVAL(input: word, candidates: candidate[], constraints: ranking): EVAL_results {
    let tableau: number[][] = []
    // First make the tableaux
    for (let i = 0; i < candidates.length; i++) {
        tableau.push([])
    }
    // Use an object/HashMap so we can perform
    // constant time deletions
    let winner: { [key: number]: boolean } = {}
    for (let i = 0; i < candidates.length; i++) {
        winner[i] = true
    }
    // Now decide the winner
    constraints.forEach((constraint_group, g) => {
        let min: number | undefined = undefined
        let min_candidate: number | undefined = undefined
        candidates.forEach((cand, row) => {
            if (Array.isArray(constraint_group)) {
                constraint_group.forEach(constraint => {
                    const violations =
                        do_constraint(input, cand, constraint, tableau[row])
                    // Only count those candidates still in
                    // the race
                    if (winner[row] !== false) {
                        if (min === undefined) {
                            min = violations
                            min_candidate = row
                        } else if (violations < min) {
                            if (min_candidate) {
                                winner[min_candidate] = false
                            }
                            min = violations
                            min_candidate = row
                        } else if (violations > min) {
                            winner[row] = false
                        }
                    }
                })
            } else {
                const violations =
                    do_constraint(input, cand, constraint_group, tableau[row])
                if (winner[row] !== false) {
                    if (min === undefined) {
                        min = violations
                        min_candidate = row
                    } else if (violations < min) {
                        if (min_candidate) {
                            winner[min_candidate] = false
                        }
                        min = violations
                        min_candidate = row
                    } else if (violations > min) {
                        winner[row] = false
                    }
                }
            }
        })
    })

    let winners = Object
        .keys(winner)
        .filter(id => winner[Number(id)] === true)
        .map(id => {
            const winner = candidates[Number(id)]
            return is_single_word(winner) ? winner : winner.word
        })

    let result: EVAL_results = {
        tableau: tableau,
        winner: winners.length === 1 ? winners[0] : winners
    }
    return result
}

type eval_candidate = string | {
    word: string;
    correspondence: correspondence
}

export function EVAL(
    _input: string,
    _candidates: eval_candidate[],
    constraints: ranking): EVAL_results | undefined {
    const input = parse(_input)

    if (input === undefined) {
        return undefined
    }

    let candidates: candidate[] = []
    for (let i = 0; i < _candidates.length; i++) {
        const candidate = _candidates[i]
        if (typeof candidate === "object") {
            const word = parse(candidate.word)
            if (word === undefined) {
                return undefined
            }
            candidates.push({
                word: word,
                correspondence: candidate.correspondence
            })
        } else {
            const word = parse(candidate)
            if (word === undefined) {
                return undefined
            }
            candidates.push(word)
        }
    }

    return do_EVAL(input, candidates, constraints)
}