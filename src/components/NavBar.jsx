import React, {useContext, useRef, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Navbar, Container, Nav, Button, NavItem, NavbarBrand} from "react-bootstrap";
import {ADMIN_ROUTE, BASKET_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {useHistory, NavLink} from "react-router-dom";
import {Context} from "../index";
import Basket from "../pages/Basket";

const NavBar = observer(() => {
    const history = useHistory();
    const {user} = useContext(Context);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setLogin('')
        user.setRole('')
        localStorage.clear();
    }

    console.log(user);

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <div className={"d-flex align-items-center"}>
                        <NavbarBrand>
                            <NavLink style={{ color: "white" }} to={HOME_ROUTE}>GameStore</NavLink>
                        </NavbarBrand>
                        {user.isAuth &&
                            <div className={"d-flex ml-5"}>
                                <NavLink style={{color: "white"}} to={BASKET_ROUTE}>Корзина</NavLink>
                                <NavLink style={{color: "white"}} className={'ml-2'} to={PROFILE_ROUTE}>Профиль</NavLink>
                            </div>
                        }
                    </div>
                    {user.isAuth ?
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <Button
                                variant={"outline-light"}
                                onClick={() => logOut()}
                            >
                                Выйти
                            </Button>
                            {user.role === 'ADMIN' &&
                                <Button
                                variant={"outline-light"}
                                className='ml-2'
                                onClick={() => history.push(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>}
                        </Nav>
                        :
                        <Nav className="ml-auto" style={{ color: "white" }}>
                            <Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                        </Nav>
                    }
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;