class Game {
  constructor(homeTeam, awayTeam, homePoints, awayPoints, date) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homePoints = homePoints;
    this.awayPoints = awayPoints;
    this.date = date;
  }

  getHomeTeam() {
    return this.homeTeam;
  }

  getWinner() {
    if (this.homePoints > this.awayPoints) {
      return this.homeTeam;
    } else if (this.homePoints < this.awayPoints) {
      return this.awayTeam;
    }
  }

  getLoser() {
    if (this.homePoints > this.awayPoints) {
      return this.awayTeam;
    } else if (this.homePoints < this.awayPoints) {
      return this.homeTeam;
    }
  }

  getAwayTeam() {
    return this.awayTeam;
  }

  getHomeGoals() {
    return this.homePoints;
  }

  getAwayGoals() {
    return this.awayPoints;
  }

  getDate() {
    return this.date;
  }

  setHomeTeam(homeTeam) {
    this.homeTeam = homeTeam;
  }

  setAwayTeam(awayTeam) {
    this.awayTeam = awayTeam;
  }

  setHomeGoals(homeGoals) {
    this.homePoints = homeGoals;
  }

  setAwayGoals(awayGoals) {
    this.awayPoints = awayGoals;
  }

  setDate(date) {
    this.date = date;
  }

  isWinner() {
    if (this.homePoints > this.awayPoints) {
      return true;
    } else if (this.homePoints < this.awayPoints) {
      return false;
    } else {
      //case not possible
      return null;
    }
  }

  getPointDifference() {
    return this.homePoints - this.awayPoints;
  }

  toString() {
    return `${this.homeTeam.getName()} ${this.homePoints} - ${
      this.awayPoints
    } ${this.awayTeam.getName()}`;
  }
}

module.exports = Game;
