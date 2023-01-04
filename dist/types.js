"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function is_single_word(c) {
    return Array.isArray(c);
}
exports.is_single_word = is_single_word;
function is_markedness_constraint(fn) {
    return fn.length === 1;
}
exports.is_markedness_constraint = is_markedness_constraint;
function is_faithfulness_constraint(fn) {
    return fn.length === 3;
}
exports.is_faithfulness_constraint = is_faithfulness_constraint;
