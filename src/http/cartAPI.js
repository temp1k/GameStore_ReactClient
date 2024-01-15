import {$authHost} from "./index";


export const getCartAPI = async (login, gameArticul='') => {
    let where='?Login='+login;
    if (!login) {
        return [];
    }
    if (gameArticul) {
        where+='&GameArticul='+gameArticul;
    }

    const {data} = await $authHost.get('api/Cart'+where);
    return data;
}

export const postCartAPI = async (cartModal) => {
    const {data} = await $authHost.post('api/Cart', cartModal);
    return data;
}