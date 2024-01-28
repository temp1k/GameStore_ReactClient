import axios from "axios";


//const apiURL = "http://localhost:5201/";
const apiURL = "http://www.gamestoreapi.somee.com/";

const $host = axios.create({
    baseURL: apiURL
})

const $authHost = axios.create({
    baseURL: apiURL
})

const $adminHost = axios.create({
    baseURL: apiURL
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