// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
module.exports=router;
express().use(express.json());

let currentQuiz = [];
const regions = {
    "europe": getEuropeCountries(),
    "asia": getAsianCountries(),
    "oceania": getOceaniaCountries(),
    "africa": getAfricaCountries(),
    "northAmerica": getNorthAmericaCountries(),
    "southAmerica": getSouthAmericaCountries()
};

router.post("/result", express.json(),  (req, res) => {
    console.log(req.body.answers)
    const answers = req.body.answers;
    compareResults(answers);
    res.sendStatus(200);
})

router.get("/:region", (req, res) => {
    const region = req.params.region;
    res.send(regions[region]);
});

router.get("/quiz/:region", (req, res) => {
    const region = req.params.region;
    res.send(getQuiz(region));
});

function getQuiz(region) {
    currentQuiz = shuffle(regions[region]);
    return currentQuiz;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function compareResults(answers) {
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let wrongAnswersList = [];
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === currentQuiz[i]) {
            correctAnswers++;
        }
        else {
            wrongAnswers++;
            wrongAnswersList.push(answers[i]);
        }
    }
    console.log("Correct answers: " + correctAnswers);
    console.log("Wrong answers: " + wrongAnswers);
    console.log("Wrong answers list: " + wrongAnswersList);

}

function getSouthAmericaCountries() {
    return [
        "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru",
        "Suriname", "Uruguay", "Venezuela", "Falkland Islands" ,"Trinidad and Tobago"
    ];
}

function getNorthAmericaCountries() {
    return [
        "Canada", "USA", "Mexico", "Greenland", "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
        "Nicaragua", "Panama", "The Bahamas", "Cuba",  "Dominican Republic",  "Haiti", "Jamaica", "Puerto Rico",
    ];
}

function getAfricaCountries() {
    //  deleted Gambia,
    return [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon",
        "Central African Republic", "Chad", "Democratic Republic of the Congo", "Republic of the Congo",
        "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Swaziland", "Ethiopia", "Gabon", "Ghana",
        "Guinea", "Guinea Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
        "Malawi", "Mali", "Mauritania", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda",
        "Senegal", "Sierra Leone", "Somalia", "Somaliland", "South Africa", "South Sudan", "Sudan",
        "United Republic of Tanzania", "Togo", "Tunisia", "Western Sahara", "Uganda", "Zambia", "Zimbabwe"
    ];
}

function getEuropeCountries() {
    // deleted Northern Cyprus
    return [
        "Albania", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia",
        "Cyprus", "Czech Republic", "Denmark", "Estonia", "England", "Finland", "France", "Germany",
        "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Lithuania",
        "Luxembourg", "Moldova", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania",
        "Republic of Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine" ,"Macedonia"
    ];
}

function getOceaniaCountries() {
    return ["Australia", "Fiji", "New Zealand", "Papua New Guinea", "Solomon Islands", "Vanuatu"];
}

function getAsianCountries() {
    return [
        "Afghanistan", "Armenia", "Azerbaijan", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China",
        "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
        "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
        "Pakistan", "Philippines", "Qatar", "Russia", "Saudi Arabia", "South Korea", "Sri Lanka", "Syria", "Taiwan",
        "Tajikistan", "Thailand", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ];
}











