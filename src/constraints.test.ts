import "mocha"
import { expect } from "chai"
import { parse } from "tipa"
import { NOCODA, ONSET, MAX, NODORSAL } from "./constraints"

describe("NOCODA", () => {

    it("assigns zero violations to a syllable with no coda", () => {
        const word = parse(".ma.")
        if (word) {
            const violations = NOCODA(word)
            expect(violations).to.equal(0)
        }
    })

    it("assigns one violation to a syllable with a coda", () => {
        const word = parse(".mæt.")
        if (word) {
            const violations = NOCODA(word)
            expect(violations).to.equal(1)
        }
    })

    it("assigns one violation to a syllable with a coda", () => {
        const word = parse(".mæv̥.ə")
        if (word) {
            const violations = NOCODA(word)
            expect(violations).to.equal(1)
        }
    })

})

describe("ONSET", () => {

    it("assigns zero violations to a syllable with an onset", () => {
        const word = parse(".ma.")
        if (word) {
            const violations = ONSET(word)
            expect(violations).to.equal(0)
        }
    })

    it("assigns one violation to a syllable without an onset", () => {
        const word = parse(".æt.")
        if (word) {
            const violations = ONSET(word)
            expect(violations).to.equal(1)
        }
    })

})

describe("MAX", () => {

    it("assigns zero violations to faithful candidate", () => {
        const input = parse(".ma.")
        const output = parse(".ma.")
        const correspondence = [0, 1, 2, 3]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(0)
        }
    })

    it("assigns one violation for one deletion", () => {
        const input = parse(".ma.")
        const output = parse(".m.")
        const correspondence = [0, 1, null, 2]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(1)
        }
    })

    it("does not assign violations for epenthesis", () => {
        const input = parse(".ma.")
        const output = parse(".mat.")
        const correspondence = [0, 1, 2, 4]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(0)
        }
    })

    it("assigns violations for correspondences that make no sense", () => {
        const input = parse(".matə.")
        const output = parse(".ma.ə.")
        const correspondence = [0, 1, 2, 3, 4, 5]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(1)
        }
    })

    it("assigns violations for correspondences that make no sense", () => {
        const input = parse("matəf")
        const output = parse("ma.əf")
        const correspondence = [0, 1, 2, 3, 4]
        if (input && output) {
            const violations = MAX(input, output, correspondence)
            expect(violations).to.equal(1)
        }
    })

})

describe("NODORSAL", () => {
    it("assigns a violation for one dorsal consonsonant", () => {
        const word = parse("k")
        if (word) {
            const violations = NODORSAL(word)
            expect(violations).to.equal(1)
        }
    })

    it("assigns a violation for dorsals with one diacritic", () => {
        const word = parse("kʰ")
        if (word) {
            const violations = NODORSAL(word)
            expect(violations).to.equal(1)
        }
    })

    it("assigns a violation for dorsals with diacritics", () => {
        const word = parse("ɡ̥ʰ")
        if (word) {
            const violations = NODORSAL(word)
            expect(violations).to.equal(1)
        }
    })
})