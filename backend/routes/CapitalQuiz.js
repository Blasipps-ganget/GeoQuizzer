// ID, USERID, ANTAL RÄTT, FEL SVAR, FÖRSÖKNR,  SAMMA FÖR ALLA QUIZ
const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Capital route is displaying data")
})
module.exports=router;