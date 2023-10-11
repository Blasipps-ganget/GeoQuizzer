const userEndpoint = "http://localhost:8080/user/"
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const login = (user) => {
    return fetch(userEndpoint + 'login')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(() => {
            return checkLogin(user);
        });
}

export const signUp = () => {
    return fetch(userEndpoint + 'signup')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then((resp) => {
            return resp;
        })
}

const validatePassword =  (password) => {
    return passwordRegex.test(password)
}

const checkIfUserExists = (email) => {
    //check if email exists in database
    return true;
}
const checkLogin = (email) => {
    return true;
}



