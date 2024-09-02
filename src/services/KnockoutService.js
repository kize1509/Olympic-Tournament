const { winProbability } = require("../utils/probabilityCalculator");
const { TextUtils } = require("../utils/TextUtils");
const txtUtil = new TextUtils();

async function simulateKnockout(pairs, hats) {
  const pairsDG = pairs[0];
  const pairsEF = pairs[1];
  //geting results for the quarter finals
  const [firstDG, secondDG, firstEF, secondEF] = await Promise.all([
    winProbability(pairsDG[0][0], pairsDG[0][1]),
    winProbability(pairsDG[1][0], pairsDG[1][1]),
    winProbability(pairsEF[0][0], pairsEF[0][1]),
    winProbability(pairsEF[1][0], pairsEF[1][1]),
  ]);

  txtUtil.printQuarters(firstDG, secondDG, firstEF, secondEF);

  const winnerFirstDG = firstDG.getWinner();
  const winnerSecondDG = secondDG.getWinner();
  const winnerFirstEF = firstEF.getWinner();
  const winnerSecondEF = secondEF.getWinner();

  const semiFinals = getSemiFinals(
    winnerFirstDG,
    winnerSecondDG,
    winnerFirstEF,
    winnerSecondEF
  );
  //geting results for the semi finals
  const [firstSemiFinal, secondSemiFinal] = await Promise.all([
    winProbability(semiFinals[0][0], semiFinals[0][1]),
    winProbability(semiFinals[1][0], semiFinals[1][1]),
  ]);

  txtUtil.printSemiFinals(firstSemiFinal, secondSemiFinal);
  const winnerFirstSemiFinal = firstSemiFinal.getWinner();
  const winnerSecondSemiFinal = secondSemiFinal.getWinner();
  const loserFirstSemiFinal = firstSemiFinal.getLoser();
  const loserSecondSemiFinal = secondSemiFinal.getLoser();

  //geting results for the third place and finals
  const [thirdPlace, final] = await Promise.all([
    winProbability(loserFirstSemiFinal, loserSecondSemiFinal),
    winProbability(winnerFirstSemiFinal, winnerSecondSemiFinal),
  ]);

  txtUtil.printThidPlace(thirdPlace);
  txtUtil.printFinals(final);

  const winnerFinal = final.getWinner();
  const loserFinal = final.getLoser();
  const thirdPlaceWinner = thirdPlace.getWinner();

  txtUtil.printMedals(winnerFinal, loserFinal, thirdPlaceWinner);
}

function getSemiFinals(firstDG, secondDG, firstEF, secondEF) {
  const winnersDG = [firstDG, secondDG];
  const winnersEF = [firstEF, secondEF];

  //randomize the pairing of DG and EF
  const semiFinals = [[], []];
  const randomIndex = Math.floor(Math.random() * 2);
  semiFinals[0].push(winnersDG[randomIndex]);
  semiFinals[0].push(winnersEF[randomIndex]);
  semiFinals[1].push(winnersDG[1 - randomIndex]);
  semiFinals[1].push(winnersEF[1 - randomIndex]);

  return semiFinals;
}

module.exports = { simulateKnockout };
