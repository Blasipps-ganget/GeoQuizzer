const express=require('express')
const router=express.Router()
const cors = require('cors');
const app=express();
const PORT=8080

const capitalQuizRoute = require('./routes/CapitalQuiz')
const countriesRoute = require('./routes/Countries')
const countryQuizRoute = require('./routes/CountryQuiz')
const flagQuizRoute = require('./routes/FlagQuiz')
const userRoute = require('./routes/User')


app.listen(PORT, () => console.log(serverStartUpMessage));
app.use(cors())
app.use("/capitalquiz", capitalQuizRoute);
app.use("/flagquiz", flagQuizRoute);
app.use("/countryquiz", countryQuizRoute);
app.use("/countries", countriesRoute);
app.use("/user", userRoute);
router.get("/", (req,res)=>{
    res.send( 'Content-Type', 'application/json');
})

module.exports=router;






let response ={
    country: "Sweden",
    flagUrl: "https://flagcdn.com/w320/se.png",
    wrongAnswers: ["Finland", "Norway", "Belgium"]

}




const serverStartUpMessage = ( `    _____                              _                                               
  / ____|                            (_)                                              
 | |  __   ___   ___     __ _  _   _  _  ____ ____ ___  _ __                          
 | | |_ | / _ \\ / _ \\   / _\` || | | || ||_  /|_  // _ \\| '__|                         
 | |__| ||  __/| (_) | | (_| || |_| || | / /  / /|  __/| |                            
  \\_____| \\___| \\___/ _ \\__, | \\__,_||_|/___|/___|\\___||_|            _             _ 
 | |                 | | __/ |             | |      | |              | |           | |
 | |__    __ _   ___ | ||___/__  _ __    __| |  ___ | |_  __ _  _ __ | |_  ___   __| |
 | '_ \\  / _\` | / __|| |/ // _ \\| '_ \\  / _\` | / __|| __|/ _\` || '__|| __|/ _ \\ / _\` |
 | |_) || (_| || (__ |   <|  __/| | | || (_| | \\__ \\| |_| (_| || |   | |_|  __/| (_| |
 |_.__/  \\__,_| \\___||_|\\_\\\\___||_| |_| \\__,_| |___/ \\__|\\__,_||_|    \\__|\\___| \\__,_|
                                                                                      
                                                                                       `);

