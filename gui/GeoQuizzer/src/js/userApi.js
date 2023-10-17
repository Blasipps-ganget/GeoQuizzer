import axios from "axios";


const userEndpoint = "http://localhost:8080/user/"
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const login = (userLog) => {
    axios.post(userEndpoint + 'login', {
        username: userLog.username,
        password: userLog.password
    }).then(function (response) {
        return response;
    }).catch(function (error) {
       return error.message;
    });

}

export const signUp = (userReg) => {
    axios.post(userEndpoint + 'signup', {
        username: userReg.username,
        password: userReg.password
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}

const validatePassword = (password) => {
    return passwordRegex.test(password)
}

const checkIfUserExists = (email) => {
    //check if email exists in database
    return true;
}
const checkLogin = (email) => {
    return true;
}



