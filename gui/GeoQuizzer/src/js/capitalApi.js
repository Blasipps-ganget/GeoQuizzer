import {handleToken} from '@/js/userApi'

export const postCapitalResult = async (correctAnswers, guesses, region) => {
    const accessToken = await handleToken()
    await fetch(`http://localhost:8080/capitalquiz/postResult`, {
        headers: {
            'Content-Type': 'application/json'
            , 'Authorization': `Bearer ${accessToken}`
        },
        method: 'POST',
        body: JSON.stringify({
            questions: correctAnswers,
            answers: guesses,
            region: region
        }),
    });
}

export const fetchCapital = async (nrOfQuestions, region) => {
    const response = await fetch(`http://localhost:8080/capitalquiz/getCapitalQuestions/${nrOfQuestions}/${region}`);

    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }
    const worldCountries = await response.json();
    const result = []
    for (let index = 0; index < worldCountries.data.length; index++) {
        const info = {
            land: worldCountries.data[index].name,
            flagurl: worldCountries.data[index].flagUrl,
            felsvar: worldCountries.data[index].wrongAnswers,
            capital: worldCountries.data[index].capital
        };
        result.push(info)
    }
    return {data: result, amount: worldCountries.amount}
}