const express = require("express");
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbPath = './backend/database/geoquizzer.db'
/*
   const getCountryData = 'SELECT\n' +
        '  regions.name AS regionName,\n' +
        '  MAX(countryquiz.points) AS highestPoints\n' +
        ' countryquiz.max_points AS highest'
    'FROM regions\n' +
    'LEFT JOIN countries ON regions.id = countries.region_id\n' +
    'LEFT JOIN countryquiz ON countries.id = countryquiz.region_id\n' +
    'WHERE countryquiz.user_id = ?\n' +
    'GROUP BY regions.name;'

 */
router.get("/getClassroom", async (req, res) => {
    console.log("ERR?")
    const name = 'xx' //getNameFromToken(req);
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const getCountryData = 'SELECT\n' +
        'regions.name AS regionName,\n' +
        'MAX(countryquiz.points) AS highestCountryPoints\n' +
        'countryquiz.max_points AS highest' +
        'FROM regions\n' +
        'LEFT JOIN countries ON regions.id = countries.region_id\n' +
        'LEFT JOIN countryquiz ON countries.id = countryquiz.region_id\n' +
        'WHERE countryquiz.user_id = ?\n' +
        'GROUP BY regions.name;'
    try {
        const query = 'SELECT * FROM users WHERE name = ? ';
        db.get(query, name, (err, user) => {

            if (err) {
                console.error("Error with query1", err)
                return res.status(500).send("Internal Server Error - db.getQUERY")
            }

            if (user) {
                console.log('classRoom', user)
                const currentClassRoom = user.classRoom;
                console.log(currentClassRoom)

                const userid = 19;

                db.all(getCountryData, userid, (err, result) => {
                    if (err) {
                        return res.status(500).send("internal server error - regions")
                    }

                    if (result) {
                        console.log('res2', result)
                        //  const flagQuery = 'SELECT regions.name AS regionName, MAX(flagquiz.points) AS points FROM flagquiz JOIN countries ON flagquiz.region_id = countries.id JOIN regions ON countries.region_id = regions.id WHERE flagquiz.user_id = ? GROUP BY regions.name;'
                        const countryquiz = 'SELECT\n' +
                            '  regions.name AS regionName,\n' +
                            '  MAX(countryquiz.points) AS highestPoints\n' +
                            '  countryquiz.max_points AS totalPoints' +
                            '  FROM\n' +
                            '  regions\n' +
                            '  LEFT JOIN\n' +
                            '  countryquiz ON regions.id = countryquiz.region_id\n' + 'WHERE user_id = ?' +
                            '  GROUP BY\n' +
                            '  regions.name;\n'

                        db.all(countryquiz, userid, (err, result) => {
                            if (err) {
                                console.log('e', err)
                            }
                            if (result) {
                                result.forEach((result) => {
                                    console.log(result);
                                });
                                console.log('s', result)
                            }
                        })
                        db.all(query3, currentClassRoom, (err, students) => {
                            if (err) {
                                console.error("Error with query2", err)
                            }
                            if (students) {
                                console.log('res', students)

                                return res.status(200).send({currentClassRoom, students})
                            }
                        });
                    }
                })
            }
        });

    } catch (err) {

        console.error("Error", err);
    }

});


router.get("/getClassroomInvite", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    let inviteLink = `http://localhost:8080/classroom/join/`;
    const name = 'test' //getName();
    const query = 'SELECT classRoom FROM users WHERE name = ?'
    db.get(query, name, (err, result) => {
        if (err) {
            console.log('err1', err);
            res.status(500).send("ERROR TYVÄRR");
        }
        if (result) {
            console.log('res är ', result)
            inviteLink += result.classRoom;
            res.status(200).send(inviteLink);
        }
    })
});


router.post("/join/:link", (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const {link} = req.params;
    const name = 'xx' //getName()
    const query2 = 'UPDATE users SET classRoom = ? WHERE name = ?'
    db.run(query2, [link, name], (err) => {
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

module.exports = router;