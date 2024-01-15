import React, {useEffect, useState} from 'react';
import {formatDateToNormal} from "../utils/formatDate";
import {Button, Table} from "react-bootstrap";
import {deleteDeveloper, getAllDevelopers} from "../http/developersAPI";
import DeveloperModal from "./modals/DeveloperModal";
import Basket from "../pages/Basket";

const Developers = () => {
    const [developers, setDevelopers] = useState([])
    const [selectedId, setSelectedId] = useState(0)
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('Создание разработчика')

    const handleClose = () => {
        setSelectedId(0)
        setShow(false)
    }
    const handleShow = (id) => {
        setSelectedId(id);
        if (id === 0) setTitle("Создание разработчика")
        else setTitle("Обновление разработчика")
        setShow(true);
    }

    useEffect(() => {
        updateDevelopers()
    }, []);

    const removeDeveloper = (id) => {
        if(!window.confirm("Вы уверены, что хотите удалить данного разработчика?")) return;
        deleteDeveloper(id)
            .then(data => {
                updateDevelopers()
            })
            .catch(() => alert('Невозможно удалить запись. Возможно у нее имеются связанные данные.'))
    }

    const updateDevelopers = () => {
        getAllDevelopers()
            .then(data => {
                setDevelopers(data)
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Button variant={"primary"} onClick={() => handleShow(0)}>Создать</Button>{'  '}
            <Table className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Сокращенное название</th>
                </tr>
                </thead>
                <tbody>
                {developers.map((dev, index) =>
                    <tr key={dev.id}>
                        <td>{index + 1}</td>
                        <td>{dev.fullName}</td>
                        <td>{dev.shortName}</td>
                        <td>
                            <Button variant={"secondary"} onClick={() => handleShow(dev.id)}>Изменить</Button>{'  '}
                            <Button variant={"danger"} onClick={() => removeDeveloper(dev.id)}>Удалить</Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <DeveloperModal
                show={show} onHide={handleClose}
                title={title}
                selectedId={selectedId} setSelectedId={setSelectedId}
                callback={updateDevelopers}
            />
        </div>
    );
};

export default Developers;