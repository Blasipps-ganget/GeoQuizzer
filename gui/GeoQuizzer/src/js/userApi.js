const userEndpoint = "http://localhost:8080/user/"
export const login = (userLog) => {
    fetch(userEndpoint + 'login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userLog)
    }).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
    })
}

export const signUpRest = (userReg) => {
    fetch(userEndpoint + 'signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(userReg)
    }).then( (response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    })
}




