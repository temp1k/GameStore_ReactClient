import axios from "axios";


const $host = axios.create({
    baseURL: 'http://localhost:5201/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5201/'
})

const $adminHost = axios.create({
    baseURL: 'http://localhost:5201/'
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