import React from 'react';
import {Container} from "react-bootstrap";
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