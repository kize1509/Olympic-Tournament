const {
  POINT_CONSTANT,
  BASE_PROBABILITY,
  RANDOM_FACTOR,
} = require("../../config/constants");

const Game = require("../models/Game");

function generateRandomFactor() {
  return 0.95 + Math.random() * 0.1;
}

async function winProbability(teamA, teamB) {
  // considering the base probability of 50% for each team and using the difference in ranking for completing the base probability
  // using the form stat as an additional factor to calculate the final probability
  // after the calcualtion normalizing the score to 0-1 range and multiplying by a constant to get the final points scored by the team

  const rankingDiff = teamA.ranking - teamB.ranking;
  let probability = BASE_PROBABILITY + rankingDiff / 100;

  try {
    const [formA, formB] = await Promise.all([
      formCalculator(teamA),
      formCalculator(teamB),
    ]);

    teamA.setForm(formA);
    teamB.setForm(formB);
    probability += formA - formB;
    let finalProbability = probability / 100;
    finalProbability = finalProbability < 0 ? 0 : finalProbability;
    finalProbability = finalProbability > 1 ? 1 : finalProbability;
    opponentProbability = 1 - finalProbability;

    pointsA = Math.ceil(
      finalProbability * POINT_CONSTANT * generateRandomFactor()
    );
    pointsB = Math.ceil(
      opponentProbability * POINT_CONSTANT * generateRandomFactor()
    );

    if (pointsA === pointsB) {
      pointsA += 1;
    }

    teamA.incrementScoredPoints(pointsA);
    teamA.managePointDifference(pointsA, pointsB);
    teamB.incrementScoredPoints(pointsB);
    teamB.managePointDifference(pointsB, pointsA);

    let date = new Date();
    let gameHome = new Game(teamA, teamB, pointsA, pointsB, date);
    let gameAway = new Game(teamB, teamA, pointsB, pointsA, date);

    if (gameHome.isWinner()) {
      teamA.incrementPoints(2);
      teamB.incrementPoints(1);
    } else if (gameAway.isWinner()) {
      teamB.incrementPoints(2);
      teamA.incrementPoints(1);
    }

    teamA.addGame(gameHome);
    teamB.addGame(gameAway);

    return Promise.resolve(gameHome);
  } catch (e) {
    console.log(e);
  }
}

async function formCalculator(team) {
  let formSum = 0;
  let gameWeight = 1;

  for (const game of team.getGameHistory()) {
    let opponent = game.getAwayTeam();
    let res = game.getPointDifference() * gameWeight;
    if (opponent) {
      res *= 20 / opponent.getRanking();
      formSum += res;
    }
    gameWeight -= 0.08;
  }

  return Promise.resolve(formSum * 0.02);
}

module.exports = {
  winProbability,
};
