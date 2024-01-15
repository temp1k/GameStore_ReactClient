import {$adminHost, $host} from "./index";


export const postCode = async (code) => {
    const {data} = await $adminHost.post('api/Codegames', code)
    return data;
}

export const getAllCodesByGameId = async (id) => {
    const {data} = await $host.get('api/Codegames/' + id)
    return data;
}

export const getAllPlatforms = async () => {
    const {data} = await $host.get('api/Platforms')
    return data;
}

export const deleteCode = async (id) => {
    const {data} = await $adminHost.delete('api/Codegames/'+id);
    return data;
}