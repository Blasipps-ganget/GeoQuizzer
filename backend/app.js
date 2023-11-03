const express=require('express')
const router=express.Router()
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app=express();
const PORT=8080

const capitalQuizRoute = require('./routes/CapitalQuiz')
const countriesRoute = require('./routes/Countries')
const countryQuizRoute = require('./routes/CountryQuiz')
const flagQuizRoute = require('./routes/FlagQuiz')
const userRoute = require('./routes/User')
const highScoreRoute = require('./routes/HighScores')
require('./database/db');
const classroomRoute = require('./routes/Classroom')
const profileRoute = require('./routes/Profile')
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const {resolve} = require("path");
dotenv.config({path: resolve(__dirname, '../.env')})
const jwtsecretkey = process.env.JWT_SECRET_KEY;


app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use("/user", userRoute);
app.use("/classroom", classroomRoute);
app.use(authenticateToken)
app.use("/capitalquiz", capitalQuizRoute);
app.use("/flagquiz", flagQuizRoute);
app.use("/countryquiz", countryQuizRoute);
app.use("/countries", countriesRoute);
app.use("/countries", countriesRoute);
app.use("/userProfile", profileRoute);

app.listen(PORT, () => console.log(serverStartUpMessage));

app.use("/highscores", highScoreRoute);


router.get("/", (req, res) => {
    res.send('Content-Type', 'application/json');

});

const serverStartUpMessage = (`    _____                              _                                               
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

module.exports = router;
function authenticateToken(req, res, next) {
    if(req.method === 'POST'){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, jwtsecretkey, (err, user) => {
        console.log("err")
        if (err){
            console.log("error", err)
            return res.sendStatus(403)
        }
        console.log('user', user)
        next()
    });
    }
    next();
}