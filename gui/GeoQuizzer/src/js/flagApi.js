const flagQuizEndpoint = "http://localhost:8080/flagquiz/"


export const fetchCountryFlag = () => {
    return fetch(flagQuizEndpoint + 'getflag')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((flag) => {
            return flag;
        });
}
