const groupLoader = require("../utils/dataLoader");
const Group = require("../models/Group");
const TeamGroup = require("../models/TeamGroup");
const Game = require("../models/Game");
const { GROUP_ROUNDS, TIE_COMBINATIONS } = require("../../config/constants");
const { TextUtils } = require("../utils/TextUtils");
const { winProbability } = require("../utils/probabilityCalculator");
const txtUtil = new TextUtils();

async function generateGroups() {
  try {
    const groups = await groupLoader.loadGoups();

    let gorupNames = Object.keys(groups);

    let allGroups = [];
    let allTeams = {};
    gorupNames.forEach((groupName) => {
      let group = new Group(groupName);
      let teams = groups[groupName];

      teams.forEach((team) => {
        let teamGroup = new TeamGroup(
          team.Team,
          team.ISOCode,
          team.FIBARanking,
          groupName
        );
        allTeams[team.ISOCode] = teamGroup;
        group.addTeam(teamGroup);
      });
      allGroups.push(group);
    });

    await loadPastGames(allTeams);

    return { teams: allTeams, groups: allGroups };
  } catch (error) {
    console.error(error);
  }
}

async function loadPastGames(allTeams) {
  const exibitionGames = await groupLoader.loadExibitionGames();

  Object.keys(exibitionGames).forEach((isoCode) => {
    let teamA = allTeams[isoCode];
    let games = exibitionGames[isoCode];
    games.forEach((game) => {
      let teamB = allTeams[game.Opponent];
      let score = game.Result.split("-");
      let newGame = new Game(teamA, teamB, score[0], score[1], game.Date);
      teamA.addGame(newGame);
    });
  });
}

async function simulateGroupStage() {
  try {
    let { teams, groups } = await generateGroups();

    for (i = 0; i < 3; i++) {
      let k = i + 1;
      let m = i + 2;
      txtUtil.printGroupHeading(k);
      for (let group of groups) {
        let currentRonud = GROUP_ROUNDS[i + 1];

        let teamList = group.getTeams();

        //return these values to the group and display the text after every round
        [game1, game2] = await Promise.all([
          winProbability(
            teamList[currentRonud[0][0]],
            teamList[currentRonud[0][1]]
          ),
          winProbability(
            teamList[currentRonud[1][0]],
            teamList[currentRonud[1][1]]
          ),
        ]);

        group.addGame(game1);
        group.addGame(game2);
        txtUtil.printGroupGameResults(group, k, m, game1, game2);
      }
    }
    for (let group of groups) {
      checkForTies(group);
    }
    return groups;
  } catch (error) {
    console.error(error);
  }
}

async function checkForTies(group) {
  group.sortGroup();
  let teamList = group.getTeamList();
  let tiedTeams = [];
  let threeWayTies = false;

  for (let tie of TIE_COMBINATIONS) {
    let teamA = teamList[tie[0]];
    let teamB = teamList[tie[1]];
    let teamC = teamList[tie[2]];
    if ((teamA.getPoints() === teamB.getPoints()) === teamC.getPoints()) {
      tiedTeams.push(teamA, teamB, teamC);
      threeWayTies = true;
    } else if (teamA.getPoints() === teamB.getPoints()) {
      tiedTeams.push(teamA, teamB);
    } else if (teamB.getPoints() === teamC.getPoints()) {
      tiedTeams.push(teamA, teamC);
    }
  }

  if (threeWayTies) {
    threeWayTie(group, tiedTeams);
  } else if (tiedTeams.length > 0) {
    twoWayTie(group, tiedTeams);
  }
}

function threeWayTie(group, tiedTeams) {
  let game1 = group.checkHeadToHead(tiedTeams[0], tiedTeams[1]);
  let game2 = group.checkHeadToHead(tiedTeams[0], tiedTeams[2]);
  let game3 = group.checkHeadToHead(tiedTeams[1], tiedTeams[2]);

  let tieBreakingTable = [
    { team: tiedTeams[0], ptDif: 0 },
    { team: tiedTeams[1], ptDif: 0 },
    { team: tiedTeams[2], ptDif: 0 },
  ];

  //game1
  let gameDifference = game1.getPointDifference();
  if (game1.getHomeTeam() === tiedTeams[0]) {
    tieBreakingTable[0].ptDif += gameDifference;
    tieBreakingTable[1].ptDif -= gameDifference;
  } else {
    tieBreakingTable[1].ptDif += gameDifference;
    tieBreakingTable[0].ptDif -= gameDifference;
  }
  //game2

  let gameDifference2 = game2.getPointDifference();
  if (game2.getHomeTeam() === tiedTeams[0]) {
    tieBreakingTable[0].ptDif += gameDifference2;
    tieBreakingTable[2].ptDif -= gameDifference2;
  } else {
    tieBreakingTable[2].ptDif += gameDifference2;
    tieBreakingTable[0].ptDif -= gameDifference2;
  }
  let gameDifference3 = game3.getPointDifference();
  if (game3.getHomeTeam() === tiedTeams[1]) {
    tieBreakingTable[1].ptDif += gameDifference3;
    tieBreakingTable[2].ptDif -= gameDifference3;
  } else {
    tieBreakingTable[2].ptDif += gameDifference3;
    tieBreakingTable[1].ptDif -= gameDifference3;
  }

  tieBreakingTable.sort((a, b) => {
    return a.ptDif - b.ptDif;
  });

  let pos1 = tiedTeams[0].getPosition();
  let pos2 = tiedTeams[1].getPosition();
  let pos3 = tiedTeams[2].getPosition();

  if (pos1 > pos2) {
    tiedTeams[0].setPosition(pos2);
    tiedTeams[1].setPosition(pos1);
  }

  if (pos1 > pos3) {
    tiedTeams[0].setPosition(pos3);
    tiedTeams[2].setPosition(pos1);
  }

  if (pos2 > pos3) {
    tiedTeams[1].setPosition(pos3);
    tiedTeams[2].setPosition(pos2);
  }
}

function twoWayTie(group, tiedTeams) {
  let game = group.checkHeadToHead(tiedTeams[0], tiedTeams[1]);
  if (
    (game.getHomeTeam() === tiedTeams[0] &&
      game.isWinner() &&
      tiedTeams[0].getPosition() > tiedTeams[1].getPosition()) ||
    (game.getAwayTeam() === tiedTeams[0] &&
      game.isWinner() &&
      tiedTeams[0].getPosition() < tiedTeams[1].getPosition())
  ) {
    pos1 = tiedTeams[0].getPosition();
    pos2 = tiedTeams[1].getPosition();
    tiedTeams[0].setPosition(pos2);
    tiedTeams[1].setPosition(pos1);
  }
}

module.exports = { simulateGroupStage };
