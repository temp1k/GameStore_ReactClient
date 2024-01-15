import {$adminHost} from "./index";

export const getAllPublishers = async () => {
    const {data} = await $adminHost.get('api/Publishers')
    return data;
}

export const getPublisherById = async (id) => {
    const {data} = await $adminHost.get('api/Publishers/' + id);
    return data;
}

export const postPublisher = async (publisher) => {
    const {data} = await $adminHost.post('api/Publishers/', publisher);
    return data;
}

export const putPublisher = async (publisher, id) => {
    const {data} = await $adminHost.put('api/Publishers/' + id, publisher);
    return data;
}

export const deletePublisher = async (id) => {
    const {data} = await $adminHost.delete('api/Publishers/' + id);
    return data;
}

