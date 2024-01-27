import {$adminHost, $authHost} from "./index";


export const confirmBuyAPI = async (ItemsCart) => {
    const {data} = await $authHost.post('api/Purchase', ItemsCart);
    return data;
}

export const getMyPurchasesAPI = async () => {
    const {data} = await $authHost.get('api/Purchase/my');
    return data;
}

export const getAllPurchases = async () => {
    const {data} = await $adminHost.get('api/Purchase');
    return data;
}