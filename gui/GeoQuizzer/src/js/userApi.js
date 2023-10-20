import axios from "axios";

const userEndpoint = "http://localhost:8080/user/"
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const login = (userLog) => {
    axios.post(userEndpoint + 'login', {
        username: userLog.username,
        password: userLog.password
    }).then(function (response) {
        console.log(response);
        return response;
    }).catch(function (error) {
       return error.message;
    });
}

export const signUpRest = (userReg) => {
    axios.post(userEndpoint + 'signup', {
        username: userReg.username,
        email: userReg.email,
        firstPass: userReg.firstPass,
        secondPass: userReg.secondPass
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
}




