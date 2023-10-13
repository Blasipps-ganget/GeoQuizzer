// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
module.exports=router;


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

router.get("/:region", (req, res) => {
const region = req.params.region;

    if (region === "europe") res.send(getEuropeQuiz());
    else if (region === "asia") res.send(getAsianQuiz());
    else if (region === "oceania") res.send(getOceaniaQuiz());
    else if (region === "africa") res.send(getAfricaQuiz());
    else if (region === "northAmerica") res.send(getNorthAmericaQuiz());
    else if (region === "southAmerica") res.send(getSouthAmericaQuiz());

});

function getSouthAmericaQuiz() {
    const southAmericanCountries = [
        "Argentina", "Bolivia", "Brazil", "Chile", "Colombia",
        "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname",
        "Uruguay", "Venezuela", "Falkland Islands" ,"Trinidad and Tobago"
    ]

    return shuffle(southAmericanCountries);
}

function getNorthAmericaQuiz() {
    const northAmericanCountries = [
        "Canada", "USA", "Mexico", "Greenland",
        "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
        "Nicaragua", "Panama", "Antigua and Barbuda", "Bahamas", "Barbados",
        "Cuba", "Dominica", "Dominican Republic", "Grenada", "Haiti",
        "Jamaica", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines",
        "Trinidad and Tobago"
    ]
    return shuffle(northAmericanCountries);
}

function getAfricaQuiz() {
    const africanCountries = [
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
        ]
    return shuffle(africanCountries);
}


function getEuropeQuiz() {
    const europeanCountries = [
        "Albania", "Austria",
        "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
        "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "England",
        "Finland", "France", "Germany", "Greece",
        "Hungary", "Iceland", "Ireland", "Italy",
        "Kosovo", "Latvia", "Lithuania", "Luxembourg",
        "Moldova", "Montenegro", "Netherlands",
        "Norway", "Poland", "Portugal", "Romania",
        "Republic of Serbia", "Slovakia", "Slovenia",
        "Spain", "Sweden", "Switzerland", "Ukraine" ,"Macedonia"
    ];
    return shuffle(europeanCountries);
}

function getAsianQuiz() {
    const asianCountries = [
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
    ]
    return shuffle(asianCountries);
}

function getOceaniaQuiz() {
    const oceaniaCountries = [
        "Australia", "Fiji", "New Zealand", "Papua New Guinea", "Solomon Islands", "Vanuatu"
    ]
    return shuffle(oceaniaCountries);
}






