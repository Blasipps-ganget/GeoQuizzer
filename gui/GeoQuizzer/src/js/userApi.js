const userEndpoint = "http://localhost:8080/user/"
const loginEndpoint = userEndpoint + "login";
const registerEndpoint = userEndpoint + "signup";
export const login = async (userLog) => {
    const accessToken = handleToken();
    return fetch(loginEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
        body: JSON.stringify(userLog),
    }).then(async (response) => {
        let {token, refreshToken} = await response.json();
        document.cookie = `accessToken=${token}; path=/;`;
        document.cookie = `refreshToken=${refreshToken}; path=/;`;
        if (!(response.status === 401)) {
            return response.status === 200 ? parseJwt(token).name : 'login'
        } else if (response.status === 401) {
            return null
        }
    }).catch((error) => {
        console.log(error)
        return false;
    })
}

export const signUpRest = (userReg) => {
    return fetch(registerEndpoint, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userReg)
    }).then(async (response) => {
        if (response.ok) {
            let {token, refreshToken} = await response.json();
            document.cookie = `accessToken=${token}; path=/;`;
            document.cookie = `refreshToken=${refreshToken}; path=/;`;
            return response.status === 201 ? parseJwt(token).name : 'login'
        }
    }).catch((error) => {
        console.log(error);
        return false;
    })
}


const getToken = () => {
    const cookies = document.cookie;
    const cookieArray = cookies.split('; ');

    let accessToken = null;
    let refreshToken = null;

    for (const cookie of cookieArray) {
        const [name, value] = cookie.split('=');
        if (name === 'accessToken') {
            accessToken = value;
        }
        if (name === 'refreshToken') {
            refreshToken = value;
        }
    }


    return {accessToken, refreshToken};
}

const checkValidity = async () => {
    const {accessToken} = getToken()
    return fetch(userEndpoint + 'checkValidity', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}`},
    }).then((response) => {
        return response.status === 200;
    })
}

export const refreshToken = async () => {
    const {refreshToken} = getToken()
    let refreshed = false;
    if (refreshToken) {
        fetch(userEndpoint + 'refresh', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${refreshToken}`},
        }).then(async (response) => {
            if (response.ok) {
                let {accessToken} = await response.json();
                document.cookie = `accessToken=${accessToken}; path=/;`;
                refreshed = true;
            }
        })
    }
    return refreshed;
}
export const isLoggedIn = async () => {
    const isValid = await checkValidity();
    console.log("isvalid", isValid)
    if (isValid) {
        return true;
    } else {
        return await refreshToken()
    }
}
export const getName = () => {
    const {accessToken} = getToken();
    const payload = parseJwt(accessToken)
    return payload.name;
}

export const handleToken = async () => {
    const {accessToken} = getToken();
    if (accessToken) {
        const valid = await checkValidity()

        if (!valid) {
            await refreshToken();
        }
    }
    return accessToken;
}
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

/*
fetch(userEndpoint + 'signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token2}`},
        body: JSON.stringify(userReg)
 */
