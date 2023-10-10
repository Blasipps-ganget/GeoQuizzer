// ID, USERID, ANTAL RÄTT, FEL SVAR, FÖRSÖKNR,  SAMMA FÖR ALLA QUIZ

const express = require("express");
const router = express.Router();
router.get("/getFlag", async (req, res) => {
  try {
    const europeanCountries = await fetchCountryFlag();
    res.send(europeanCountries);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const fetchCountryFlag = async (namn) => {
  try {
//    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");
      const response = await fetch("https://restcountries.com/v3.1/region/asia");

    if (!response.ok) {
      throw new Error("Failed to fetch European countries");
    }
    const europeanCountries = await response.json();

    const randomIndex = Math.floor(Math.random() * europeanCountries.length);

    const flag = europeanCountries[randomIndex].flags.svg;
    const name = europeanCountries[randomIndex].name.common;
    
    const info ={
      flagga: flag,
      namn: name
    }
    console.log(flag);
    console.log(name);
    return info
  } catch (error) {
    throw error;
  }
};

module.exports = router;
