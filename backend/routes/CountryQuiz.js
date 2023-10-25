const sqlite3 = require('sqlite3');
const express=require('express')
const router=express.Router()
const dbPath = './backend/database/geoquizzer.db'

module.exports=router;
express().use(express.json());


router.post("/result", express.json(), (req, res) => {
    console.log(req.body);
    compareResults(req.body)
        .then(r => console.log(r))
        .catch(err => console.log(err.message));
    res.sendStatus(200);
});

router.get("/:region", (req, res) => {
    const region = req.params.region;
    getCountries(region)
        .then(countries => res.send(countries))
        .catch(err => res.status(500).send({err}));
});

router.get("/quiz/:region", (req, res) => {
    const region = req.params.region;
    getCountries(region)
        .then(countries => res.send(shuffle(countries)))
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
        if (results.answers[i] === results.questions[i])
            correctAnswers++;
        else
            wrongAnswers += results.questions[i] + ", ";
    }
    console.log("Correct answers: " + correctAnswers);
    console.log("Wrong answers list: " + wrongAnswers);

    addToDb(1, correctAnswers, wrongAnswers, results.region).catch(err => console.log(err.message));
}

async function addToDb(user_id, points, wrongAnswers, region) {

    const db = await connectToDatabase();
    const attemptNr = await getAttemptNumber(user_id, db);
    const region_id = await getRegionId(db, region);
    const query = 'INSERT INTO countryquiz (user_id, region_id, attemptNr, points, wrongAnswers) VALUES (?, ?, ?, ?, ?)';

    db.run(query, [user_id, region_id, attemptNr, points, wrongAnswers],
            err => console.error(err ? err.message :'Inserted'));
    db.close();
}

async function getAttemptNumber(user_id, db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT MAX(attemptNr) AS attemptNr FROM countryquiz WHERE user_id = ?'
        db.get(query, [user_id], (err, row) => err ? reject(err.message) : resolve(row.attemptNr += 1));
    });
}

async function connectToDatabase() {
    return new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
        if (err) console.error(err.message);
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
    const rows = await new Promise((resolve, reject) =>
        db.all(query, [region], (err, rows) => err ? reject(err) : resolve(rows)));

    db.close();
    return rows.length === 0 ? [] : rows.map(row => row.name);
}


















