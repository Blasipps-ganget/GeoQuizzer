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



async function getIdFromName(name) {
  const db = await connectToDatabase();
  const query = 'SELECT users.id FROM users WHERE users.name = ?';
  const row = await new Promise((resolve, reject) => db.get(query, [name], (err, row) => err ? reject(err) : resolve(row)));
  db.close()
  return row ? row.id : null;
}

async function getNoCountries(region) {
  const db = await connectToDatabase();
  const query = 'SELECT COUNT(countries.name)' +
      ' FROM countries JOIN regions ON countries.region_id = regions.id WHERE regions.name = ?';
  const count = await new Promise((resolve, reject) => db.get(query, [region], (err, count) => err ? reject(err) : resolve(count)))
  db.close()
  return count ? count : 0;

}

async function getRegions() {
  const db = await connectToDatabase();
  const query = 'SELECT regions.name FROM regions';
  const rows = await new Promise((resolve, reject) =>
      db.all(query, (err, rows) => (err ? reject(err) : resolve(rows)))
  );
  db.close()
  return rows.map(temp => temp.name)

}




async function performOperations(selectedQuiz) {
  const regions = await getRegions();
  console.log(regions);

  // get username
  let username = 'antom'
  let jsonResult = '';


  const id = await getIdFromName(username);
  let array = []
  console.log('id =' + id);

  if (id !== null) {

    for (i = 0; i < regions.length; i++) {
      const percentageResult = 50; // await getPercentage(selectedQuiz, region);
      let regionStylized = '';
      switch (regions[i]) {
        case 'europe':
          regionStylized = 'Europe';
          break;
        case 'asia':
          regionStylized = 'Asia';
          break;
        case 'oceania':
          regionStylized = 'Oceania';
          break;
        case 'africa':
          regionStylized = 'Africa';
          break;
        case 'northAmerica':
          regionStylized = "North America";
          break;
        case 'southAmerica':
          regionStylized = "South America"
          break;
      }

      array.push({region: regionStylized, percentage: percentageResult });


    }

    const resultObject = { highscores: array }
    jsonResult = JSON.stringify(resultObject)

  }

  console.log('FRÅN PERFORM OPERATIONS')
  console.log(jsonResult)
  return jsonResult;
}



/*
//   let userName = getNameFromToken(req);

SELECT COUNT(countries.name)
FROM countries
JOIN regions ON countries.region_id = regions.id
WHERE regions.name = 'europe';



SELECT MAX(points) AS highest_score
FROM countryquiz
WHERE user_id = 5;



}


*/

router.get("/", (req, res) => {
  const selectedQuiz = req.query.quiz;
  console.log(selectedQuiz);

  const result = performOperations(selectedQuiz);
  console.log(result);
  let resultString = ''
  result.then((value) => { console.log('Inside then(): ' + value); resultString = value; } );

  console.log('Result: ' + resultString);

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

