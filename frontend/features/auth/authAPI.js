import axios from "axios";

export const LoginAPI = async (login) => {
    const URL = 'http://localhost:8000/api/login';
    const data = await axios.post(URL, login, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    })
        .then(res => {
            return res
        }).catch(error => {
            return error.response
        })
    return data
}

export const SignUpAPI = async (signup) => {
    const URL = 'http://localhost:8000/api/signup';
    const data = await axios.post(URL, signup, {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }).then(res => { return res })
        .catch(error => { return error.response })
    return data
}