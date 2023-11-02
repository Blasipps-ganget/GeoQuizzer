const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbPath = './backend/database/geoquizzer.db'

router.get("/getStudentsInClassRoom/:name", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const {name} = req.params;
    console.log("NAS;D", name)
    const query = 'SELECT classroom FROM users WHERE name = ?'
    db.get(query, name, (err, result) => {
        if (err) res.status(500).send("Internal Server Error")
        if (result) {
            console.log("RE",result)
            const query2 = 'SELECT name FROM users WHERE classroom = ?'
            db.all(query2, result.classRoom, (err, result2) => {
                console.log("res",result2)
                res.status(200).send({owner: result.classRoom, students: result2})
            })
        }
    })
})

router.get("/getClassroom/:name", async (req, res) => {
    const name = req.params.name
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    console.log(name)
    const countryquiz = 'SELECT regions.name AS regionName, COUNT(countries.id) AS countryCount, MAX(IFNULL(countryquiz.points, 0)) AS highestPoints\n' +
        'FROM regions\n' +
        'LEFT JOIN countries ON regions.id = countries.region_id\n' +
        'LEFT JOIN countryquiz ON regions.id = countryquiz.region_id AND countryquiz.user_id = (SELECT id FROM users WHERE name = ?)\n' +
        'GROUP BY regions.name;\n'
    const flagquizQuery = 'SELECT regions.name AS regionName, COUNT(countries.id) AS countryCount, MAX(IFNULL(flagquiz.points,0)) AS highestPoints\n' +
        'FROM regions\n' +
        'LEFT JOIN countries ON regions.id = countries.region_id\n' +
        'LEFT JOIN flagquiz ON regions.id = flagquiz.region_id AND flagquiz.user_id = (SELECT id FROM users WHERE name = ?)\n' +
        'GROUP BY regions.name;\n'
    const capitalquizQuery = 'SELECT regions.name AS regionName, COUNT(countries.id) AS countryCount, MAX(capitalquiz.points) AS highestPoints\n' +
        'FROM regions\n' +
        'LEFT JOIN countries ON regions.id = countries.region_id\n' +
        'LEFT JOIN capitalquiz ON regions.id = capitalquiz.region_id AND capitalquiz.user_id = (SELECT id FROM users WHERE name = ?)\n' +
        'GROUP BY regions.name;\n'

    let result = {
        username: name,
        totalCountry: 0,
        totalFlag: 0,
        totalCapital: 0,
    }
    Promise.all([
        fetchCountryQuizData(db, countryquiz, name),
        fetchFlagCapitalQuizData(db, flagquizQuery, name),
        fetchFlagCapitalQuizData(db, capitalquizQuery, name)
    ]).then(([countryQuizData, flagData, capitalData]) => {
        const {userPoints: userPointsCountry, totalPoints: totalPointsCountry} = countryQuizData;
        const {userPoints: userPointsFlag, totalPoints: totalPointsFlag} = flagData;
        const {userPoints: userPointsCapital, totalPoints: totalPointsCapital} = capitalData;

        result.totalCountry = Math.trunc((userPointsCountry / totalPointsCountry) * 100);
        result.totalFlag = Math.trunc((userPointsFlag / totalPointsFlag) * 100);
        result.totalCapital = Math.trunc((userPointsCapital / totalPointsCapital) * 100);
        res.send(result);
    })
        .catch(error => {
            res.status(500).send("Internal Server Error");
        });

});

function fetchCountryQuizData(db, countryQuery, name) {
    return new Promise((resolve, reject) => {
        db.all(countryQuery, name, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let userPoints = 0;
                let totalPoints = 0;
                result.forEach((res) => {
                    if (res.highestPoints) {
                        userPoints += res.highestPoints;
                    }
                    totalPoints += res.countryCount;
                });
                resolve({userPoints, totalPoints});
            }
        });
    });
}

function fetchFlagCapitalQuizData(db, query, name) {
    return new Promise((resolve, reject) => {
        db.all(query, name, (err, result) => {
            if (err) {
                reject(err);
            } else {
                let userPoints = 0;
                let totalPoints = 0;
                result.forEach((res) => {
                    if (res.highestPoints) {
                        userPoints += res.highestPoints;
                    }
                    if (res.countryCount <= 30) {
                        totalPoints += res.countryCount;
                    } else {
                        totalPoints += 30;
                    }
                });
                resolve({userPoints, totalPoints});
            }
        })
    })
}

router.get("/getClassroomInvite/:name", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    let inviteLink = `http://localhost:5173/joinclass/`;

    const {name } = req.params;

    const query = 'SELECT classRoom FROM users WHERE name = ?'
    if (name) {
        db.get(query, name, (err, result) => {
            if (err) {
                res.status(500).send("Internal Server Error");
            }
            if (result) {
                inviteLink += result.classRoom;
                res.status(200).send(inviteLink);
            }
        })
    } else {
        res.status(500).send("Internal Server Error");
    }
});


router.get("/joinclass/:link/:name", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const {link, name } = req.params;
    const query2 = 'UPDATE users SET classRoom = ? WHERE name = ?'
    db.run(query2, link, name, (err) => {
        if (err) {
            console.error("Error joining classroom", err)
            res.status(500).send("Error joining the classroom")
        } else {
            res.status(200).send("King bro, you have joined the classroom")
        }
    });
});

router.post("/removeStudent", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const name = req.body.userName;
    const query = ('UPDATE users SET classRoom = ? WHERE name = ?')
    db.run(query, name, name, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("server error");
        }
        if (result) {
            console.log(result)
            console.log("successfully updated")
            res.status(200).send("done")
        }
    })
})
const getNameFromToken = (req) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return payload.name;
}

module.exports = router;