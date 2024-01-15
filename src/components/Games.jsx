import React, {useEffect, useState} from 'react';
import {Button, Container, Form, InputGroup, Table} from "react-bootstrap";
import {deleteGameById, getAllGames} from "../http/gameAPI";
import GameModal from "./modals/GameModal";
import {formatDateToNormal} from "../utils/formatDate";

const   Games = () => {
    const [games, setGames] = useState([]);
    const [selectedGameId, setSelectedGameId] = useState(0);
    const [title, setTitle] = useState('');
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setSelectedGameId(0);
    }
    const handleShow = (id) => {
        setSelectedGameId(id);
        id !== 0 ? setTitle('Изменение игры') : setTitle('Создание игры');
        setShow(true);
    }

    const updateGames = () => {
        getAllGames(search)
            .then(data => {
                setGames(data);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateGames()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [search]);

    const deleteGame = (id) => {
        if (!window.confirm("Вы уверены, что хотите удалить данную игру?")) return;
        deleteGameById(id)
            .then(data => {
                updateGames()
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    }

    return (
        <div>
            <div className="mt-2 d-flex justify-content-center">
                <InputGroup className={"w-50"} size={"sm"}>
                    <Form.Control
                        type="search"
                        placeholder="Поиск"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </InputGroup>
            </div>
            <Button variant={"primary"} onClick={() => handleShow(0)}>Создать</Button>{'  '}
            <Table className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Сокращенное название</th>
                    <th>Описание</th>
                    <th>Рейтинг</th>
                    <th>Цена</th>
                    <th>Дата релиза</th>
                </tr>
                </thead>
                <tbody>
                {games.map((game, index) =>
                    <tr key={game.id}
                    >
                        <td>{index + 1}</td>
                        <td>{game.fullName}</td>
                        <td>{game.shortName}</td>
                        <td>
                            <div style={{
                                display: "-webkit-box",
                                webkitLineClamp: "3",
                                webkitBoxOrient: "vertical",
                                overflow: "hidden",
                                maxWidth: 450
                            }}>
                                {game.description}
                            </div>
                        </td>
                        <td>{game.rating}</td>
                        <td>{game.price} руб.</td>
                        <td>{formatDateToNormal(game.releaseDate)}</td>
                        <td>
                            <Button variant={"secondary"}
                                    onClick={() => handleShow(game.articul)}>Изменить</Button>{'  '}
                            <Button variant={"danger"} onClick={() => deleteGame(game.articul)}>Удалить</Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <GameModal
                show={show} onHide={handleClose}
                title={title}
                selectedId={selectedGameId}
                setSelectedId={setSelectedGameId}
                callback={updateGames}
            />
        </div>
    );
};

export default Games;