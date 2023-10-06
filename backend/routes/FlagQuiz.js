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
    const response = await fetch("https://restcountries.com/v3.1/name/Denmark");

    if (!response.ok) {
      throw new Error("Failed to fetch European countries");
    }
    const europeanCountries = await response.json();
    return europeanCountries.map((country) => country.flags.svg);
  } catch (error) {
    throw error;
  }
};

module.exports = router;
