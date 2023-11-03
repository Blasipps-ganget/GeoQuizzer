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

export const fetchCountryFlag = async (nrOfQuestions, region) => {

  
    //  const resp = await fetch(`http://localhost:8080/capitalquiz/getCapitalQuestions/${nrOfQuestions}/${region}`,{
        
      //})

      //console.log(resp.json())

      const response = await fetch(`http://localhost:8080/flagquiz/getFlagQuestions/${nrOfQuestions}/${region}`);
    
      
    
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      
      const worldCountries = await response.json();
      console.log(worldCountries)
      const result = []
      for(let index = 0; index < worldCountries.length; index++ ){
        const info = {
          land: worldCountries[index].name,
          flagurl: worldCountries[index].flagUrl,
          felsvar: worldCountries[index].wrongAnswers
        };
          result.push(info)
      }
      
      return result;
    } 

/*     const infoToReturn = [{
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
            land: "Denmark",
            flagUrl: "https://flagcdn.com/dk.svg",
            felsvar: ["Sweden", "Finland", "China"]
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

          return infoToReturn; */
    /*return fetch(flagQuizEndpoint + 'getflag')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((flag) => {
            return flag;
        });

    */