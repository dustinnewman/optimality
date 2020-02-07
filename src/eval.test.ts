import "mocha"
import { expect } from "chai"
import { EVAL } from "./eval"
import { ranking } from "./types"
import { MAX, NOCODA } from "./constraints"

describe("EVAL", () => {

    it("decides the winner between two simple candidates", () => {
        const candidates = [{
            word: "hen",
            correspondence: [0, 1, 2]
        }, {
            word: "he",
            correspondence: [0, 1, null]
        }]
        const constraints: ranking = [MAX, NOCODA]
        const result = EVAL("hen", candidates, constraints)
        expect(result).to.not.be.undefined
        if (result === undefined) return
        expect(result).to.haveOwnProperty("winner")
        const syl = result.winner[0]
        if (!Array.isArray(syl)) {
            expect(syl.coda).to.have.lengthOf(1)
        }
    })

})