import {$adminHost, $host} from "./index";

export const getAllGames = async (search) => {
    let where = '';
    if (search) where += `search=${search}`;
    if (where) {
        const {data} = await $adminHost.get('api/Games?' + where)
        return data;
    }
    else {
        const {data} = await $adminHost.get('api/Games/')
        return data;
    }
}

export const getBuyerGames = async () => {
    const {data} = await $host.get('api/Games/buyer');
    return data;
}

export const getGameById = async (id) => {
    const {data} = await $adminHost.get('api/Games/'+id);
    return data;
}

export const createGame = async (game) => {
    const {data} = await $adminHost.post('api/Games/', game)
    return data;
}

export const changeGame = async (id, game) => {
    const {data} = await $adminHost.put('api/Games/' + id, game);
    return data;
}

export const deleteGameById = async (id) => {
    const {data} = await $adminHost.delete('api/Games/' + id);
    return data;
}