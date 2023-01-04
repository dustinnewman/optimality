"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var tipa_1 = require("tipa");
var constraints_1 = require("./constraints");
describe("NOCODA", function () {
    it("assigns zero violations to a syllable with no coda", function () {
        var word = tipa_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("assigns one violation to a syllable with a coda", function () {
        var word = tipa_1.parse(".mæt.");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("assigns one violation to a syllable with a coda", function () {
        var word = tipa_1.parse(".mæv̥.ə");
        if (word) {
            var violations = constraints_1.NOCODA(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
describe("ONSET", function () {
    it("assigns zero violations to a syllable with an onset", function () {
        var word = tipa_1.parse(".ma.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("assigns one violation to a syllable without an onset", function () {
        var word = tipa_1.parse(".æt.");
        if (word) {
            var violations = constraints_1.ONSET(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
describe("MAX", function () {
    it("assigns zero violations to faithful candidate", function () {
        var input = tipa_1.parse(".ma.");
        var output = tipa_1.parse(".ma.");
        var correspondence = [0, 1, 2, 3];
        if (input && output) {
            var violations = constraints_1.MAX(input, output, correspondence);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("assigns one violation for one deletion", function () {
        var input = tipa_1.parse(".ma.");
        var output = tipa_1.parse(".m.");
        var correspondence = [0, 1, null, 2];
        if (input && output) {
            var violations = constraints_1.MAX(input, output, correspondence);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("does not assign violations for epenthesis", function () {
        var input = tipa_1.parse(".ma.");
        var output = tipa_1.parse(".mat.");
        var correspondence = [0, 1, 2, 4];
        if (input && output) {
            var violations = constraints_1.MAX(input, output, correspondence);
            chai_1.expect(violations).to.equal(0);
        }
    });
    it("assigns violations for correspondences that make no sense", function () {
        var input = tipa_1.parse(".matə.");
        var output = tipa_1.parse(".ma.ə.");
        var correspondence = [0, 1, 2, 3, 4, 5];
        if (input && output) {
            var violations = constraints_1.MAX(input, output, correspondence);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("assigns violations for correspondences that make no sense", function () {
        var input = tipa_1.parse("matəf");
        var output = tipa_1.parse("ma.əf");
        var correspondence = [0, 1, 2, 3, 4];
        if (input && output) {
            var violations = constraints_1.MAX(input, output, correspondence);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
describe("NODORSAL", function () {
    it("assigns a violation for one dorsal consonsonant", function () {
        var word = tipa_1.parse("k");
        if (word) {
            var violations = constraints_1.NODORSAL(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("assigns a violation for dorsals with one diacritic", function () {
        var word = tipa_1.parse("kʰ");
        if (word) {
            var violations = constraints_1.NODORSAL(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
    it("assigns a violation for dorsals with diacritics", function () {
        var word = tipa_1.parse("ɡ̥ʰ");
        if (word) {
            var violations = constraints_1.NODORSAL(word);
            chai_1.expect(violations).to.equal(1);
        }
    });
});
