const sqlite3 = require('sqlite3');
const express=require('express')
const router=express.Router()
const dbPath = './backend/database/geoquizzer.db'

module.exports=router;
express().use(express.json());

router.post("/result", express.json(), (req, res) => {
    compareResults(req.body)
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send({err}));
});

router.get("/:region", (req, res) => {
    const region = req.params.region;
    const shouldShuffle = req.query.shuffle === 'true';
    getCountries(region)
        .then(countries => res.send(shouldShuffle ? shuffle(countries) : countries))
        .catch(err => res.status(500).send({err}));
});

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => err ? reject(err) : resolve(db));
    });
}

async function compareResults(results) {
    let countriesFromDb = await getCountries(results.region);
    let amountOfQuestions = countriesFromDb.length;

    if (amountOfQuestions !== results.answers.length) {
        console.log("Cheat detected!");
        return;
    }

    let correctAnswers = 0;
    let wrongAnswers = "";

    for (let i = 0; i < results.answers.length; i++) {
        results.answers[i] === results.questions[i] ? correctAnswers++ : wrongAnswers += results.questions[i] + ", ";
    }
    addToDb(1, correctAnswers, wrongAnswers, results.region).catch(err => console.log(err.message));
}

async function addToDb(user_id, points, wrongAnswers, region) {
    const db = await connectToDatabase();
    const attemptNr = await getAttemptNumber(user_id, db);
    const region_id = await getRegionId(db, region);
    const query = 'INSERT INTO countryquiz (user_id, region_id, attemptNr, points, wrongAnswers) VALUES (?, ?, ?, ?, ?)';
    db.run(query, [user_id, region_id, attemptNr, points, wrongAnswers], err => err ? console.log(err.message) : console.log("Successfully added to db"));
    db.close();
}

async function getAttemptNumber(user_id, db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT MAX(attemptNr) AS attemptNr FROM countryquiz WHERE user_id = ?'
        db.get(query, [user_id], (err, row) => err ? reject(err.message) : resolve(row.attemptNr += 1));
    });
}

async function getRegionId(db, region) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id FROM regions WHERE name = ?';
        db.get(query, [region], (err, row) => err ? reject(err.message) : resolve(row.id));
    });
}

async function getCountries(region) {
    const db = await connectToDatabase();
    const query = 'SELECT countries.name FROM countries JOIN regions ON countries.region_id = regions.id WHERE regions.name = ?';
    const rows = await new Promise((resolve, reject) => db.all(query, [region], (err, rows) => err ? reject(err) : resolve(rows)));
    db.close();
    return rows.map(row => row.name);
}

