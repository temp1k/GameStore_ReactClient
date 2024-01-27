import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";


export const registration = async (login, email='', numberPhone='', password) => {
    const {data} = await $host.post('api/Authenticate/register', {login, email: email, numberPhone: numberPhone, password, })
    localStorage.setItem('token', data.token)
    return data
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/Authenticate/login', {login, password})
    localStorage.setItem('token', data.token)
    return data;
}

export const getUserById = async (id) => {
    const {data} = await $authHost.get('api/Users/'+id);
    return data;
}

export const checkToken = async () => {
    const {data} = await $authHost.get('api/Authenticate/');
    return data;
}

export const getUsers = async (search, isBlock) => {
    let where = "";
    if (search) {
        where = `search=${search}`

    }
    if (isBlock){
        if(where){
            where+='&'
        }
        where+=`isBlock=${isBlock}`
    }

    if (where){
        const {data} = await $authHost.get('api/Users?'+where);
        return data
    }
    else{
        const {data} = await $authHost.get('api/Users/');
        return data
    }
}

export const blockUsers = async (id, block) => {
    const {data} = await $authHost.put('api/Users/'+id+'/block?block='+block);
    return data;
}

export const getRoles = async () => {
    const {data} = await $authHost.get('api/Roles/')
    return data;
}

export const changeUser = async (id, user) => {
    const {data} = await $authHost.put('api/Users/'+id, user)
    return data;
}

export const createUser = async (user) => {
    const {data} = await $authHost.post('api/Users/', user)
    return data;
}

// export const check = async () => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token)
//     return jwtDecode(data.token)
// }

export const getProfileDataAPI = async () => {
    const {data} = await $authHost.get('api/Users/profile')
    return data;
}

export const updateProfileData = async (updateProfile) => {
    const {data} = await $authHost.put('api/Users/profile/update', updateProfile)
    return data;
}

export const updatePassword = async (confirmPassword, newPassword) => {
    const {data} = await $authHost.put('api/Users/updatePassword', {confirmPassword, newPassword});
    return data;
}
