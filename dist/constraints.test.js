"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tipa_1 = require("tipa");
var constraints_1 = require("./constraints");
describe("NOCODA", function () {
    it("should assign zero violations to a syllable with no coda", function () {
        var word = tipa_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("should assign one violation to a syllable with a coda", function () {
        var word = tipa_1.parse(".mæt.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("should assign one violation to a syllable with a coda", function () {
        var word = tipa_1.parse(".mæv̥.ə");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
describe("ONSET", function () {
    it("should assign zero violations to a syllable with an onset", function () {
        var word = tipa_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("should assign one violation to a syllable without an onset", function () {
        var word = tipa_1.parse(".æt.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
// describe("MAX", () => {
//     it("should assign zero violations to faithful candidate", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".ma.")
//         const correspondence = [0, 1, 2, 3]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(0)
//         }
//     })
//     it("should assign one violation", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".m.")
//         const correspondence = [0, 1, null, 2]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(1)
//         }
//     })
//     it("should not assign violations for epenthesis", () => {
//         const input = tokenize(".ma.")
//         const output = tokenize(".mat.")
//         const correspondence = [0, 1, 2, 4]
//         if (input && output) {
//             const violations = MAX(input, output, correspondence)
//             expect(violations).to.equal(0)
//         }
//     })
// })
