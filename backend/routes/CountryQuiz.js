// ID, NAME, CAPITAL, REGION,

const sqlite3 = require('sqlite3');
const express=require('express')
const router=express.Router()
const dbPath = './backend/database/geoquizzer.db'

module.exports=router;
express().use(express.json());

const regions = {
    "europe": getEuropeCountries(),
    "asia": getAsianCountries(),
    "oceania": getOceaniaCountries(),
    "africa": getAfricaCountries(),
    "northAmerica": getNorthAmericaCountries(),
    "southAmerica": getSouthAmericaCountries()
};

router.post("/result", express.json(),  (req, res) => {

    console.log(req.body);
    compareResults(req.body);
    res.sendStatus(200);
})

router.get("/:region", (req, res) => {
    const region = req.params.region;
    res.send(regions[region]);
});

router.get("/quiz/:region", (req, res) => {
    const region = req.params.region;
    res.send(getQuiz(region));
});


function getQuiz(region) {
    return shuffle(regions[region]);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function compareResults(results) {

    let questions = results.questions;
    let answers = results.answers;
    let region = results.region;


    if (regions[region].length !== answers.length) {
        console.log("Cheat detected!");
        return;
    }

    let correctAnswers = 0;
    let wrongAnswers = "";

    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === questions[i])
            correctAnswers++;
        else
            wrongAnswers += questions[i] + ", ";
    }
    console.log("Correct answers: " + correctAnswers);
    console.log("Wrong answers list: " + wrongAnswers);

    addToDb(1, correctAnswers, wrongAnswers).catch(err => console.log(err.message));
}

async function addToDb(user_id, points, wrongAnswers) {

    const db = await connectToDatabase();
    const attemptNr = await getAttemptNumber(user_id, db);
    const query = 'INSERT INTO countryquiz (user_id, region_id, attemptNr, points, wrongAnswers) VALUES (?, ?, ?, ?, ?)';

    db.run(query, [user_id, 1, attemptNr, points, wrongAnswers], err => console.error(err ? err.message :'Inserted'));
    db.close();
}

async function getAttemptNumber(user_id, db) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT MAX(attemptNr) AS attemptNr FROM countryquiz WHERE user_id = ?'
        db.get(query, [user_id], (err, row) => err ? reject(err.message) : resolve(row.attemptNr += 1));
    });
}

function connectToDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
            err => err ? reject(err.message) : resolve(db));
    });
}

function getSouthAmericaCountries() {
    return [
        "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru",
        "Suriname", "Uruguay", "Venezuela", "Falkland Islands" ,"Trinidad and Tobago"
    ];
}

function getNorthAmericaCountries() {
    return [
        "Canada", "USA", "Mexico", "Greenland", "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
        "Nicaragua", "Panama", "The Bahamas", "Cuba",  "Dominican Republic",  "Haiti", "Jamaica", "Puerto Rico",
    ];
}

function getAfricaCountries() {
    //  deleted Gambia,
    return [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
        "Central African Republic", "Chad", "Democratic Republic of the Congo", "Republic of the Congo",
        "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Swaziland", "Ethiopia", "Gabon", "Ghana",
        "Guinea", "Guinea Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
        "Malawi", "Mali", "Mauritania", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
        "Senegal", "Sierra Leone", "Somalia", "Somaliland", "South Africa", "South Sudan", "Sudan",
        "United Republic of Tanzania", "Togo", "Tunisia", "Western Sahara", "Uganda", "Zambia", "Zimbabwe"
    ];
}

function getEuropeCountries() {
    // deleted Northern Cyprus
    return [
        "Albania", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
        "Cyprus", "Czech Republic", "Denmark", "Estonia", "England", "Finland", "France", "Germany",
        "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Lithuania", "Russia",
        "Luxembourg", "Moldova", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
        "Republic of Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine" ,"Macedonia",
        "Turkey"
    ];
}

function getOceaniaCountries() {
    return ["Australia", "Fiji", "New Zealand", "Papua New Guinea", "Solomon Islands", "Vanuatu"];
}

function getAsianCountries() {
    return [
        "Afghanistan", "Armenia", "Azerbaijan", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China",
        "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
        "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
        "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "South Korea", "Sri Lanka", "Syria", "Taiwan",
        "Tajikistan", "Thailand",  "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ];
}











