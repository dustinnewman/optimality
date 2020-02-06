import { word } from "tipa";
import { correspondence } from "./types";
export declare function NOCODA(output: word): number;
export declare function ONSET(output: word): number;
export declare function NODORSAL(output: word): number;
export declare function NOCORONAL(output: word): number;
export declare function NOGLOTTAL(output: word): number;
export declare function MAX(_input: word, _output: word, correspondence: correspondence): number;
