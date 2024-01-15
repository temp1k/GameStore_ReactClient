import React, {useEffect, useState} from 'react';
import {deleteDeveloper} from "../http/developersAPI";
import {Button, Table} from "react-bootstrap";
import DeveloperModal from "./modals/DeveloperModal";
import {getAllPublishers} from "../http/publishersAPI";
import PublisherModal from "./modals/PublisherModal";

const Publishers = () => {
    const [publishers, setPublishers] = useState([])
    const [selectedId, setSelectedId] = useState(0)
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState('Создание издателя')

    const handleClose = () => {
        setSelectedId(0)
        setShow(false)
    }
    const handleShow = (id) => {
        setSelectedId(id);
        if (id === 0) setTitle("Создание издателя")
        else setTitle("Обновление издателя")
        setShow(true);
    }

    useEffect(() => {
        updatePublishers()
    }, []);

    const removePublisher = (id) => {
        if(!window.confirm("Вы уверены, что хотите удалить данного разработчика?")) return;
        deleteDeveloper(id)
            .then(data => {
                updatePublishers()
            })
            .catch(() => alert('Невозможно удалить запись. Возможно у нее имеются связанные данные.'))
    }

    const updatePublishers = () => {
        getAllPublishers()
            .then(data => {
                console.log(data)
                setPublishers(data)
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
                {publishers?.map((pub, index) =>
                    <tr key={pub.id}>
                        <td>{index + 1}</td>
                        <td>{pub.fullName}</td>
                        <td>{pub.shortName}</td>
                        <td>
                            <Button variant={"secondary"} onClick={() => handleShow(pub.id)}>Изменить</Button>{'  '}
                            <Button variant={"danger"} onClick={() => removePublisher(pub.id)}>Удалить</Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <PublisherModal
                show={show} onHide={handleClose}
                title={title}
                selectedId={selectedId} setSelectedId={setSelectedId}
                callback={updatePublishers}
                />
        </div>
    );
};

export default Publishers;