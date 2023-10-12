// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
module.exports=router;


router.get("/europe", (req, res) => res.send([
    "Albania", "Austria",
    "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
    "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "England",
    "Finland", "France", "Germany", "Greece",
    "Hungary", "Iceland", "Ireland", "Italy",
    "Kosovo", "Latvia", "Lithuania", "Luxembourg",
    "Moldova", "Montenegro", "Netherlands",
    "Norway", "Poland", "Portugal", "Romania",
    "Republic of Serbia", "Slovakia", "Slovenia",
    "Spain", "Sweden", "Switzerland", "Ukraine"
]));

router.get("/asia", (req, res) => res.send([
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh",
    "Bhutan", "Brunei", "Cambodia", "China", "Cyprus",
    "Georgia", "India", "Indonesia", "Iran", "Iraq",
    "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
    "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives",
    "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
    "Pakistan", "Palestine", "Philippines", "Qatar", "Russia",
    "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria",
    "Taiwan", "Tajikistan", "Thailand", "Turkey", "Turkmenistan",
    "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
]));

router.get("/oceania", (req, res) => res.send([
    "Australia", "Fiji", "New Zealand", "Papua New Guinea", "Solomon Islands", "Vanuatu"
]));

router.get("/northAmerica", (req, res) => res.send([
    "Canada", "USA", "Mexico", "Greenland",
    "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
    "Nicaragua", "Panama", "Antigua and Barbuda", "Bahamas", "Barbados",
    "Cuba", "Dominica", "Dominican Republic", "Grenada", "Haiti",
    "Jamaica", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
    "Trinidad and Tobago"
]));

router.get("/southAmerica", (req, res) => res.send([
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia",
    "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname",
    "Uruguay", "Venezuela", "Falkland Islands"
]));




router.get("/africa", (req, res) => res.send([
    "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
    "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad",
    "Comoros", "Democratic Republic of the Congo", "Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea",
    "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
    "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya",
    "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
    "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
    "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe",
    "Senegal", "Seychelles", "Sierra Leone", "Somalia", "Somaliland", "South Africa",
    "South Sudan", "Sudan", "United Republic of Tanzania", "Togo", "Tunisia", "Western Sahara",
    "Uganda", "Zambia", "Zimbabwe"
]));










// router.get("/europe",async (req, res) => {
//     try {
//         const europeanCountries = await fetchEuropeanCountries();
//         res.send(europeanCountries);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// })

// const fetchEuropeanCountries = async () => {
//     try {
//         const response = await fetch('https://restcountries.com/v3.1/region/europe?fields=name');
//
//         if (!response.ok) {
//             throw new Error('Failed to fetch European countries');
//         }
//         const europeanCountries = await response.json();
//         return europeanCountries.map(country => country.name.common);
//     } catch (error) {
//         throw error;
//     }
// };




