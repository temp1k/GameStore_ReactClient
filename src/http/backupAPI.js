import {$adminHost} from "./index";
import async from "async";


export const getBackupFiles = async (search = '') => {
    let where = '';
    if (search !== '') where = '?search='+search;
    const {data} = await $adminHost.get('api/Backup'+where);
    return data;
}

export const createBackupFile = async () => {
    const {data} = await $adminHost.post('api/Backup');
    return data;
}

export const restoreDbFromBak = async (bakFile) => {
    const {data} = await $adminHost.post('api/Backup/restore?bakFileName='+bakFile);
    return data;
}

export const exportView = async () => {
    const {data} = await $adminHost.get('api/Export');
    return data;
}