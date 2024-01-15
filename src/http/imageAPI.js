import {$adminHost, $host} from "./index";

export const getImage = async (fileName) => {
    const {data} = await $host.get('api/Images/' + fileName);
    return data;
}