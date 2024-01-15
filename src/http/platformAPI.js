import {$host} from "./index";

export const getUniquePlatformGame = async (id) => {
    const {data} = await $host.get('api/Platforms/'+id);
    return data;
}