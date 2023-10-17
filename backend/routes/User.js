//ID NAMN MAIL LÖSEN
const express=require('express')
const {loginUser} = require("../database/db");
const router=express.Router()
router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const correctCredentials = checkIfCorrectCredentials(username,password)
    console.log(username, password)

    res.send(correctCredentials);
})

router.post("/signup",(req,res)=>{
    const username = req.body.username;
    console.log("FROM SIGNUP")
    console.log(req.body)
    loginUser(username)
    try{
        loginUser(username)
        if(checkIfUserExists())
            return res.send("User Already exists")

        //registerUser()
    } catch(err){
        return res.send(err.message)
    }


    res.send(false)
})
const checkIfCorrectCredentials = (username, password) => {
    return true;
}
router.post("/getToken",(req,res)=>{
    const username = req.body.username;

    res.send(getToken(username));
})
const getToken = (username) => {
    return "TOKEN";
}
module.exports = router;