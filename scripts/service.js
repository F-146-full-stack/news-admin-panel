let BASE_URL = 'https://news.apasni.me/api'
let accesToken = localStorage.getItem('token')
const getAllUser = async (params) => {
    let res = await fetch(`${BASE_URL}/users`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${accesToken}`
        }
    })
    let data = await res.json()
    return data
}
const getAllNews = async (page = 1, limit = 10) => {
    let res = await fetch(`${BASE_URL}/news?page=${page}&limit=${limit}`)
    let data = await res.json()
    return data
}
const getAllCategory = async () => {
    let res = await fetch(`${BASE_URL}/category`)
    let data = await res.json()
    return data
}
const getNewsById = async (id) => {
    let res = await fetch(`${BASE_URL}/news/${id}`)
    let data = await res.json()
    return data
}
// POST Requsts

//News

const deleteNewsById = async (id) => {
    let res = await fetch(`${BASE_URL}/news/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${accesToken}` }
    })
    let data = await res.json()
    return data
}

const createNews = async (params) => {
    let res = await fetch(`${BASE_URL}/news`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${accesToken}`
        }
    })
    let data = await res.json()
    return data
}
const updateNewsById = async (params, id) => {
    let res = await fetch(`${BASE_URL}/news/${id}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "content-type": "application/json",
            'Authorization': `Bearer ${accesToken}`
        }
    })
    let data = await res.json()
    return data
}
// Category
const createCategory = async (params) => {
    let res = await fetch(`${BASE_URL}/category`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${accesToken}`
        }
    })
    let data = await res.json()
    return data
}
const deleteCategoryById = async (id) => {
    const res = await fetch(`${BASE_URL}/category/${id}`, {
        method: 'DELETE',
        headers: { 'authorization': `Bearer ${accesToken}` }
    })
    let data = await res.json()
    return data
}
const updateCategoryById = async (params, id) => {
    const res = await fetch(`${BASE_URL}/category/${id}`, {
        method: 'POST',
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${accesToken}`
        },
        body: JSON.stringify(params)
    })
    let data = await res.json()
    return data
}

// Login
const login = async (params) => {
    let res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json",

        },
        body: JSON.stringify(params),
    })
    let data = await res.json()
    return data
}


const register = async (params) => {
    let res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(params)
    })
    let data = await res.json()
    return data
}

const upload = async (params) => {
    let res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: params,
        // headers: {
        //     "content-type": "multipart/form-data"
        // }
    })
    let data = await res.json()
    return data
}