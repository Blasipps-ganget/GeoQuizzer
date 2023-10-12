

/*Importing the importing the sqlite3 module */

const sqlite3 = require('sqlite3').verbose();


/* Establish a connection the database */
const db = new sqlite3.Database('./geoquizzer.db', sqlite3.OPEN_READWRITE, (err) => {

    if (err) {
        return console.error(err.message);
    }

    console.log('Connection Success');


});

function createTables() {

    db.run('CREATE TABLE countries (id INTEGER PRIMARY KEY, name TEXT, region TEXT)');
    db.run('CREATE TABLE regions (id INTEGER PRIMARY KEY, name TEXT, country_id INTEGER, FOREIGN KEY (country_id) REFERENCES countries (id))');
}

function insertData() {

    db.run('INSERT INTO countries( id, name, region) VALUES (?,?,?)',[1, 'Sweden', 'Europe']);
    db.run('INSERT INTO countries( id, name, region) VALUES (?,?,?)',[2, 'China', 'Asia']);
    db.run('INSERT INTO countries( id,  name, region) VALUES (?,?,?)',[3, 'USA', 'America']);
    db.run('INSERT INTO countries( id,  name, region) VALUES (?,?,?)',[4, 'Kenya', 'Africa']);
    db.run('INSERT INTO countries( id,  name, region) VALUES (?,?,?)',[5, 'Australia', 'Oceania']);

    db.run('INSERT INTO regions( name, country_id) VALUES (?,?)', ['Europe', 1]);
    db.run('INSERT INTO regions( name, country_id) VALUES (?,?)', ['Asia', 2]);
    db.run('INSERT INTO regions( name, country_id) VALUES (?,?)', ['America', 3]);
    db.run('INSERT INTO regions( name, country_id) VALUES (?,?)', ['Africa', 4]);
    db.run('INSERT INTO regions( name, country_id) VALUES (?,?)', ['Oceania', 5]);


}

function fetch() {

    const query = 'SELECT countries.name FROM countries JOIN regions ON countries.id = regions.country_id WHERE regions.name = "Europe"';


    db.all(query,[],(err,rows)=> {

        if (err) {
            return console.error(err.message);
        }

        console.log('Countries in Europe: ');

        rows.forEach(row => {

            console.log(row.name);
        })

    });


}

function dropTable () {



    db.run('DROP TABLE countries')
   db.run('DROP TABLE regions')
}

//createTables();
//insertData();
fetch();
//dropTable();

db.close((err) => {

    if(err) return console.error(err.message);


});












