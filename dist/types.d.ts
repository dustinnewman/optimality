import { word } from "tipa";
export declare type correspondence = (number | null)[];
export declare type markedness_constraint = (output: word) => number;
export declare type faithfulness_constraint = (input: word, output: word, corr: correspondence) => number;
