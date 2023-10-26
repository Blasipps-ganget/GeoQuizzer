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
        await createTables();
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
//dropTable();
//2.
//insertDataFromApi();

//3.
//fetchFlags('Europe');

//4.

function createTables() {

    db.run('CREATE TABLE regions (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)', () => populateRegions(db));
    db.run('CREATE TABLE countries (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, region_id INTEGER, FOREIGN KEY(region_id) REFERENCES regions (id))', () => populateCountries(db));
    db.run('CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, password TEXT, classRoom TEXT, teacher INTEGER)');
    db.run('CREATE TABLE classRoom (id INTEGER PRIMARY KEY AUTOINCREMENT, classRoomName TEXT, FOREIGN KEY(id) REFERENCES users (id))');
    db.run('CREATE TABLE flagquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');
    db.run('CREATE TABLE capitalquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');
    db.run('CREATE TABLE countryquiz (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, region_id INTEGER, attemptNr INTEGER, points INTEGER, wrongAnswers TEXT, FOREIGN KEY (user_id) REFERENCES users (id), FOREIGN KEY (region_id) REFERENCES regions(id))');

}
function populateRegions() {
    db.run(`INSERT INTO regions (name) VALUES ('europe'), ('asia'), ('oceania'), ('africa'), ('northAmerica'), ('southAmerica')`);
}

function populateCountries() {
    db.run(`
    INSERT INTO countries (name, region_id) VALUES 
        ('Albania', 1), ('Austria', 1), ('Belarus', 1), ('Belgium', 1), ('Bosnia and Herzegovina', 1), ('Bulgaria', 1), 
        ('Croatia', 1), ('Cyprus', 1), ('Czech Republic', 1), ('Denmark', 1), ('Estonia', 1), ('England', 1), 
        ('Finland', 1), ('France', 1), ('Germany', 1), ('Greece', 1), ('Hungary', 1), ('Iceland', 1), ('Ireland', 1), 
        ('Italy', 1), ('Kosovo', 1), ('Latvia', 1), ('Lithuania', 1), ('Russia', 1), ('Luxembourg', 1), ('Moldova', 1), 
        ('Montenegro', 1), ('Netherlands', 1), ('Norway', 1), ('Poland', 1), ('Portugal', 1), ('Romania', 1), 
        ('Republic of Serbia', 1), ('Slovakia', 1), ('Slovenia', 1), ('Spain', 1), ('Sweden', 1), ('Switzerland', 1), 
        ('Ukraine', 1), ('Macedonia', 1), ('Turkey', 1),
        ('Afghanistan', 2), ('Armenia', 2), ('Azerbaijan', 2), ('Bangladesh', 2), ('Bhutan', 2), ('Brunei', 2), 
        ('Cambodia', 2), ('China', 2), ('Georgia', 2), ('India', 2), ('Indonesia', 2), ('Iran', 2), ('Iraq', 2), 
        ('Israel', 2), ('Japan', 2), ('Jordan', 2), ('Kazakhstan', 2), ('Kuwait', 2), ('Kyrgyzstan', 2), ('Laos', 2), 
        ('Lebanon', 2), ('Malaysia', 2), ('Mongolia', 2), ('Myanmar', 2), ('Nepal', 2), ('North Korea', 2), ('Oman', 2),
        ('Pakistan', 2), ('Philippines', 2), ('Qatar', 2), ('Saudi Arabia', 2), ('South Korea', 2), ('Sri Lanka', 2), 
        ('Syria', 2), ('Taiwan', 2), ('Tajikistan', 2), ('Thailand', 2), ('Turkmenistan', 2), ('United Arab Emirates', 2), 
        ('Uzbekistan', 2), ('Vietnam', 2), ('Yemen', 2),
        ('Australia', 3), ('Fiji', 3), ('New Zealand', 3), ('Papua New Guinea', 3), ('Solomon Islands', 3), 
        ('Vanuatu', 3),
        ('Algeria', 4), ('Angola', 4), ('Benin', 4), ('Botswana', 4), ('Burkina Faso', 4), ('Burundi', 4), 
        ('Cameroon', 4), ('Central African Republic', 4), ('Chad', 4), ('Democratic Republic of the Congo', 4), 
        ('Republic of the Congo', 4), ('Djibouti', 4), ('Egypt', 4), ('Equatorial Guinea', 4), ('Eritrea', 4), 
        ('Swaziland', 4), ('Ethiopia', 4), ('Gabon', 4), ('Ghana', 4), ('Guinea', 4), ('Guinea Bissau', 4), 
        ('Ivory Coast', 4), ('Kenya', 4), ('Lesotho', 4), ('Liberia', 4), ('Libya', 4), ('Madagascar', 4), 
        ('Malawi', 4), ('Mali', 4), ('Mauritania', 4), ('Morocco', 4), ('Mozambique', 4), ('Namibia', 4), ('Niger', 4),
        ('Nigeria', 4), ('Rwanda', 4), ('Senegal', 4), ('Sierra Leone', 4), ('Somalia', 4), ('Somaliland', 4),
        ('South Africa', 4), ('South Sudan', 4), ('Sudan', 4), ('United Republic of Tanzania', 4), ('Togo', 4), 
        ('Tunisia', 4), ('Western Sahara', 4), ('Uganda', 4), ('Zambia', 4), ('Zimbabwe', 4),
        ('Canada', 5), ('USA', 5), ('Mexico', 5), ('Greenland', 5), ('Belize', 5), ('Costa Rica', 5), 
        ('El Salvador', 5), ('Guatemala', 5), ('Honduras', 5), ('Nicaragua', 5), ('Panama', 5), ('The Bahamas', 5), 
        ('Cuba', 5), ('Dominican Republic', 5), ('Haiti', 5), ('Jamaica', 5), ('Puerto Rico', 5),
        ('Argentina', 6), ('Bolivia', 6), ('Brazil', 6), ('Chile', 6), ('Colombia', 6), ('Ecuador', 6), ('Guyana', 6), 
        ('Paraguay', 6), ('Peru', 6), ('Suriname', 6), ('Uruguay', 6), ('Venezuela', 6), ('Falkland Islands', 6), 
        ('Trinidad and Tobago', 6)
  `);
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
module.exports = {router};






