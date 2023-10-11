//ID NAMN MAIL LÖSEN
const express=require('express')
const router=express.Router()
router.post("/login",(req,res)=>{

    res.send(true);
})

router.post("/signup",(req,res)=>{
    res.send(false)
})
module.exports=router;