//ID NAMN MAIL LÖSEN
const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("users route is displaying data")
})
module.exports=router;