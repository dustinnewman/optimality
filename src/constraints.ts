import {
    word,
    desyllabify,
    is_diacritic,
    is_phone,
    is_consonant,
    is_vowel,
    is_supra,
    is_dorsal,
    is_coronal,
    is_laryngeal
} from "tipa"
import { correspondence } from "./types"

export function NOCODA(output: word): number {
    let violations = 0

    const num_syllables = output.length
    for (let i = 0; i < num_syllables; i++) {
        const coda = output[i].coda
        if (coda) {
            if (coda.length) {
                violations += 1
            }
        }
    }

    return violations
}

export function ONSET(output: word): number {
    let violations = 0

    const num_syllables = output.length
    for (let i = 0; i < num_syllables; i++) {
        const onset = output[i].onset
        if (onset) {
            if (onset.length === 0) {
                violations += 1
            }
        } else {
            violations += 1
        }
    }

    return violations
}

function PLACE_CONSTRAINT(_output: word, place_fn: (place: string) => boolean): number {
    let violations = 0

    const output = desyllabify(_output, {
        leading_syllab: true,
        trailing_syllab: true
    })

    if (!output) {
        return 0
    }

    const num_syllables = output.length
    for (let i = 0; i < num_syllables; i++) {
        const curr = output[i]
        if (is_phone(curr) && is_consonant(curr)) {
            if (Array.isArray(curr)) {
                if (place_fn(curr[0].place)) {
                    violations += 1
                }
            } else {
                if (place_fn(curr.place)) {
                    violations += 1
                }
            }
        }
    }

    return violations
}

export function NODORSAL(output: word): number {
    return PLACE_CONSTRAINT(output, is_dorsal)
}

export function NOCORONAL(output: word): number {
    return PLACE_CONSTRAINT(output, is_coronal)
}

export function NOGLOTTAL(output: word): number {
    return PLACE_CONSTRAINT(output, is_laryngeal)
}

export function MAX(_input: word, _output: word, correspondence: correspondence): number {
    let violations = 0

    const input = desyllabify(_input, {
        leading_syllab: true,
        trailing_syllab: true
    })
    const output = desyllabify(_output, {
        leading_syllab: true,
        trailing_syllab: true
    })
    if (!(input && output)) {
        // Could not desyllabify input words
        return 0
    }

    const len = correspondence.length
    for (let i = 0; i < len; i++) {
        const corr = correspondence[i]
        // If correspondent is not null then there
        // is almost certainly a correspondent in the output
        // However we need to make sure there are no illegal
        // correspondences like consonant -> diacritic/supra
        if (corr !== null) {
            const inp = input[i]
            const outp = output[corr]

            if (!Array.isArray(inp) && !Array.isArray(outp)) {
                if (is_diacritic(inp) !== is_diacritic(outp)) {
                    violations += 1
                    continue
                } else if (is_supra(inp) !== is_supra(outp)) {
                    violations += 1
                    continue
                }
            }
        } else {
            // If correspondent is null then there
            // is no correspondent in the output
            violations += 1
            continue
        }
    }

    return violations
}