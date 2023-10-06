
//const countryQuizEndpoint = "http://localhost:8080/countryquiz/"
//const capitalQuizEndpoint = "http://localhost:8080/capitalquiz/"
const countriesEndpoint = "http://localhost:8080/countries/"
//const flagQuizEndpoint = "http://localhost:8080/flagquiz/"
//const userEndpoint = "http://localhost:8080/user/"

export const fetchEuropeanCountries = () =>{
    return fetchCountriesByRegion('europe')
}
export const fetchAsianCountries = () =>{
    return fetchCountriesByRegion('asia')
}
export const fetchAmericanCountries = () =>{
    return fetchCountriesByRegion('america')
}
export const fetchAfricanCountries = () =>{
    return fetchCountriesByRegion('africa')
}
export const fetchOceanianCountries = () =>{
    return fetchCountriesByRegion('oceania')
}

export const fetchCountriesByRegion = (region) => {
    return fetch(countriesEndpoint + region)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((europeanCountries) => {
            return europeanCountries;
        });
}
