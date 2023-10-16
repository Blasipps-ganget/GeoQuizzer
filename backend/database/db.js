

/*Importing the importing the sqlite3 module */

const sqlite3 = require('sqlite3').verbose();
const express = require("express");
const router = express.Router();
const axios = require("axios");

/* Establish a connection the database */
const db = new sqlite3.Database('./geoquizzer.db', sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
        return console.error(err.message);
    }

    console.log('Connection Success');


});
        //Route för att fetcha data
router.get("/insertDataFromApi", async (req, res) => {
    try {

         await insertDataFromApi();
        res.json({ message: "Data inserted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

const fetchCountryFlag = async () => {
    try {
        const response = await axios.get("https://restcountries.com/v3.1/name/Denmark");

        if (response.status === 200) {
            return response.data;
        }

      //return europeanCountries.map((country) => country.flags.svg);

    } catch (error) {
        throw error;
    }
};


function createTables() {

    db.run('CREATE TABLE countries (id INTEGER PRIMARY KEY, name TEXT, region TEXT)');
    db.run('CREATE TABLE regions (id INTEGER PRIMARY KEY, name TEXT, country_id INTEGER, FOREIGN KEY (country_id) REFERENCES countries (id))');
}


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

//Fetcha flaggor för en specifik region
function fetchFlags(region) {

    const query = 'SELECT countries.name FROM countries JOIN regions ON countries.id = regions.country_id WHERE regions.name = ?';


    db.all(query, [region], (err, rows) => {

        if (err) {
            return console.error(err.message);
        }

        console.log(`Countries in ${region}: `);


        rows.forEach(row => {

            console.log(row.name);
        })

    });

}

//1.
//createTables();

//2.
//insertDataFromApi();

//3.
fetchFlags('Europe');

//4.
//dropTable();


function dropTable () {



   db.run('DROP TABLE countries')
  db.run('DROP TABLE regions')
}


// db.close((err) => {
//
//     if (err) return console.error(err.message);
//
//
// });

    module.exports = router;
