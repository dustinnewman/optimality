# Optimality
[![version](https://img.shields.io/npm/v/optimality.svg)](https://www.npmjs.org/package/optimality)

*Optimality* is a TypeScript package which implements common constraints from Optimality Theory and provides a clear, typed interface for reasoning about them.

## Installation

For Yarn:

```bash
$ yarn add optimality
```

For NPM:

```bash
$ npm install optimality
```

## Constraints

- `NOCODA`
- `ONSET`
- `MAX`
- `NODORSAL`
- `NOCORONAL`
- `NOGLOTTAL`

## Types

| Type                        | Meaning
| ------                      | -------
| `word`                      | (From *tipa*) A group of syllables and the end result of parsing.
| `markedness_constraint`     | Any function which takes a candidate word and returns the number of violations.
| `faithfulness_constraint`   | Any function which takes an input word, a candidate word, and a correspondence between the two and returns the number of violations.
| `correspondence`            | A mapping between two words. An array of `number` or `null` values where the *index* marks the index into the input word and the *value* marks the corresponding index into the output word, if it exists.