import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import userStore from "./store/userStore";
import cookieStore from "./store/cookieStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new userStore(),
        cookieStore: new cookieStore()
    }}>
        <App />
    </Context.Provider>
);


