async function prepRanking(groups) {
  let FirstTeams = [];
  let SecondTeams = [];
  let ThirdTeams = [];

  FirstTeams.push(
    groups[0].getTeamList()[0],
    groups[1].getTeamList()[0],
    groups[2].getTeamList()[0]
  );

  SecondTeams.push(
    groups[0].getTeamList()[1],
    groups[1].getTeamList()[1],
    groups[2].getTeamList()[1]
  );

  ThirdTeams.push(
    groups[0].getTeamList()[2],
    groups[1].getTeamList()[2],
    groups[2].getTeamList()[2]
  );

  //ranking the teams based on the given criteria

  await Promise.all([
    rangTeams(FirstTeams, [1, 2, 3]),
    rangTeams(SecondTeams, [4, 5, 6]),
    rangTeams(ThirdTeams, [7, 8, 9]),
  ]);

  let ranking = FirstTeams.concat(SecondTeams, ThirdTeams);
  ranking.pop();

  return ranking;
}

function rangTeams(teams, rankings) {
  teams.sort((a, b) => {
    if (a.getPoints() > b.getPoints()) {
      return -1;
    } else if (b.getPoints() > a.getPoints()) {
      return 1;
    } else {
      if (a.getPointDifference() > b.getPointDifference()) {
        return -1;
      } else if (b.getPointDifference() > a.getPointDifference()) {
        return 1;
      } else {
        if (a.getPointsScored() > b.getPointsScored()) {
          return -1;
        } else if (b.getPointsScored() > a.getPointsScored()) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });
  teams.forEach((team, index) => {
    team.setGroupRank(rankings[index]);
  });

  return Promise.resolve();
}

async function prepareKnockout(groups) {
  try {
    let teams = await prepRanking(groups);
    //sorting ranked teams 1-9 into 4 hats D - G
    let [hatD, hatE, hatF, hatG] = await sortByHats(teams);

    const [pairs1, pairs2] = await formBrackets(hatD, hatE, hatF, hatG, groups);
    return [
      [pairs1, pairs2],
      [hatD, hatE, hatF, hatG],
    ];
  } catch (e) {
    console.log(e);
  }
}

async function sortByHats(teams) {
  let hatD = [];
  let hatE = [];
  let hatF = [];
  let hatG = [];

  teams.forEach((team) => {
    let rank = team.getGroupRank();
    if (rank === 1 || rank === 2) {
      hatD.push(team);
    } else if (rank === 3 || rank === 4) {
      hatE.push(team);
    } else if (rank === 5 || rank === 6) {
      hatF.push(team);
    } else if (rank === 7 || rank === 8) {
      hatG.push(team);
    }
  });

  return [hatD, hatE, hatF, hatG];
}

async function formBrackets(hatD, hatE, hatF, hatG, groups) {
  try {
    //forming the pairs for the elimination phase, by randomly picking a combination, and pairing hat D with hat G and hat E with hat F
    const [pairs1, pairs2] = await Promise.all([
      formRandomPairs(hatD, hatG, groups),
      formRandomPairs(hatE, hatF, groups),
    ]);

    return [pairs1, pairs2];
  } catch (e) {
    console.log(e);
  }
}

function formRandomPairs(hat1, hat2, groups) {
  //randomly pick a combination
  let isNotValid = true;

  while (isNotValid) {
    let [team1, team2] = getRandomTeams(hat1, hat2);
    let team3;
    let team4;
    if (team1 === hat1[0]) {
      team3 = hat1[1];
    } else {
      team3 = hat1[0];
    }

    if (team2 === hat2[0]) {
      team4 = hat2[1];
    } else {
      team4 = hat2[0];
    }
    //giving notice that the teams from the same group can not play against each other in this phase of the tournament
    if (
      team1.getGroupSign() != team2.getGroupSign() &&
      team3.getGroupSign() != team4.getGroupSign()
    ) {
      isNotValid = false;
    }

    if (!isNotValid) {
      let pairAB = [team1, team2];
      let pairCD = [team3, team4];
      return [pairAB, pairCD];
    }
  }

  function getRandomTeams(hat1, hat2) {
    let team1 = hat1[Math.floor(Math.random() * hat1.length)];
    let team2 = hat2[Math.floor(Math.random() * hat2.length)];
    return [team1, team2];
  }

  let team3 = hat1.filter((team) => team !== team1);
  let team4 = hat2.filter((team) => team !== team2);

  let pariAB = [team1, team2];
  let pairCD = team3.concat(team4);

  return [pariAB, pairCD];
}

module.exports = { prepareKnockout };
