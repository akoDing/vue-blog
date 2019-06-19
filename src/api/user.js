import axios from "axios";
// axios.defaults.headers.post['Content-Type'] = 'application/json';

export function getLogin(username, password) {
    const url = '/api/user/login'

    const data = Object.assign({}, {
        username: username,
        password: password
    })

    return axios.post(url, data, {
        // 更换post请求头
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}