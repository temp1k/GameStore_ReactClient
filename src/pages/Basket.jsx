import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, FormCheck, Navbar, Row} from "react-bootstrap";
import {deleteCartAPI, getCartAPI} from "../http/cartAPI";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {CART_ROUTE} from "../utils/consts";
import ImageComponent from "../components/ImageComponent";

const Basket = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const {user} = useContext(Context);
    const [sum, setSum] = useState(0);
    const history = useHistory();

    useEffect(() => {
        getCartAPI(user.login)
            .then(data => {
                setCart(data)
                setSelectedItems(data);
                updateSum(data);
            })
            .catch(err => {
                window.alert(err.response.data);
            })
    }, [user.login]);

    useEffect(() => {
        updateSum(selectedItems);
        console.log('Update sum')
    }, [cart, selectedItems]);

    const updateSum = (cart) => {
        let a = 0;
        cart.map(item => {
            a += item.game.price;
        })
        setSum(a);
    }

    const goToCartHandler = (e) => {
        history.push(CART_ROUTE, {items: selectedItems})
    }

    const deleteItemFromCart = (id_item) => {
        deleteCartAPI(id_item)
            .then(data => {
                const updatedCart = cart.filter(item => item.id !== id_item);
                setCart(updatedCart);
                const updateSelectedItems = selectedItems.filter(item => item.id !== id_item);
                setSelectedItems(updateSelectedItems);
            })
            .catch(err => {
                alert(err.response.data);
            })

    }

    const switchSelectItems = (e, item) => {
        let updatedSelectedItems = [];
        if (e.target.checked) {
            updatedSelectedItems = [item, ...selectedItems]
        }
        else {
            updatedSelectedItems = selectedItems.filter(i => i !== item)
        }
        setSelectedItems(updatedSelectedItems)
        updateSum(updatedSelectedItems)
    }

    return (
        <Container className={"h-100 flex-grow-1 position-relative text-center"} style={{maxWidth: "50%"}}>
            <h2>Корзина</h2>
            <div style={{paddingBottom: "12dvh"}}>
                {!cart.length &&
                    <h4 style={{marginTop: "10%"}}>Ваша корзина пуста :(</h4>
                }
                {cart.map((item, index) =>
                    <Card className={"ml-auto mr-auto mb-2 d-flex"} key={item.id}>
                        <Row>
                            <Col xs={1} className={"d-flex align-items-center pl-4"}>
                                <FormCheck
                                    className={"checkbox-xl"}
                                    style={{cursor:"pointer"}}
                                    defaultChecked
                                    onChange={(e) => switchSelectItems(e, item)}
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
                                <Card.Footer className={"d-flex align-items-center justify-content-around"}>
                                    <b>{item.game.price} руб.</b>
                                    <Button onClick={() => deleteItemFromCart(item.id)} className={"btn-sm btn-danger"}>Удалить</Button>
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
                    <Button onClick={goToCartHandler} disabled={sum <= 0}>Оформить</Button>
                </Container>
            </Navbar>
        </Container>
    );
};

export default Basket;