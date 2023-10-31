const express = require('express');
const router = express.Router();
const Agent = require('undici').Agent;

router.get("/getCapital", async (req, res) => {
  const db = new Db();
  try {
    const quizData = [];
    const query = ('SELECT name from regions WHERE name = ? LIMIT 10')
    const region = req.body();
    db.all(query, region, (err, result)=>{
      if(err)
        console.log(err)

      if(result){
        const response = result.map((land) => fetch("https://restcountries/v3.1/name/"+ land+"?fields=capital,coatOfArms,name"))

      }
    })
    const numberOfCapitals = req.query.amount;
    console.log("amount", req.query.amount);
    
    for (let i = 0; i < numberOfCapitals; i++) {
      const capitalData = await fetchCapital();
      quizData.push(capitalData);
    }
    const d =[]
    response.map((data) => d.push{capital: data.capital, land: } )
    const infoToReturn = [{
      capital: "Stockholm",
      land: "Sweden",
      flagUrl: "https://mainfacts.com/media/images/coats_of_arms/se.svg",
      felsvar: ["Denmark", "Finland", "China"]
    }

    const query = ('')
    db.all(query, )
    res.send(quizData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});




const fetchCapital = async () => {
  /*try {
   const response = await fetch("https://restcountries.com/v3.1/region/europe", {
  dispatcher: new Agent({ connectTimeout: 100000 })
  });

    if (!response.ok) {
      console.error("error", response)
      throw new Error("Failed to fetch capitals");
    }
    const WorldCapitals = await response.json();
    const randomIndex = Math.floor(Math.random() * WorldCapitals.length);

    const capitalName = WorldCapitals[randomIndex].capital;
    const name = WorldCapitals[randomIndex].name.common;
    const flag = WorldCapitals[randomIndex].coatOfArms.svg;
    const wrongAnswers = [];

    while (wrongAnswers.length < 3) {
      const randomWrongIndex = Math.floor(Math.random() * WorldCapitals.length);
      const randomWrongName = WorldCapitals[randomWrongIndex].name.common;
      if (randomWrongName !== capitalName && !wrongAnswers.includes(randomWrongName)) {
        wrongAnswers.push(randomWrongName);
      }
    }
*/
    const info = {
      capital: capitalName,
      land: name,
      flagurl: flag,
      felsvar: wrongAnswers
    };

    const infoToReturn = [{
      capital: "Stockholm",
      land: "Sweden",
      flagUrl: "https://mainfacts.com/media/images/coats_of_arms/se.svg",
      felsvar: ["Denmark", "Finland", "China"]
    },{
      capital: "Cophenhagen",
      land: "Denmark",
      flagUrl: "https://mainfacts.com/media/images/coats_of_arms/dk.svg",
      felsvar: ["Sweden", "Finland", "China"]
    }]

    return infoToReturn;
  } catch (error) {
    console.error(error)
    throw error;
  };

module.exports = router;