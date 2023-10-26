// ID, USERID, ANTAL RÄTT, FEL SVAR, FÖRSÖKNR,  SAMMA FÖR ALLA QUIZ
const express=require('express');
const router=express.Router();
router.get("/getCapital", async (req,res) => {
    try {
    const WorldCapitals = await fetchCapital();
    res.send(WorldCapitals);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

const fetchCapital = async () => {
    try {
       const response = await fetch("https://restcountries.com/v3.1/region/europe");

        if (!response.ok) {
            throw new Error ("Failed to fetch capitals");
        }
        const WorldCapitals = await response.json();

        const randomIndex = Math.floor(Math.random() * WorldCapitals.length);
        

        const capitalName = WorldCapitals[randomIndex].capital;
        const name = WorldCapitals[randomIndex].name.common;
        const flag = WorldCapitals[randomIndex].coatOfArms.svg;
        const capital = await fetch ("https://restcountries.com/v3.1/capital/" + capitalName);
        console.log(capitalName);
        console.log(capital);
        const wrongAnswers = [];

        while (wrongAnswers.length < 3) {
            const randomWrongIndex = Math.floor(Math.random() * WorldCapitals.length);
            const randomWrongName = WorldCapitals[randomWrongIndex].name.common;
            if (randomWrongName !== capitalName && !wrongAnswers.includes(randomWrongName)) {
              wrongAnswers.push(randomWrongName);
            }
          }
      
          const info = {
            capital: capitalName,
            land: name,
            flagurl: flag,
          //  flagurl: fetch ("https://restcountries.com/v3.1/capital/" + capitalName),
            felsvar: wrongAnswers
          };
          console.log(info);
          return info;
        } catch (error) {
          throw error;
    }
};
module.exports=router;