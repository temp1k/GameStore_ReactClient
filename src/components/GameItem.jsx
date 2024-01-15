import React from 'react';
import {Card, Col} from "react-bootstrap";
import ImageComponent from "./ImageComponent";
import {useHistory} from "react-router-dom";
import {GAME_ROUTE} from "../utils/consts";

const GameItem = ({game}) => {
    const history = useHistory();
    return (
        <Col md={3} className="mt-3">
            <Card style={{ width: '14rem'}} border={"light"}>
                <ImageComponent fileName={game.photo} width={280} height={220}/>
                <Card.Body className={"p-1"}>
                    <div style={{
                        display: "-webkit-box",
                        height: "3.5em", // that's one line, 2em for 2 lines, etc...
                        webkitLineClamp: "2",
                        webkitBoxOrient: "vertical",
                        overflow: "hidden",
                        maxWidth: 450
                    }}
                    >
                        <Card.Title>{game.fullName}</Card.Title>
                    </div>
                    <Card.Text className={"mb-0"}>{game.price} руб.</Card.Text>
                    <Card.Link style={{cursor: 'pointer'}} onClick={() => history.push(GAME_ROUTE + '/' + game.articul)}>Посмотреть</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default GameItem;