// ID, NAME, CAPITAL, REGION,

const express=require('express')
const router=express.Router()
module.exports=router;
express().use(express.json());



let currentList = [];

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
        if (answers[i] === currentList[i]) {
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

router.post("/result", express.json(),  (req, res) => {
    console.log(req.body.answers)
    const answers = req.body.answers;
    compareResults(answers);
    res.sendStatus(200);
})

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
    let shuffledList = shuffle(southAmericanCountries);
    currentList = shuffledList;
    return shuffledList;
}

function getNorthAmericaQuiz() {
    const northAmericanCountries = [
        "Canada", "USA", "Mexico", "Greenland",
        "Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras",
        "Nicaragua", "Panama", "The Bahamas",
        "Cuba",  "Dominican Republic",  "Haiti",
        "Jamaica", "Puerto Rico",

    ]
    let shuffledList = shuffle(northAmericanCountries);
    currentList = shuffledList;
    return shuffledList;
}

//  deleted Gambia,
function getAfricaQuiz() {
    const africanCountries = [
        "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso",
        "Burundi", "Cameroon", "Central African Republic", "Chad",
        "Democratic Republic of the Congo", "Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea",
        "Eritrea", "Swaziland", "Ethiopia", "Gabon",
        "Ghana", "Guinea", "Guinea Bissau", "Ivory Coast", "Kenya",
        "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi",
        "Mali", "Mauritania", "Morocco", "Mozambique",
        "Namibia", "Niger", "Nigeria", "Rwanda",
        "Senegal", "Sierra Leone", "Somalia", "Somaliland", "South Africa",
        "South Sudan", "Sudan", "United Republic of Tanzania", "Togo", "Tunisia", "Western Sahara",
        "Uganda", "Zambia", "Zimbabwe"
        ]
    let shuffledList = shuffle(africanCountries);
    currentList = shuffledList;
    return shuffledList;
}

// deleted Northern Cyprus
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
    let shuffledList = shuffle(europeanCountries);
    currentList = shuffledList;
    return shuffledList;
}

function getAsianQuiz() {
    const asianCountries = [
        "Afghanistan", "Armenia", "Azerbaijan", "Bangladesh",
        "Bhutan", "Brunei", "Cambodia", "China", "Cyprus",
        "Georgia", "India", "Indonesia", "Iran", "Iraq",
        "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait",
        "Kyrgyzstan", "Laos", "Lebanon", "Malaysia",
        "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman",
        "Pakistan", "Philippines", "Qatar", "Russia",
        "Saudi Arabia", "South Korea", "Sri Lanka", "Syria",
        "Taiwan", "Tajikistan", "Thailand", "Turkey", "Turkmenistan",
        "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
    ]
    let shuffledList = shuffle(asianCountries);
    currentList = shuffledList;
    return shuffledList;
}

function getOceaniaQuiz() {
    const oceaniaCountries = [
        "Australia", "Fiji", "New Zealand", "Papua New Guinea", "Solomon Islands", "Vanuatu"
    ]
    let shuffledList = shuffle(oceaniaCountries);
    currentList = shuffledList;
    return shuffledList;
}






