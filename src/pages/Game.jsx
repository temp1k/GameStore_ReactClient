import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import defaultImg from '../img/no_image.jpeg';
import ImageComponent from "../components/ImageComponent";
import {getGameById} from "../http/gameAPI";
import {useParams} from "react-router-dom";
import {getUniquePlatformGame} from "../http/platformAPI";
import {Context} from "../index";
import {update} from "../actions/user";
import {getCartAPI, postCartAPI} from "../http/cartAPI";

const Statuses = {
    NO: "no",
    CART: "in_cart",
    BUY: "buy"
}

let defaultPage = {
    game: {
        articul: '',
        fullName: '',
        shortName: '',
        description: '',
        rating: '',
        price: 0.0,
        photo: '',
        company: {},
        publisher: {}
    },
    platforms: []
}

let defaulCart = {
    game: defaultPage.game,
    platform: {
        id: 0,
        fullName: '',
        shortName: ''
    }
}

const Game = () => {
    const [game, setGame] = useState(defaultPage.game);
    const [cart, setCart] = useState([]);
    const {cookieStore} = useContext(Context);
    const {user} = useContext(Context);
    const [platforms, setPlatforms] = useState(defaultPage.platforms);
    const [selectedPlatform, setSelectedPlatform] = useState({});
    const [status, setStatus] = useState(Statuses.NO);
    const {articul} = useParams();

    useEffect(() => {
        getCartFromAPI();
        getGameById(articul)
            .then(game => {
                setGame(game);
                getUniquePlatformGame(articul)
                    .then(platforms => {
                        setPlatforms(platforms);
                        if (platforms.length === 1) {
                            updateStatus(platforms[0]);
                        }
                    })
            })
            .catch(err => console.log(err));
    }, []);

    const updateStatus = (selectedPl) => {
        if (Array.isArray(cart) && cart.length === 0) {
            console.log('Игры нет в корзине')
            setStatus(Statuses.NO);
            return;
        }
        if (cart.find(g => g.game.articul === articul && g.platform.id === selectedPl.id)) {
            setStatus(Statuses.CART);
        }
        else{
            setStatus(Statuses.NO);
        }
        console.log(status);
        console.log(cart);
    }

    const getCartFromCookie = () => {
        const cartCookie = cookieStore.cookies.get('cart');
        if (cartCookie) {
            console.log(cartCookie);
            return cartCookie.split(',');
        } else return [];
    }

    const getCartFromAPI = () => {
        getCartAPI(user.login, articul)
            .then(data => {
                if (data){
                    console.log(data);
                    setCart(data);
                }
            })
            .catch((err) => {
                window.alert(err.response.data);
                setCart([]);
            })
    }

    const switchSelectedPlatform = (pl) => {
        setSelectedPlatform(pl);
        updateStatus(pl)
    }

    const addToCart = (e) => {
        if (!!!selectedPlatform.fullName) {
            window.alert('Выберите платформу');
            return;
        }
        // проверка, не является ли корзина пустой
        if (!(Array.isArray(cart) && cart.length === 0)) {
            // проверка на наличие игры уже в корзине
            if (cart && cart.find(g => g === game.articul + ":" + selectedPlatform.id)) {
                window.alert('Игра уже в корзине');
                setStatus(Statuses.CART);
                return;
            }
        }

        postCartAPI({
            status: true,
            login: user.login,
            platformId: selectedPlatform.id,
            gameId: articul
        })
            .then(data => {
                console.log(data);
                updateStatus(selectedPlatform);
                window.alert('Игра успешно добавлена в корзину!')
                setStatus(Statuses.CART);
                getCartFromAPI();
            })
            .catch(err => {
                window.alert(err.response.data);
            })
    }

    return (
        <Container className={'mt-3'} fluid={"sm"}>
            <Card>
                <Row>
                    <Col xs={4}>
                        <ImageComponent fileName={game.photo}/>
                    </Col>
                    <Col>
                        <Card.Body style={{height: '80%'}}>
                            <Card.Title style={{fontSize: 32}}>Игра {game.fullName}</Card.Title>
                            <div style={{marginBottom: 16}}>
                                <Card.Text style={{margin: 0}}>Платформы:</Card.Text>
                                <div className="d-flex">
                                    {platforms.map(platform =>
                                        <Card
                                            key={platform.id}
                                            border={selectedPlatform.fullName === platform.fullName ? 'danger' : 'outlined'}
                                            style={{cursor: "pointer", fontSize: 14}}
                                            className="p-2 m-2"
                                            onClick={() => switchSelectedPlatform(platform)}
                                        >
                                            {platform.fullName}
                                        </Card>
                                    )}
                                </div>
                            </div>
                            <Card.Text>Описание: <br/> {game.description}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    Цена: {game.price} руб.
                                </Col>
                                {user.isAuth &&
                                    <Col>
                                    {status === Statuses.NO ?
                                        <Button
                                            onClick={(e) => addToCart(e)}
                                        >
                                            Добавить в корзину
                                        </Button>
                                        :
                                        <Button
                                            variant={"secondary"}
                                            disabled
                                        >
                                            Уже в корзине
                                        </Button>
                                    }
                                </Col>
                                }
                            </Row>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default Game;