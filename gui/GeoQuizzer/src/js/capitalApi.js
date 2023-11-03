
import{handleToken} from '@/js/userApi'

export const postCapitalResult = async (correctAnswers, guesses) => {
const accessToken = await handleToken()
  

await fetch(`http://localhost:8080/capitalquiz/postResult`, {
    
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


export const fetchCapital = async () => {

    const infoToReturn = [{
        capital: "Stockholm",
        land: "Sweden",
        flagUrl: "https://mainfacts.com/media/images/coats_of_arms/se.svg",
        felsvar: ["Denmark", "Finland", "China"]
      },{
        capital: "Cophenhagen",
        land: "Denmark",
        flagUrl: "https://mainfacts.com/media/images/coats_of_arms/dk.svg",
        felsvar: ["Sweden", "Finland", "China"]
      }, {
        capital: "OSLO",
        land: "Norway",
        flagUrl: "https://mainfacts.com/media/images/coats_of_arms/no.svg",
        felsvar: ["Sweden", "Uzbekistan", "China"]
      }]
  
      return infoToReturn;
/*    try {
      const response = await fetch(capitalQuizEndpoint + `getCapitalamount=${amount}`);
      
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      
      const capital = await response.json();                
      return capital;
    } catch (error) {
      console.error("Error fetching capital:", error);
      throw error; // Rethrow the error for handling in your component
  ^
  }
  */
  };