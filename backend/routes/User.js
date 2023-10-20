const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const dbPath = './backend/database/geoquizzer.db'

router.post("/login", (req, res) => {
    const db = createDbConnection(dbPath);
    const query = 'SELECT password FROM users WHERE name = ?';
    const loginAttempt = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        checkIfUserExists(loginAttempt.username, (checkErr, userExists) => {
            if (checkErr) {
                console.log(checkErr.message)
            } else {
                if (userExists) {
                    db.get(query, loginAttempt.username, (err, storedPassword) => {
                        if (err) {
                            console.log(err.message)
                        } else {
                            bcrypt.compare(loginAttempt.password, storedPassword.password, (error, result) => {
                                if (error) {
                                    console.log(error.message)
                                }
                                if (result) {
                                    console.log("Korrekt lösenord, här är ditt token, ", loginAttempt.username)
                                } else {
                                    console.log("Fel lösenord")
                                }
                            })
                        }
                    })
                    return null;
                } else {
                    console.log("No Existing user")
                }
            }
        });
    } catch (err) {
        return res.send(err.message)
    }
})

router.post("/signup", (req, res) => {
    const user = {
        username: req.body.username._value,
        email: req.body.email._value,
        firstPass: req.body.firstPass._value,
        secondPass: req.body.secondPass._value
    };
    if(user.firstPass === user.secondPass) {
        try {
            checkIfUserExists(user.username, (checkErr, userExists) => {
                if (checkErr) {
                    console.log(checkErr.message)
                } else {
                    if (userExists) {
                        console.log("Error, user exists:", user.username)
                        return null;
                    } else {
                        insertIntoDatabase(user, (insertErr) => {
                            if (insertErr) {
                                console.log(insertErr.message)
                            } else {
                                console.log("INSERTED", user, "SUCCESSFULLY")
                            }
                        });
                    }
                }
            });
        } catch (err) {
            return res.send(err.message)
        }

    } else{
        console.log("No matching passwords")
    }



    //skickas tillbaks? token?
})
const checkIfUserExists = (username, callback) => {
    const db = createDbConnection();
    const query = 'SELECT * FROM users WHERE name = ?'

    return db.get(query, username, (err, user) => {
        if (err) {
            console.log(err.message);
            return callback(null, true)
        } else if (user) {
            return callback(null, true)
        }
        return callback(null, false)
    });
}

const insertIntoDatabase = (user, callback) => {
    const saltRounds = 10;
    const db = createDbConnection();
    const registerQuery = 'INSERT INTO users (name,email,password,teacher) VALUES (?,?,?,?)';

    bcrypt.hash(user.firstPass, saltRounds, (err, result) => {
        if (err) {
            return err.message;
        } else {
            db.run(registerQuery, [user.username, user.email, result, 0], function (err) {
                if (err) {
                    console.log(err.message)
                    return false;
                }
                console.log("User registered successfully")
            });
            db.close();
        }
    })

}

const createDbConnection = () => {
    return new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
}

module.exports = router;