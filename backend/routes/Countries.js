// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
router.get("/europe",async (req, res) => {
    try {
        const europeanCountries = await fetchEuropeanCountries();
        res.send(europeanCountries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
})

const fetchEuropeanCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name');

        if (!response.ok) {
            throw new Error('Failed to fetch European countries');
        }
        const europeanCountries = await response.json();
        return europeanCountries.map(country => country.name.common);
    } catch (error) {
        throw error;
    }
};

module.exports=router;

