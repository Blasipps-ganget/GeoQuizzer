const express = require("express");
const router = express.Router();
//const db = require('../database/geoquizzer.db');






// få information om ett specifikt klassrum för att displaya relevant information
router.get("/getClassroom", async (req, res) => {
    const name = ''//getNameFromToken(req);

    const classroomData = [];



    try {

        const query = 'SELECT classroomName FROM users WHERE name = ? ';
        db.get(query,name, (err,row) => {

            if(err) {

                console.error("Error with query", err)
            }
            if(!row){

                console.error("Classroom not found")

        }
            const classRoomName = '';


            const query2 = 'SELECT * from classRoom WHERE name = ?'
            db.all(query2, classRoomName, (err, res) =>  {
                if (err) {
                    console.error("Error with query",err)
                }

                res.send(classroomData);
            });

            });

    } catch (err) {

        console.error("Error",err);
    }


    //HÄMTA KLASSRUMS NAMN FRÅN USERS
    //     HÄMTA ALLA SOM HAR KLASSRUM NAMN I CLASSROOM databas
});


// få klassrumsnamnet som tillhör den user och sedan konstruera en invitelink där vi använder det klassrumsnamnet.
router.get("/getClassroomInvite", (req, res) => {


    const userName = 'Anton'//getNameFromToken

    let inviteLink = `http://localhost:5173/join/`;

    // const query = 'SELECT classRoomName FROM users WHERE name = ?'
    //
    // db.get(query,userName, (err, name) => {
    //
    //     if (err) {
    //
    //         console.error("Error with query", err)
    //     } else {
    //
    //         inviteLink += name;
    //         res.send(inviteLink);
    //     }
    //
    //
    // })

const classroomName = 'TestClassroom'
    inviteLink += classroomName;
res.send(inviteLink);



});



router.post("/joinClassroomInvite", (req,res) => {



    //logik för att verifiera koden eller klassrumsinformationen och sen lägga till eleven i det klassrummet om allting stämmer

  const  { userName, classRoomName} = req.body;

  const query = 'UPDATE classRoom SET userId = (SELECT id FROM users WHERE name = ?) WHERE classRoomName = ? '

   db.run(query, [userName,classRoomName], (err) => {

       if(err) {

           console.error("Error joining classroom", err)
           res.status(500).send("Error joining the classroom")
       } else  {

           res.send("King bro, you have joined the classroom")
       }

   });
});










module.exports = router;