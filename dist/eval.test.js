"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var eval_1 = require("./eval");
var constraints_1 = require("./constraints");
describe("EVAL", function () {
    it("decides the winner between two simple candidates", function () {
        var candidates = [{
                word: "hen",
                correspondence: [0, 1, 2]
            }, {
                word: "he",
                correspondence: [0, 1, null]
            }];
        var constraints = [constraints_1.MAX, constraints_1.NOCODA];
        var result = eval_1.EVAL("hen", candidates, constraints);
        chai_1.expect(result).to.not.be.undefined;
        if (result === undefined)
            return;
        chai_1.expect(result).to.haveOwnProperty("winner");
        var syl = result.winner[0];
        if (!Array.isArray(syl)) {
            chai_1.expect(syl.coda).to.have.lengthOf(1);
        }
    });
});
