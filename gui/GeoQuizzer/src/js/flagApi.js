import {handleToken} from '@/js/userApi'

export const postFlagResult = async (correctAnswers, guesses,region) => {
    const accessToken = await handleToken()

    await fetch(`http://localhost:8080/flagquiz/postResult`, {
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

export const fetchCountryFlag = async (nrOfQuestions, region) => {
    const response = await fetch(`http://localhost:8080/flagquiz/getFlagQuestions/${nrOfQuestions}/${region}`);

    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }

    const worldCountries = await response.json();
    const result = []
    for (let index = 0; index < worldCountries.length; index++) {
        const info = {
            land: worldCountries[index].name,
            flagurl: worldCountries[index].flagUrl,
            felsvar: worldCountries[index].wrongAnswers
        };
        result.push(info)
    }
    return result;
}
