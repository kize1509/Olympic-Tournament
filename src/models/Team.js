class Team {
  constructor(name, ISO, ranking) {
    this.gameHistory = [];
    this.name = name;
    this.ISO = ISO;
    this.ranking = ranking;
    this.form = 0;
    this.groupRank = 0;
  }

  getGroupRank() {
    return this.groupRank;
  }

  setGroupRank(groupRank) {
    this.groupRank = groupRank;
  }

  getForm() {
    return this.form;
  }

  setForm(form) {
    this.form = form;
  }

  getRanking() {
    return this.ranking;
  }

  getGameHistory() {
    return this.gameHistory;
  }

  getISO() {
    return this.ISO;
  }

  getName() {
    return this.name;
  }

  setRanking(ranking) {
    this.ranking = ranking;
  }

  setGameHistory(gameHistory) {
    this.gameHistory = gameHistory;
  }

  setISO(ISO) {
    this.ISO = ISO;
  }

  setName(name) {
    this.name = name;
  }

  addGame(game) {
    this.gameHistory.push(game);
  }
}

module.exports = Team;
