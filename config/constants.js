const POINT_CONSTANT = 180;
const BASE_PROBABILITY = 50;

const GROUP_ROUNDS = {
  1: [
    [0, 1],
    [2, 3],
  ],
  2: [
    [0, 2],
    [1, 3],
  ],
  3: [
    [0, 3],
    [1, 2],
  ],
};

const TIE_COMBINATIONS = [
  [0, 1, 2],
  [1, 2, 3],
];

const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const UNDERLINE = "\x1b[4m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const SILVER = "\x1b[90m";
//write dates for the matches to be played

module.exports = {
  POINT_CONSTANT,
  BASE_PROBABILITY,
  GROUP_ROUNDS,
  TIE_COMBINATIONS,
  RED,
  RESET,
  BLUE,
  BOLD,
  UNDERLINE,
  YELLOW,
  GREEN,
  SILVER,
};
