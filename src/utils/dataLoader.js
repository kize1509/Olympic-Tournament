const fs = require("fs");
const path = require("path");

const groupsPath = path.join(__dirname, "../../data/groups.json");
const exibitionGamesPath = path.join(__dirname, "../../data/exibitions.json");

async function loadGoups() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(groupsPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
  return promise;
}

async function loadExibitionGames() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(exibitionGamesPath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
  return promise;
}

module.exports = { loadGoups, loadExibitionGames };
