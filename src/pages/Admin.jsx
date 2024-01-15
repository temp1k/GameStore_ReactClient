import React from 'react';
import {Button, Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {GAMES_ROUTE, OTHER_ROUTE, USERS_ROUTE} from "../utils/consts";

const Admin = () => {
    const history = useHistory()
    console.log('Админ')
    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(USERS_ROUTE)}
            >
                Пользователи
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(GAMES_ROUTE)}
            >
                Игры
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={() => history.push(OTHER_ROUTE)}
            >
                Остальное
            </Button>
        </Container>
    );
};

export default Admin;