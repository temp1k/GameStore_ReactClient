import {makeAutoObservable} from "mobx";


export default class userStore {
    constructor() {
        this._user = {}
        this._login = ''
        this._isAuth = false
        this._role = '';
        makeAutoObservable(this)
    }


    get user() {
        return this._user;
    }

    setUser(value) {
        this._user = value;
    }

    get isAuth() {
        return this._isAuth;
    }

    setIsAuth(value) {
        this._isAuth = value;
    }

    get role() {
        return this._role;
    }

    setRole(value) {
        this._role = value;
    }

    get login() {
        return this._login;
    }

    setLogin(value) {
        this._login = value;
    }
}