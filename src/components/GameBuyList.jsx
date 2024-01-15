import React, {useEffect, useState} from 'react';
import {Row, Spinner} from "react-bootstrap";
import {getBuyerGames} from "../http/gameAPI";
import GameItem from "./GameItem";

const GameBuyList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        getBuyerGames()
            .then(data => {
                setGames(data);
                setLoading(false);
            })
            .catch(err => {
                alert(err.response.data);
            })
    }, []);

    if (loading) {
        return (
            <div className="position-absolute translate-middle" style={{top: "50%", left: "50%"}}>
                <Spinner animation="border" variant="primary"/>
            </div>
        )
    }

    return (
        <Row className="d-flex">
            {games.map(game =>
                <GameItem key={game.articul} game={game}/>
            )}
        </Row>
    );
};

export default GameBuyList;