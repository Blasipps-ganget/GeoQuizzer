const flagQuizEndpoint = "http://localhost:8080/flagquiz/"


export const fetchCountryFlag = async (amount) => {

    const infoToReturn = [{
        capital: "",
            land: "Sweden",
            flagUrl: "https://mainfacts.com/media/images/coats_of_arms/se.svg",
            felsvar: ["Denmark", "Finland", "China"]
          },{
            capital: "",
            land: "Denmark",
            flagUrl: "https://mainfacts.com/media/images/coats_of_arms/dk.svg",
            felsvar: ["Sweden", "Finland", "China"]
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