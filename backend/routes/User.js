const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const dbPath = './backend/database/geoquizzer.db'
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {resolve} = require("path");
dotenv.config({path: resolve(__dirname, '../.env')})
const jwtsecretkey = process.env.JWT_SECRET_KEY;
const refreshKey = process.env.REFRESH_TOKEN_SECRET;

router.post("/login",(req, res) => {
    const db = createDbConnection(dbPath);
    const query = 'SELECT password FROM users WHERE name = ?';
    const loginAttempt = {
        username: req.body.username,
        password: req.body.password
    };
    try {
        return checkIfUserExists(loginAttempt.username, (checkErr, userExists) => {
            if (checkErr) {
                res.status(500).send("Internal Server Error");
            } else {
                if (userExists) {
                    db.get(query, loginAttempt.username, (err, storedPassword) => {
                        if (err) {
                            res.status(500).send("Internal Server Error");
                        } else {
                            bcrypt.compare(loginAttempt.password, storedPassword.password, (error, result) => {
                                if (error) {
                                    res.status(500).send("Internal Server Error");
                                }
                                if (result) {
                                    const token = createToken(loginAttempt.username)
                                    const refreshToken = createRefreshToken(loginAttempt.username);
                                    res.cookie('jwt', refreshToken, {
                                        httpOnly: true,
                                        sameSite: 'None',
                                        secure: true,
                                        maxAge: 24 * 60 * 60 * 1000
                                    });
                                    res.status(200).json({token, refreshToken});
                                } else {
                                    res.status(401).send("Invalid credentials");
                                }
                            })
                        }
                    })
                    return null;
                } else {
                    res.status(404).send("No user")
                }
            }
        });
    } catch (err) {
        res.send(err.message)
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
                    res.status(500).send("Internal Server Error");
                } else {
                    if (userExists) {
                        res.status(400).send("Bad Request");
                        return null;
                    } else {
                        insertIntoDatabase(user, (insertErr, token, refreshToken) => {
                            if (insertErr) {
                                res.status(500).send("Internal Server Error");
                            }
                            if (token) {
                                res.status(201).send({token, refreshToken});
                            }
                        });
                    }
                }
            });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    } else {
        res.status(500).send("Internal Server Error");
    }
})

router.post('/checkValidity', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    jwt.verify(token, jwtsecretkey, (err, decoded) => {
        if (err) {
            res.sendStatus(401)
        } else if (decoded) {
            res.sendStatus(200)
        }
    })
})

router.post('/refresh', (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token) {
        jwt.verify(token, refreshKey,
            (err, decoded) => {
                if (err) {
                    return res.status(406).json({message: 'Unauthorized'});
                } else {
                    const accessToken = jwt.sign({
                        name: decoded.name,
                    }, process.env.JWT_SECRET_KEY, {
                        expiresIn: 18000000
                    });
                    return res.json({accessToken});
                }
            })
    } else {
        return res.status(406).json({message: 'Unauthorized'});
    }
})
const checkIfUserExists = (username, callback) => {
    const db = createDbConnection();
    const query = 'SELECT * FROM users WHERE name = ?'
    return db.get(query, username, (err, user) => {
        if (err) {
            return callback(null, true)
        } else if (user) {
            return callback(null, true)
        } else {
            return callback(null, false)
        }
    });
}

const insertIntoDatabase = (user, callback) => {
    const saltRounds = 10;
    const db = createDbConnection();
    const registerQuery = 'INSERT INTO users (name,email,password,teacher, classRoom) VALUES (?,?,?,?,?)';

    bcrypt.hash(user.firstPass, saltRounds, (err, result) => {
        if (err) {
            return err.message;
        } else {
            db.run(registerQuery, [user.username, user.email, result, 0, user.username], function (err) {
                const token = createToken(user.username);
                const refreshToken = createRefreshToken(user.username)
                callback(null, token, refreshToken);
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
    return jwt.sign(payload, jwtsecretkey, {expiresIn: 10000});
}

const createRefreshToken = (name) => {
    const payload = {
        name: name
    }
    return jwt.sign(payload, refreshKey, {expiresIn: 50000});
}
module.exports = router;

