const capitalQuizEndpoint = "http://localhost:8080/capitalquiz/"


export const fetchCapital = async (amount) => {

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
  