const sqlite3 = require('sqlite3');
const dbPath = './backend/database/geoquizzer.db';

const express=require('express')
const { Buffer } = require('node:buffer');
const router=express.Router();
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

async function getPercentage(selectedQuiz, region, userId) {
  let regionId = 0;
  console.log(region)
  switch (region) {
    case 'europe':
      regionId = 1;
      break;
    case 'asia':
      regionId = 2;
      break;
    case 'oceania':
      regionId = 3;
      break;
    case 'africa':
      regionId = 4;
      break;
    case 'northAmerica':
      regionId = 5;
      break;
    case 'southAmerica':
      regionId = 6;
      break;
  }

  const db = await connectToDatabase();
  if (selectedQuiz === 'countries') {

    const query = 'SELECT MAX(percent) FROM countryquiz WHERE user_id = ? AND region_id = ?';
    const row = await new Promise((resolve, reject) => db.get(query, [userId, regionId], (err, row) => err ? reject(err) : resolve(row)));

    return row ? row['MAX(percent)'] : null;

  } else if (selectedQuiz === 'flags') {

      const query = 'SELECT MAX(percent) FROM flagquiz WHERE user_id = ? AND region_id = ?';
      const row = await new Promise((resolve, reject) => db.get(query, [userId, regionId], (err, row) => err ? reject(err) : resolve(row)));

      return row ? row['MAX(percent)'] : null;


  } else if (selectedQuiz === 'capitals') {
      const query = 'SELECT MAX(percent) FROM capitalquiz WHERE user_id = ? AND region_id = ?';
      const row = await new Promise((resolve, reject) => db.get(query, [userId, regionId], (err, row) => err ? reject(err) : resolve(row)));

      return row ? row['MAX(percent)'] : null;
  }
  db.close()
}


async function performOperations(selectedQuiz, username) {
  const regions = await getRegions();
  console.log(regions);

  // get username
  //   let userName = getNameFromToken(req);
  // username = 'antom'
  console.log(username)

  let jsonResult = '';


  const userId = await getIdFromName(username);
  let array = []
  console.log('id =' + userId);

  if (userId !== null) {

    for (i = 0; i < regions.length; i++) {

      const percentageResult2 = await getPercentage(selectedQuiz, regions[i], userId)
      console.log('percentage result2')
      console.log(percentageResult2);
      // const percentageResult = 50;
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

      array.push({region: regionStylized, percentage: percentageResult2 });


    }

    const resultObject = { highscores: array }
    jsonResult = JSON.stringify(resultObject);

  }

  console.log('FRÅN PERFORM OPERATIONS')
  console.log(jsonResult)
  return jsonResult;
}



/*


SELECT COUNT(countries.name)
FROM countries
JOIN regions ON countries.region_id = regions.id
WHERE regions.name = 'europe';



SELECT MAX(points) AS highest_score
FROM countryquiz
WHERE user_id = 5;



}


*/

const getNameFromToken = (req) => {
  const authHeader = req.headers['authorization']
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

  return payload.name;
}

router.get("/", (req, res) => {
  const selectedQuiz = req.query.quiz;
  const name = req.query.name
  console.log(selectedQuiz);
console.log("NN", name)
  performOperations(selectedQuiz, name).then((result) => {
    console.log('---------' + result);
    return res.json(result);
  });





})

