"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var tipa_1 = require("tipa");
function do_constraint(original, cand, constraint, row) {
    var violations = 0;
    if (types_1.is_markedness_constraint(constraint)) {
        if (types_1.is_single_word(cand)) {
            violations = constraint(cand);
            row.push(violations);
        }
        else {
            violations = constraint(cand.word);
            row.push(violations);
        }
    }
    else {
        if (!types_1.is_single_word(cand)) {
            violations = constraint(original, cand.word, cand.correspondence);
            row.push(violations);
        }
    }
    return violations;
}
// Note that this is different from the builtin `eval` (lowercase)
function do_EVAL(input, candidates, constraints) {
    var tableau = [];
    // First make the tableaux
    for (var i = 0; i < candidates.length; i++) {
        tableau.push([]);
    }
    // Use an object/HashMap so we can perform
    // constant time deletions
    var winner = {};
    for (var i = 0; i < candidates.length; i++) {
        winner[i] = true;
    }
    // Now decide the winner
    constraints.forEach(function (constraint_group, g) {
        var min = undefined;
        var min_candidate = undefined;
        candidates.forEach(function (cand, row) {
            if (Array.isArray(constraint_group)) {
                constraint_group.forEach(function (constraint) {
                    var violations = do_constraint(input, cand, constraint, tableau[row]);
                    // Only count those candidates still in
                    // the race
                    if (winner[row] !== false) {
                        if (min === undefined) {
                            min = violations;
                            min_candidate = row;
                        }
                        else if (violations < min) {
                            if (min_candidate) {
                                winner[min_candidate] = false;
                            }
                            min = violations;
                            min_candidate = row;
                        }
                        else if (violations > min) {
                            winner[row] = false;
                        }
                    }
                });
            }
            else {
                var violations = do_constraint(input, cand, constraint_group, tableau[row]);
                if (winner[row] !== false) {
                    if (min === undefined) {
                        min = violations;
                        min_candidate = row;
                    }
                    else if (violations < min) {
                        if (min_candidate) {
                            winner[min_candidate] = false;
                        }
                        min = violations;
                        min_candidate = row;
                    }
                    else if (violations > min) {
                        winner[row] = false;
                    }
                }
            }
        });
    });
    var winners = Object
        .keys(winner)
        .filter(function (id) { return winner[Number(id)] === true; })
        .map(function (id) {
        var winner = candidates[Number(id)];
        return types_1.is_single_word(winner) ? winner : winner.word;
    });
    var result = {
        tableau: tableau,
        winner: winners.length === 1 ? winners[0] : winners
    };
    return result;
}
function EVAL(_input, _candidates, constraints) {
    var input = tipa_1.parse(_input);
    if (input === undefined) {
        return undefined;
    }
    var candidates = [];
    for (var i = 0; i < _candidates.length; i++) {
        var candidate = _candidates[i];
        if (typeof candidate === "object") {
            var word = tipa_1.parse(candidate.word);
            if (word === undefined) {
                return undefined;
            }
            candidates.push({
                word: word,
                correspondence: candidate.correspondence
            });
        }
        else {
            var word = tipa_1.parse(candidate);
            if (word === undefined) {
                return undefined;
            }
            candidates.push(word);
        }
    }
    return do_EVAL(input, candidates, constraints);
}
exports.EVAL = EVAL;
