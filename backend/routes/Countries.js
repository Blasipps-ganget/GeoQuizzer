// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("countries route is displaying data")
})
module.exports=router;
