import {Cookies} from "react-cookie";
import {makeAutoObservable} from "mobx";


export default class cookieStore {
    constructor() {
        this._cookies = new Cookies();
        makeAutoObservable(this)
    }

    get cookies() {
        return this._cookies;
    }

    setCookies(value) {
        this._cookies = value;
    }

    updateCart(values) {
        this._cookies.set('cart', values.join(','), { path: '/' });
    }
}