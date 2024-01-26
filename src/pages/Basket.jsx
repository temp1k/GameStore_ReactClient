import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, FormCheck, Navbar, Row, Table} from "react-bootstrap";
import {getCartAPI} from "../http/cartAPI";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {GAME_ROUTE} from "../utils/consts";
import ImageComponent from "../components/ImageComponent";

const Basket = () => {
    const [cart, setCart] = useState([]);
    const {user} = useContext(Context);
    const [sum, setSum] = useState(0);
    const history = useHistory();

    useEffect(() => {
        getCartAPI(user.login)
            .then(data => {
                setCart(data)
                updateSum(data);
            })
            .catch(err => {
                window.alert(err.response.data);
            })
    }, []);

    const updateSum = (cart) => {
        let a = 0;
        cart.map(item => {
            a += item.game.price;
        })
        setSum(a);
    }

    return (
        <Container className={"h-100 flex-grow-1 position-relative text-center"}>
            <h2>Корзина</h2>
            {/*<Table>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>#</th>*/}
            {/*        <th>Игра</th>*/}
            {/*        <th>Цена</th>*/}
            {/*        <th>Платформа</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {cart.map((item, index) =>*/}
            {/*        <tr key={item.id} style={{cursor: "pointer"}} onClick={() => history.push(GAME_ROUTE + '/' + item.game.articul)}>*/}
            {/*            <td>{index + 1}</td>*/}
            {/*            <td>{item.game.fullName}</td>*/}
            {/*            <td>{item.game.price}</td>*/}
            {/*            <td>{item.platform.fullName}</td>*/}
            {/*        </tr>*/}
            {/*    )}*/}
            {/*    </tbody>*/}
            {/*</Table>*/}
            <div>
                {cart.map((item, index) =>
                    <Card style={{maxWidth: "50%"}} className={"ml-auto mr-auto mb-2 d-flex"}>
                        <Row>
                            <Col xs={1} className={"d-flex align-items-center pl-4"}>
                                <FormCheck
                                    className={"checkbox-lg"}
                                    style={{cursor:"pointer"}}
                                    defaultChecked
                                    onChange={(e) => console.log(e.target.checked)}
                                />
                            </Col>
                            <Col xs={4} className={"pl-0"}>
                                <ImageComponent fileName={item.game.photo} style={{height: 150}} />
                            </Col>
                            <Col>
                                <Card.Body style={{height: "70%", paddingLeft: 0}}>
                                    <Card.Title>{item.game.fullName}</Card.Title>
                                    <Card.Text className={"text-left"}><b>Платформа:</b> {item.platform.fullName}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Card.Text>{item.game.price} руб.</Card.Text>
                                </Card.Footer>
                            </Col>
                        </Row>
                    </Card>
                )}
            </div>
            <Navbar bg="dark" variant="dark" className={"p-3 position-fixed w-100  font-weight-bold"}
                 style={{bottom: 0, left: 0, color: "white"}}
            >
                <Container className={"d-flex justify-content-between align-items-center"}>
                    <h4>Всего: {sum} руб.</h4>
                    <Button>Оформить</Button>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Basket;