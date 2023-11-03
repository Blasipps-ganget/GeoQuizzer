const sqlite3 = require('sqlite3');
const express=require('express')
const router=express.Router()
const dbPath = './backend/database/geoquizzer.db'

module.exports=router;
express().use(express.json());

router.post("/postResult",express.json(),(req, res) => {
     let userName = getNameFromToken(req);
     compareResults(req.body, userName)
         .then(() => res.sendStatus(200))
         .catch(err => res.status(500).send({err}));

 });

router.get("/getCapital", async (req, res) => {
  const db = new Db();
  try {
    const quizData = [];
    const query = ('SELECT name from regions WHERE name = ? LIMIT 10')
    const worldCountries = await fetchCapital();
    res.send(worldCountries);
  } catch (error){
    console.error(error);
    res.status(500).send("Internal Server error")
  }
});
async function compareResults(results, userName) {
  if (30 < results.answers.length) {
      console.log("Cheat detected!");
      return;
  }
  let correctAnswers = 0;
  let wrongAnswers = "";
  console.log("resuluts", results.answers);
  for (let i = 0; i < results.answers.length; i++) {
    console.log("allt",results.answers[i] === results.questions[i] );
      results.answers[i] === results.questions[i] ? correctAnswers++ : wrongAnswers += results.questions[i] + ", ";
  }
  console.log("WRONGS", wrongAnswers);
  let user_id = await getIdFromName(userName);

  if (user_id === null) {
      console.log("User not found!");
      return;
  }

  addToDb(user_id, correctAnswers, wrongAnswers, results.region).catch(err => console.log(err.message));
}

async function addToDb(user_id, points, wrongAnswers, region) {
  console.log("WRONG", wrongAnswers);
  const db = await connectToDatabase();
  const attemptNr = await getAttemptNumber(user_id, db);
  const region_id = await getRegionId(db, region);
  const query = 'INSERT INTO capitalquiz (user_id, region_id, attemptNr, points, wrongAnswers) VALUES (?, ?, ?, ?, ?)';
  db.run(query, [user_id, region_id, attemptNr, points, wrongAnswers], err => err ? console.log(err.message) : console.log("Successfully added to db"));
  db.close();
}

async function getIdFromName(name) {
  const db = await connectToDatabase();
  const query = 'SELECT users.id FROM  users WHERE users.name = ?';
  const row = await new Promise((resolve, reject) => db.get(query, [name], (err, row) => err ? reject(err) : resolve(row)));
  db.close();
  return row ? row.id : null;
}

async function getAttemptNumber(user_id, db) {
  return new Promise((resolve, reject) => {
      const query = 'SELECT MAX(attemptNr) AS attemptNr FROM capitalquiz WHERE user_id = ?'
      db.get(query, [user_id], (err, row) => err ? reject(err.message) : resolve(row.attemptNr += 1));
  });
}

async function getRegionId(db, region) {
  return new Promise((resolve, reject) => {
      const query = 'SELECT id FROM regions WHERE name = ?';
      db.get(query, [region], (err, row) => err ? reject(err.message) : resolve(row.id));
  });
}

function connectToDatabase() {
  return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => err ? reject(err) : resolve(db));
  });
}

const fetchCapital = async () => {
  try {
   const response = await fetch("https://restcountries.com/v3.1/region/europe", {
  dispatcher: new Agent({ connectTimeout: 100000 })
  });

    if (!response.ok) {
      console.error("error", response)
      throw new Error("Failed to fetch capitals");
    }
    const WorldCapitals = await response.json();
    const randomIndex = Math.floor(Math.random() * WorldCapitals.length);

    const capitalName = WorldCapitals[randomIndex].capital;
    const name = WorldCapitals[randomIndex].name.common;
    const flag = WorldCapitals[randomIndex].coatOfArms.svg;
    const wrongAnswers = [];

    while (wrongAnswers.length < 3) {
      const randomWrongIndex = Math.floor(Math.random() * WorldCapitals.length);
      const randomWrongName = WorldCapitals[randomWrongIndex].name.common;
      if (randomWrongName !== capitalName && !wrongAnswers.includes(randomWrongName)) {
        wrongAnswers.push(randomWrongName);
      }
    }
    const info = {
      land: name,
      flagurl: flag,
      felsvar: wrongAnswers
    };
    return info;
  } catch (error) {
    throw error;
  }
};

module.exports = router;