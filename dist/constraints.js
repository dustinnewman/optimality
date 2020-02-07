"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tipa_1 = require("tipa");
function NOCODA(output) {
    var violations = 0;
    var num_syllables = output.length;
    for (var i = 0; i < num_syllables; i++) {
        var coda = output[i].coda;
        if (coda) {
            if (coda.length) {
                violations += 1;
            }
        }
    }
    return violations;
}
exports.NOCODA = NOCODA;
function ONSET(output) {
    var violations = 0;
    var num_syllables = output.length;
    for (var i = 0; i < num_syllables; i++) {
        var onset = output[i].onset;
        if (onset) {
            if (onset.length === 0) {
                violations += 1;
            }
        }
        else {
            violations += 1;
        }
    }
    return violations;
}
exports.ONSET = ONSET;
function PLACE_CONSTRAINT(_output, place_fn) {
    var violations = 0;
    var output = tipa_1.desyllabify(_output, {
        leading_syllab: true,
        trailing_syllab: true
    });
    if (!output) {
        return 0;
    }
    var num_syllables = output.length;
    for (var i = 0; i < num_syllables; i++) {
        var curr = output[i];
        if (tipa_1.is_phone(curr) && tipa_1.is_consonant(curr)) {
            if (Array.isArray(curr)) {
                if (place_fn(curr[0].place)) {
                    violations += 1;
                }
            }
            else {
                if (place_fn(curr.place)) {
                    violations += 1;
                }
            }
        }
    }
    return violations;
}
function NODORSAL(output) {
    return PLACE_CONSTRAINT(output, tipa_1.is_dorsal);
}
exports.NODORSAL = NODORSAL;
function NOCORONAL(output) {
    return PLACE_CONSTRAINT(output, tipa_1.is_coronal);
}
exports.NOCORONAL = NOCORONAL;
function NOGLOTTAL(output) {
    return PLACE_CONSTRAINT(output, tipa_1.is_laryngeal);
}
exports.NOGLOTTAL = NOGLOTTAL;
function MAX(_input, _output, correspondence) {
    var violations = 0;
    var input = tipa_1.desyllabify(_input, {
        leading_syllab: true,
        trailing_syllab: true
    });
    var output = tipa_1.desyllabify(_output, {
        leading_syllab: true,
        trailing_syllab: true
    });
    if (!(input && output)) {
        // Could not desyllabify input words
        return 0;
    }
    var len = correspondence.length;
    for (var i = 0; i < len; i++) {
        var corr = correspondence[i];
        // If correspondent is not null then there
        // is almost certainly a correspondent in the output
        // However we need to make sure there are no illegal
        // correspondences like consonant -> diacritic/supra
        if (corr !== null) {
            var inp = input[i];
            var outp = output[corr];
            if (!Array.isArray(inp) && !Array.isArray(outp)) {
                if (tipa_1.is_diacritic(inp) !== tipa_1.is_diacritic(outp)) {
                    violations += 1;
                    continue;
                }
                else if (tipa_1.is_supra(inp) !== tipa_1.is_supra(outp)) {
                    violations += 1;
                    continue;
                }
            }
        }
        else {
            // If correspondent is null then there
            // is no correspondent in the output
            violations += 1;
            continue;
        }
    }
    return violations;
}
exports.MAX = MAX;
