const sqlite3 = require('sqlite3');
const dbPath = './backend/database/geoquizzer.db';

const express=require('express')
const router=express.Router()
module.exports=router;

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => err ? reject(err) : resolve(db));
  });
}

const db = connectToDatabase();


/*
SELECT COUNT(countries.name)
FROM countries
JOIN regions ON countries.region_id = regions.id
WHERE regions.name = 'europe';



SELECT MAX(points) AS highest_score
FROM countryquiz
WHERE user_id = 5;

async function getIdFromName(name) {
    const db = await connectToDatabase();
    const query = 'SELECT users.id FROM  users WHERE users.name = ?';
    const row = await new Promise((resolve, reject) => db.get(query, [name], (err, row) => err ? reject(err) : resolve(row)));
    db.close();
    return row ? row.id : null;


}

}


*/

router.get("/", (req, res) => {

  return res.json(
  { "highscores":
    [
  {
    "region": "Europe",
    "percentage": "35%"
  },
  {
    "region": "Africa",
    "percentage": "30%"
  },
  {
    "region": "America",
    "percentage": "2%"
  },
  {
    "region": "Asia",
    "percentage": "15%"
  },
  {
    "region": "Oceania",
    "percentage": "45%"
  }] }
)

});