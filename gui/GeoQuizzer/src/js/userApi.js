const userEndpoint = "http://localhost:8080/user/"
export const login = (userLog) => {
    fetch(userEndpoint + 'login', {
        method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(userLog)
    }).then(async (response) => {
        let token = await response.text();
        setToken(token)
        return response;
    }).catch((error) => {
        console.log(error);
    })
}

export const signUpRest = (userReg) => {
    fetch(userEndpoint + 'signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userReg)
    }).then(async (response) => {
        if (response.ok) {
            let token = await response.text();
            setToken(token);
        }
    }).catch((error) => {
        console.log(error);
    })
}

const setToken = (token) => {
    document.cookie = `token=${token}`
}
const getToken = () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');

    let tokenValue = null;
    for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'token') {
            tokenValue = value;
            break;
        }
    }
    console.log("TOKEN VALUE")
    console.log(tokenValue)
    return tokenValue;
}

const isLoggedIn = () => {
    const val = getToken();
    return val === null
}


/*
fetch(userEndpoint + 'signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token2}`},
        body: JSON.stringify(userReg)
 */

