const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const dbPath = './backend/database/geoquizzer.db'
const jwt = require('jsonwebtoken');
const {config} = require("dotenv");
require('dotenv').config();
const jwtSecret = "c835c6f50940a1c8783463d92ab7f8a442fcdad96e49e472d6b27e26407ca3f4"

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
                res.status(500).send("Internal Server Error");
            } else {
                if (userExists) {
                    db.get(query, loginAttempt.username, (err, storedPassword) => {
                        if (err) {
                            console.log(err.message)
                            res.status(500).send("Internal Server Error");
                        } else {
                            bcrypt.compare(loginAttempt.password, storedPassword.password, (error, result) => {
                                if (error) {
                                    console.log(error.message)
                                    res.status(500).send("Internal Server Error");

                                }
                                if (result) {
                                    console.log("Correct, ", loginAttempt.username)
                                    const token = createToken(loginAttempt.username)
                                    res.status(200).send(token);

                                } else {
                                    console.log("Invalid Credentials")
                                    res.status(401).send("Invalid credentials");
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

    if (user.firstPass === user.secondPass) {
        try {
            checkIfUserExists(user.username, (checkErr, userExists) => {
                if (checkErr) {
                    console.log(checkErr.message)
                    res.status(500).send("Internal Server Error");
                } else {
                    if (userExists) {
                        console.log("Error, user exists:", user.username)
                        res.status(400).send("Bad Request");
                        return null;
                    } else {
                        insertIntoDatabase(user, (insertErr, token) => {
                            if (insertErr) {
                                console.log(insertErr.message)
                                res.status(500).send("Internal Server Error");

                            }
                            if (token) {
                                console.log("creating user ")
                                res.status(201).send(token);
                            }
                        });
                    }
                }
            });
        } catch (err) {
            console.log(err)
            return res.status(500).send("Internal Server Error");

        }

    } else {
        console.log("No matching passwords")
        res.status(500).send("Internal Server Error");

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
                    console.log(err.message);
                }
                const token = createToken(user.username);
                callback(null, token);
                console.log("User registered successfully")
            });
            db.close();
        }
    })

}

const createDbConnection = () => {
    return new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
}

const createToken = (name) => {
    const payload = {
        name: name
    }
    console.log(jwtSecret)
    return jwt.sign(payload, jwtSecret, {expiresIn: 1800});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

module.exports = router;