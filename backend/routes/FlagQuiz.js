const sqlite3 = require('sqlite3');
const express = require('express')
const router = express.Router()
const dbPath = './backend/database/geoquizzer.db'

module.exports = router;
express().use(express.json());

router.post("/postResult", express.json(), (req, res) => {
    let userName = getNameFromToken(req);
    compareResults(req.body, userName)
        .then(() => res.status(200).send())
        .catch(err => console.log(err.message));

});

router.get("/getFlagQuestions/:nrOfQuestions/:region", async (req, res) => {

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    let nrOfQuestions = req.params.nrOfQuestions
    const region = req.params.region

    const query = ('SELECT COUNT(countries.id) AS count FROM countries WHERE region_id = (SELECT id FROM regions WHERE name = ?)')
    await db.get(query, region, async (err, result) => {
        if (err) console.error(err)
        if (result) {
            console.log(result.count)
            if (result.count <= 30) {
                res.status(200).send(await fetchCountries(region, result.count))
            } else {
                res.status(200).send(await fetchCountries(region, nrOfQuestions))
            }
        }
    })

});

const getRandomCountries = (region, amount) => {
    const q = 'SELECT name FROM countries WHERE region_id = (SELECT id FROM regions WHERE name = ?) ORDER BY RANDOM() LIMIT ?';
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    return new Promise((resolve, reject) => {
        db.all(q, [region, amount], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getWrongCountries = (correctCountry, region, amount) => {
    return getRandomUniqueCountries(region, amount, correctCountry).then((wrongCountries) => {
        return {name: correctCountry, wrong: wrongCountries};
    });
};

const getRandomUniqueCountries = (region, amount, correctCountry) => {
    const wrongCountries = [];
    return new Promise(async (resolve, reject) => {
        while (wrongCountries.length < amount) {
            try {
                const randomCountry = (await getRandomCountries(region, 1))[0].name;
                if (randomCountry !== correctCountry && !wrongCountries.includes(randomCountry)) {
                    wrongCountries.push(randomCountry);
                }
            } catch (err) {
                reject(err);
                return;
            }
        }
        resolve(wrongCountries);
    });
};

const fetchCountries = async (region, amount) => {
    const results = [];
    for (let i = 0; i < amount; i++) {
        try {
            const correctCountry = (await getRandomCountries(region, 1))[0].name;
            const data = await getWrongCountries(correctCountry, region, 3);
            const flagsResponse = await fetch(`https://restcountries.com/v3.1/name/${data.name}?fields=flags`);
            const flagsData = await flagsResponse.json();
            let question = {
                name: data.name,
                wrongAnswers: data.wrong,
                flagUrl: flagsData[0].flags
            }
            results.push(question);
        } catch (err) {
            console.error(err);
        }
    }
    return results
};


async function compareResults(results, userName) {
    if (30 < results.answers.length) {
        console.log("Cheat detected!");
        return;
    }
    let correctAnswers = 0;
    let wrongAnswers = "";
    for (let i = 0; i < results.answers.length; i++) {
        results.answers[i] === results.questions[i] ? correctAnswers++ : wrongAnswers += results.questions[i] + ", ";
    }
    let user_id = await getIdFromName(userName);

    if (user_id === null) {
        return;
    }
    let percent = Math.round((correctAnswers / results.answers.length) * 100);

    const data = {
        user_id,
        points: correctAnswers,
        wrongAnswers,
        maxPoints: results.answers.length,
        percent,
        region: results.region,
    };
    addToDb(data).catch(err => console.log(err.message));
}

async function addToDb(data) {
    const db = await connectToDatabase();
    const attemptNr = await getAttemptNumber(data.user_id, db);
    const region_id = await getRegionId(db, data.region);
    const query = 'INSERT INTO capitalquiz (user_id, region_id, attemptNr, points, max_points, percent, wrongAnswers) VALUES (?, ?, ?, ?, ?,?,?)';
    db.run(query, [data.user_id, region_id, attemptNr, data.points, data.maxPoints, data.percent, data.wrongAnswers], err => err ? console.log(err.message) : console.log("Successfully added to db"));
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
const getNameFromToken = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.name;
}
module.exports = router;