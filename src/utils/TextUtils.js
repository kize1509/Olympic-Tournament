const {
  BLUE,
  RED,
  RESET,
  BOLD,
  YELLOW,
  SILVER,
} = require("../../config/constants");
class TextUtils {
  printHats(hatD, hatE, hatF, hatG) {
    console.log(BLUE + "HATS");
    console.log("====================" + RESET);
    console.log(RED + "\tHat D");
    console.log("\t==================== " + RESET);
    hatD.forEach((team) => {
      console.log("\t\t" + team.getName());
    });

    console.log(RED + "\tHat E");
    console.log("\t====================" + RESET);
    hatE.forEach((team) => {
      console.log("\t\t" + team.getName());
    });

    console.log(RED + "\tHat F");
    console.log("\t====================" + RESET);
    hatF.forEach((team) => {
      console.log("\t\t" + team.getName());
    });

    console.log(RED + "\tHat G");
    console.log("\t====================" + RESET);
    hatG.forEach((team) => {
      console.log("\t\t" + team.getName());
    });
  }
  printGroupGameResults(group, k, m, game1, game2) {
    console.log(BLUE + "\tGroup " + group.getName());
    console.log("\t\t====================================" + RESET);
    console.log(RED + `\t\tGame ${k}: ` + game1.toString());
    console.log(`\t\tGame ${m}: ` + game2.toString() + RESET);
    console.log(BLUE + "\t\t====================================" + RESET);
  }

  printGroupHeading(k) {
    console.log("====================================");
    console.log("GROUP PHASE, ROUND " + k);
    console.log("====================================");
  }

  printEliminationPh(pairs1, pairs2) {
    console.log(BLUE + "\nELIMINATION PHASE");
    console.log("==================" + RESET);
    console.log(
      "\n\t" + pairs1[0][0].getName() + " vs " + pairs1[0][1].getName()
    );
    console.log(
      "\t" + pairs1[1][0].getName() + " vs " + pairs1[1][1].getName() + "\n"
    );

    console.log("\t----------------");

    console.log(
      "\n\t" + pairs2[0][0].getName() + " vs " + pairs2[0][1].getName()
    );
    console.log(
      "\t" + pairs2[1][0].getName() + " vs " + pairs2[1][1].getName() + "\n"
    );
  }

  printQuarters(game1, game2, game3, game4) {
    console.log(BLUE + "\nQUARTER FINALS");
    console.log("==================" + RESET);
    console.log(RED + `\tGame : ` + game1.toString());
    console.log(`\tGame : ` + game2.toString() + RESET);
    console.log(BLUE + "\t====================================" + RESET);
    console.log(RED + `\tGame : ` + game3.toString());
    console.log(`\tGame : ` + game4.toString() + RESET);
    console.log(BLUE + "\t====================================" + RESET);
  }

  delimeterCalculator(pointDifference) {
    if (pointDifference >= 0 && pointDifference < 10) {
      return 4;
    }
    if (pointDifference < 0 && pointDifference > -10) {
      return 3;
    }
    if (pointDifference < -9 && pointDifference > -100) {
      return 2;
    }
    if (pointDifference > 9 && pointDifference < 100) {
      return 3;
    }
  }

  printSemiFinals(firstSemi, secondSemi) {
    console.log(BLUE + "\nSEMI FINALS");
    console.log("==================" + RESET);
    console.log(RED + `\tGame : ` + firstSemi.toString());
    console.log(`\tGame : ` + secondSemi.toString() + RESET);
    console.log(BLUE + "\t====================================" + RESET);
  }

  printFinals(finals) {
    console.log(BLUE + "\nFINALS");
    console.log("==================" + RESET);
    console.log(RED + `\tGame : ` + finals.toString());
    console.log(BLUE + "\t====================================" + RESET);
  }

  printThidPlace(thirdPlace) {
    console.log(BLUE + "\nTHIRD PLACE");
    console.log("==================" + RESET);
    console.log(RED + `\tGame : ` + thirdPlace.toString());
    console.log(BLUE + "\t====================================" + RESET);
  }

  printMedals(winner, second, third) {
    console.log(BLUE + "\nMEDALS");
    console.log("==================" + RESET);
    console.log(RED + "\n\tTHIRD PLACE");
    console.log("\t==================");
    console.log(`\t${third.getName()}`);
    console.log("\t====================================" + RESET);

    console.log(SILVER + "\n\tSECOND PLACE");
    console.log("\t==================");
    console.log(`\t${second.getName()}`);
    console.log("\t====================================" + RESET);

    console.log(YELLOW + "\n\tWINNER");
    console.log("\t==================" + RESET);
    console.log(YELLOW + `\t${winner.getName()} `);
    console.log("\t====================================" + RESET);
  }
}

module.exports = {
  TextUtils,
};
