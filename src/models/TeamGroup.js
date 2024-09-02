const { TextUtils } = require("../utils/TextUtils");
const { BLUE, RESET } = require("../../config/constants");
const Team = require("./Team");
const txtUtil = new TextUtils();

class TeamGroup extends Team {
  constructor(name, ISO, ranking, groupSign) {
    super(name, ISO, ranking);
    this.groupRank = 0;
    this.points = 0;
    this.pointDifference = 0;
    this.pointsScored = 0;
    this.position = 0;
    this.groupSign = groupSign;
  }

  getGroupSign() {
    return this.groupSign;
  }

  setGroupSign(groupSign) {
    this.groupSign = groupSign;
  }

  getPosition() {
    return this.position;
  }

  setPosition(position) {
    this.position = position;
  }

  getGroupRank() {
    return this.groupRank;
  }

  setGroupRank(groupRank) {
    this.groupRank = groupRank;
  }

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
  }

  incrementPoints(points) {
    this.points += points;
  }

  incrementScoredPoints(points) {
    this.pointsScored += points;
  }

  getPointDifference() {
    return this.pointDifference;
  }

  managePointDifference(pointsA, pointsB) {
    this.pointDifference += pointsA - pointsB;
  }

  setPointDifference(pointDifference) {
    this.pointDifference = pointDifference;
  }

  getPointsScored() {
    return this.pointsScored;
  }

  setPointsScored(pointsScored) {
    this.pointsScored = pointsScored;
  }

  toString() {
    let diff = 17 - this.name.length ? 17 - this.name.length : 0;
    let spaces = " ".repeat(diff);
    let diff2 = this.ranking > 9 ? 2 : 3;
    let spaces2 = " ".repeat(diff2);

    let spaces3 = " ".repeat(txtUtil.delimeterCalculator(this.pointDifference));
    let diff4 = this.pointsScored > 99 ? 2 : 3;
    let spaces4 = " ".repeat(diff4);

    return `${this.name} ${spaces} ${BLUE}|${RESET} ${this.ISO} ${BLUE}|${RESET}     ${this.ranking} ${spaces2} ${BLUE}|${RESET}    ${this.groupRank}   ${BLUE}|${RESET} ${this.pointsScored} ${spaces4} ${BLUE}|${RESET}      ${this.pointDifference}${spaces3}${BLUE}|${RESET}   ${this.points}`;
  }
}

module.exports = TeamGroup;
