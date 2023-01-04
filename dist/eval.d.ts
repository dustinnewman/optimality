import { word, tableau, ranking, correspondence } from "./types";
interface EVAL_results {
    tableau: tableau;
    winner: word | word[];
}
declare type eval_candidate = string | {
    word: string;
    correspondence: correspondence;
};
export declare function EVAL(_input: string, _candidates: eval_candidate[], constraints: ranking): EVAL_results | undefined;
export {};
