import './App.css';
import {store} from "./actions/store";
import React, {useContext, useEffect, useState} from "react";
import {Provider} from 'react-redux';
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";
import {checkToken} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
import Footer from "./components/Footer";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

function App() {
    const {user} = useContext(Context)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            try {
                checkToken().then(data => {
                    if (data.isValid) {
                        user.setUser(true)
                        user.setLogin(data.login)
                        user.setIsAuth(true)
                        user.setRole(data.role)
                    }
                })
                    .catch(e => console.log(e))
                    .finally(() => setLoading(false));
            } catch (e) {
                console.log(e)
            }

        }, 500);

    }, []);

    if (loading) {
        return (
            <div className={"d-flex h-100 justify-content-center align-items-center"}>
                <Spinner animation={"grow"}/>
            </div>
        )
    }

    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar/>
                <AppRouter/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
