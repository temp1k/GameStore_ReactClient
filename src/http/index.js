import axios from "axios";


const $host = axios.create({
    // baseURL: 'http://localhost:5201/'
    baseURL: 'http://www.gamestoreapi.somee.com/'
})

const $authHost = axios.create({
    // baseURL: 'http://localhost:5201/'
    baseURL: 'http://www.gamestoreapi.somee.com/'
})

const $adminHost = axios.create({
    // baseURL: 'http://localhost:5201/'
    baseURL: 'http://www.gamestoreapi.somee.com/'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)
$adminHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $adminHost
}