// ID, USERID, ANTAL RÄTT, FEL SVAR, FÖRSÖKNR,  SAMMA FÖR ALLA QUIZ
const express = require("express");
const router = express.Router();
router.get("/getFlag", async (req, res) => {
  try {
    const worldCountries = await fetchCountryFlag();
    res.send(worldCountries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});


const fetchCountryFlag = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/europe");

  

    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const worldCountries = await response.json();

    const randomIndex = Math.floor(Math.random() * worldCountries.length);

    const flag = worldCountries[randomIndex].flags.svg;
    const name = worldCountries[randomIndex].name.common;
    const wrongAnswers = [];
    
    while (wrongAnswers.length < 3) {
      const randomWrongIndex = Math.floor(Math.random() * worldCountries.length);
      const randomWrongName = worldCountries[randomWrongIndex].name.common;
      if (randomWrongName !== name && !wrongAnswers.includes(randomWrongName)) {
        wrongAnswers.push(randomWrongName);
      }
    }

    const info = {
      land: name,
      flagurl: flag,
      felsvar: wrongAnswers
    };
    return info;
  } catch (error) {
    throw error;
  }
};




module.exports = router;