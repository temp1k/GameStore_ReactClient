import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";
import {getCartAPI} from "../http/cartAPI";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {GAME_ROUTE} from "../utils/consts";

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
        <Container className={"h-100 flex-grow-1 position-relative"}>
            <h2>Корзина</h2>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Игра</th>
                    <th>Цена</th>
                    <th>Платформа</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) =>
                    <tr key={item.id} style={{cursor: "pointer"}} onClick={() => history.push(GAME_ROUTE + '/' + item.game.articul)}>
                        <td>{index + 1}</td>
                        <td>{item.game.fullName}</td>
                        <td>{item.game.price}</td>
                        <td>{item.platform.fullName}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <div className={"d-flex align-items-center p-4 pr-5 pl-5 position-absolute w-100 justify-content-between font-weight-bold"}
                 style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', bottom: 0}}
            >
                <h4>Всего: {sum} руб.</h4>
                <Button>Оформить</Button>
            </div>
        </Container>
    );
};

export default Basket;