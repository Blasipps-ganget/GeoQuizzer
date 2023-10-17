//ID NAMN MAIL LÖSEN
const express=require('express')
const router=express.Router()
router.post("/login",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const correctCredentials = checkIfCorrectCredentials(username,password)
    console.log(username, password)

    res.send(correctCredentials);
})

router.post("/signup",(req,res)=>{

    res.send(false)
})
const checkIfCorrectCredentials = (username, password) => {
    return true;

}
module.exports = router;