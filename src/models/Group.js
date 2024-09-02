const { RED, RESET, BLUE } = require("../../config/constants");

class Group {
  constructor(name) {
    this.name = name;
    this.standings = [];
    this.teams = [];
    this.games = [];
  }

  addGame(game) {
    this.games.push(game);
  }

  getGames() {
    return this.games;
  }

  checkHeadToHead(teamA, teamB) {
    for (const game of this.games) {
      if (
        (game.getHomeTeam() === teamA && game.getAwayTeam() === teamB) ||
        (game.getHomeTeam() === teamB && game.getAwayTeam() === teamA)
      ) {
        return game;
      }
    }
  }

  sortByPositions() {
    this.standings.sort((a, b) => {
      return a.getPosition() - b.getPosition();
    });
  }

  getName() {
    return this.name;
  }

  getTeamList() {
    return this.standings;
  }

  getTeams() {
    return this.teams;
  }

  setName(name) {
    this.name = name;
  }

  setTeamList(teamList) {
    this.standings = teamList;
  }

  addTeam(team) {
    this.standings.push(team);
    this.teams.push(team);
  }

  sortGroup() {
    this.standings.sort((a, b) => {
      const pointsA = a.getPoints();
      const pointsB = b.getPoints();

      if (pointsA > pointsB) {
        return -1;
      } else if (pointsB > pointsA) {
        return 1;
      } else {
        return 0;
      }
    });

    this.standings.forEach((team, index) => {
      team.setPosition(index);
    });
  }

  toString() {
    let eliminated = false;
    this.sortByPositions();
    let repeatedChar = "-".repeat(80);
    let startingText = `\nGROUP ${this.name}\n${BLUE}${repeatedChar}${RESET}\nTeam               ${BLUE}|${RESET} ISO ${BLUE}|${RESET} Ranking   ${BLUE}|${RESET} Rank   ${BLUE}|${RESET} Scored ${BLUE}|${RESET} Pt Diff   ${BLUE}|${RESET} Pts\n${BLUE}${repeatedChar}${RESET}\n`;
    this.standings.forEach((team) => {
      if (
        (team.getGroupRank() == 0 || team.getGroupRank() == 9) &&
        !eliminated
      ) {
        startingText += `${RED}${repeatedChar}${RESET} \n`;
        eliminated = true;
      }
      startingText += `${team.toString()}\n`;
    });
    startingText += `${BLUE}${repeatedChar}${RESET}\n`;
    return startingText;
  }
}

module.exports = Group;
