const capitalQuizEndpoint = "http://localhost:8080/capitalquiz/"


export const fetchCapital = () => {
    return fetch(capitalQuizEndpoint + 'getCapital')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((capital) => {
            return capital;
        });
}
