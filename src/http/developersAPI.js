import {$adminHost} from "./index";

export const getAllDevelopers = async () => {
    const {data} = await $adminHost.get('api/Companies');
    return data;
}

export const getDeveloperById = async (id) => {
    const {data} = await $adminHost.get('api/Companies/' + id);
    return data;
}

export const postDeveloper = async (developer) => {
    const {data} = await $adminHost.post('api/Companies/', developer);
    return data;
}

export const putDeveloper = async (developer, id) => {
    const {data} = await $adminHost.put('api/Companies/' + id, developer);
    return data;
}

export const deleteDeveloper = async (id) => {
    const {data} = await $adminHost.delete('api/Companies/' + id);
    return data;
}