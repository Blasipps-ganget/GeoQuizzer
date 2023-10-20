
const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const router = express.Router();
const dbPath = './backend/database/geoquizzer.db'

/* Establish a connection the database */
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.log("no work")
        return console.error(err.message);
    }
    console.log('Connection Success', dbPath);

});
//Route för att fetcha data
router.get("/insertDataFromApi", async (req, res) => {
    try {

        await insertDataFromApi();
        res.json({message: "Data inserted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.get("/createTables", async (req, res) => {
    try {
        createTables()
        res.json({message: "Created tables successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});
const fetchCountryFlag = async () => {
    try {
        const response = await fetch("https://restcountries.com/v3.1/name/Denmark");
        if (response.status === 200) {
            return response.data;
        }
        //return europeanCountries.map((country) => country.flags.svg);
    } catch (error) {
        throw error;
    }
};

async function insertDataFromApi() {
    try {
        const apiData = await fetchCountryFlag();
        if (!apiData) return;
        for (const country of apiData) {
            const {name, region} = country;
            const insertCountryQuery = 'INSERT INTO countries (name,region) VALUES (?,?)';
            const insertRegionQuery = 'INSERT INTO regions (name, country_id) VALUES (?,?)';
            db.run(insertCountryQuery, [name.common, region], function (err) {
                if (err) {
                    console.error(err.message);
                } else {
                    const country_id = this.lastID; // Används för att lägga till data i regions

                    db.run(insertRegionQuery, [region, country_id], function (err) {
                        if (err) {
                            console.error(err.message);
                        } else {
                            console.log('Data inserted', name.common)
                        }
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
}

function fetchFlags(region) {
    const query = 'SELECT countries.name FROM countries JOIN regions ON countries.id = regions.country_id WHERE regions.name = ?';

    db.all(query, [region], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        rows.forEach(row => {
            console.log(row.name);
        })
    });
}

//1.
//createTables();
//dropTable()
//2.
//insertDataFromApi();

//3.
//fetchFlags('Europe');

//4.

//dropTable();
function createTables() {

    db.run('CREATE TABLE regions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    db.run('CREATE TABLE countries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, region_id INTEGER, FOREIGN KEY(region_id) REFERENCES regions (id))');
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, classRoom TEXT, teacher INTEGER)');
    db.run('CREATE TABLE classRoom (id INTEGER PRIMARY KEY AUTOINCREMENT, classRoomName TEXT, FOREIGN KEY(id) REFERENCES users (id))');
    db.run('CREATE TABLE flagquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');
    db.run('CREATE TABLE capitalquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');
    db.run('CREATE TABLE countryquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');
}

function dropTable() {

    db.run('DROP TABLE regions')
    db.run('DROP TABLE countries')
    db.run('DROP TABLE users')
    db.run('DROP TABLE classRoom')
    db.run('DROP TABLE flagquiz')
    db.run('DROP TABLE capitalquiz')
    db.run('DROP TABLE countryquiz')
}

db.close((err) => {

    if (err) return console.error(err.message);


});
module.exports = {router}
