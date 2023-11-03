const express = require("express");
const router = express.Router();
const dbPath = './backend/database/geoquizzer.db';
const sqlite3 = require('sqlite3');




router.post("/createComments", async (req, res) => {

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);
    const { user_name, commented_name, comment, date} = req.body;
    console.log("Received comment:",{user_name, commented_name, comment, date});

    const query2 = 'SELECT id FROM users WHERE name = ?';

    Promise.all([

        getId(db,query2,user_name),
        getId(db,query2,commented_name)


    ]).then(([user_id, commented_id]) => {

        // const {user_id:  }
        const query = "INSERT INTO comments (user_id, commented_id, comment, date) VALUES  (?,?,?,?)";
        db.run(query, [user_id.id, commented_id.id, comment, date], (err) => {


            err ? console.log(err.message) : console.log("Comment successfully received!");

        })
    })

    // const { user_id, commented_id, comment, date} = req.body;
    // console.log("Received comment:",{user_id, commented_id, comment, date});
    //
    // res.send("Comment successfully received!")

});

function getId(db,query,name) {

    return new Promise((resolve, reject) => {

        db.get(query,name, (err,result) => {

            if(err) {

                reject(err);
            } else {

                resolve(result);
            }

        })


    })

}

router.get("/getComments/:name", async (req, res ) => {

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE);

    const {name} = req.params;

    console.log("name",name);

    const query = " SELECT users.name AS username, comments.comment FROM comments JOIN users ON comments.commented_id = users.id WHERE user_id = (SELECT id FROM users WHERE name = ?) "

   db.all(query,name,(err,result) => {

       if(err) {

           console.error("Error fetching comments", err);
       } else  {
            console.log('res',result)
           res.send(result)
       }

   });



})


module.exports=router;
