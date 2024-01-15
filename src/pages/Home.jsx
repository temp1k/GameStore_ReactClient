import React from 'react';
import {Button, Container} from "react-bootstrap";
import {checkToken, getUserById} from "../http/userAPI";
import GameBuyList from "../components/GameBuyList";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Container>
                <GameBuyList/>
            </Container>
            <Footer/>
        </div>
    );
};

export default Home;