import axios from "axios";

export function getBlogList(page, author, keyword) {
    const url = '/api/blog/list'

    const data = Object.assign({}, {
        page: page,
        author: author,
        keyword: keyword
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getBlogDetail(id) {
    const url = '/api/blog/detail'

    const data = Object.assign({}, {
        id: id
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

export function getBlogUpdate(id, title, content) {
    const url = '/api/blog/update'

    const data = Object.assign({}, {
        id: id,
        title: title,
        content: content
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