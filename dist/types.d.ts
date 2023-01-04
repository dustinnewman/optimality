import { word } from "tipa";
export { word };
export declare type correspondence = (number | null)[];
export declare type markedness_constraint = (output: word) => number;
export declare type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number;
export declare type constraint = markedness_constraint | faithfulness_constraint;
export declare type tableau = number[][];
export declare type candidate = word | {
    word: word;
    correspondence: correspondence;
};
export declare type ranking = (constraint | constraint[])[];
export declare function is_single_word(c: candidate): c is word;
export declare function is_markedness_constraint(fn: constraint): fn is markedness_constraint;
export declare function is_faithfulness_constraint(fn: constraint): fn is faithfulness_constraint;
