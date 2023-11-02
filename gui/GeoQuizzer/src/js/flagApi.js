import{handleToken} from '@/js/userApi'

export const postFlagResult = async (correctAnswers, guesses) => {
const accessToken = await handleToken()

await fetch(`http://localhost:8080/flagquiz/postResult`, {
    
headers: {
      'Content-Type': 'application/json'
      ,'Authorization': `Bearer ${accessToken}`
    },
    method: 'POST',
    body: JSON.stringify({
      questions: correctAnswers,
      answers: guesses,
      region: "EUROPE"
    }),
  });

}

export const fetchCountryFlag = async () => {

    const infoToReturn = [{
            capital: "",
            land: "Sweden",
            flagUrl: "https://flagcdn.com/se.svg",
            felsvar: ["Denmark", "Finland", "China"]
          },{
            capital: "",
            land: "Denmark",
            flagUrl: "https://flagcdn.com/dk.svg",
            felsvar: ["Sweden", "Finland", "China"]
          },{
            capital: "",
            land: "Norway",
            flagUrl: "https://flagcdn.com/no.svg",
            felsvar: ["Sweden", "Finland", "Uzbekistan"]
          }]

          return infoToReturn;
    /*return fetch(flagQuizEndpoint + 'getflag')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((flag) => {
            return flag;
        });

    */

    };