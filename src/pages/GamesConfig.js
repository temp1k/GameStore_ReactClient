import React, {useState} from 'react';
import {Switch} from "react-router-dom";
import {Card, Container, Row} from "react-bootstrap";
import Games from "../components/Games";
import Developers from "../components/Developers";
import Publishers from "../components/Publishers";

const GamesConfig = () => {
    const itemsMenu = {
        games: "games",
        developers: "developers",
        publishers: "publishers"
    }
    const [menuList, setMenuList] = useState({
        games: true,
        publishers: false,
        developers: false
    });

    const switchMenu = (name) => {
        switch (name) {
            case itemsMenu.games:
                setMenuList({
                    games: true,
                    publishers: false,
                    developers: false
                })
                break;
            case itemsMenu.publishers:
                setMenuList({
                    games: false,
                    publishers: true,
                    developers: false
                })
                break;
            case itemsMenu.developers:
                setMenuList({
                    games: false,
                    publishers: false,
                    developers: true
                })
                break;
        }
    }

    return (
        <Container>
            <Row className="d-flex">
                <Card
                    style={{cursor: "pointer"}}
                    border={menuList.games ? "danger" : 'light'}
                    className="p-3 m-2"
                    onClick={() => switchMenu(itemsMenu.games)}
                >
                    Игры
                </Card>
                <Card
                    style={{cursor: "pointer"}}
                    border={menuList.publishers ? "danger" : 'light'}
                    className="p-3 m-2"
                    onClick={() => switchMenu(itemsMenu.publishers)}
                >
                    Издатели
                </Card>
                <Card
                    style={{cursor: "pointer"}}
                    border={menuList.developers ? "danger" : 'light'}
                    className="p-3 m-2"
                    onClick={() => switchMenu(itemsMenu.developers)}
                >
                    Разработчики
                </Card>
            </Row>
            <Switch>
                {menuList.games && <Games/>}
                {menuList.developers && <Developers/>}
                {menuList.publishers && <Publishers/>}
            </Switch>
        </Container>
    );
};

export default GamesConfig;