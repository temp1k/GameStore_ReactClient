import React, {useContext, useEffect, useState} from 'react';
import {Button, Container, Form, InputGroup, Table} from "react-bootstrap";
import {blockUsers, getUsers} from "../http/userAPI";
import UserModal from "../components/modals/UserModal";
import {Context} from "../index";

const Users = () => {
    const {user} = useContext(Context)
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(0);
    const [title, setTitle] = useState('');
    const [search, setSeach] = useState('');
    const [isBlock, setIsBlock] = useState(false);

    // useEffect(() => {
    //     updateUsers()
    // }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            updateUsers()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [search, isBlock])

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = (id) => {
        setSelectedUserId(id);
        if (id === 0) setTitle('Добавление пользователя')
        else setTitle('Изменение пользователя')

        setShowModal(true);
    }

    const updateUsers = () => {
        getUsers(search, isBlock).then(data => {
            console.log(data);
            setUsers(data);
        }).catch(e => alert(e.response.data.message));
    }

    function changeBlockUser(id, bool) {
        blockUsers(id, bool)
            .then(() => updateUsers());
    }

    return (
        <Container>
            <div className="mt-2 d-flex justify-content-center">
                <InputGroup className={"w-50"} size={"lg"}>
                    <Form.Control
                        type="search"
                        placeholder="Поиск"
                        className="me-2"
                        aria-label="Search"
                        onChange={(e) => setSeach(e.target.value)}
                    />
                </InputGroup>
                <Form.Check
                    className={"d-flex align-items-center ml-4"}
                    label={`Показывать заблокированных`}
                    onChange={(e) => setIsBlock(e.target.checked)}
                />
            </div>
            <Button variant={"primary"} onClick={() => handleShow(0)}>Создать</Button>{'  '}
            <Table className={"mt-3"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Логин</th>
                    <th>Почта</th>
                    <th>Номер телефона</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {users.filter(u => u.login !== user.login).map((user, index) =>
                    <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td>{user.numberPhone}</td>
                        <td>
                            <Button variant={"secondary"} onClick={() => handleShow(user.id)}>Изменить</Button>{'  '}
                            <Button
                                variant={user.isBlock ? "outline-warning" : "danger"}
                                onClick={() => changeBlockUser(user.id, !user.isBlock)}
                            >
                                {user.isBlock ? 'Разблокировать' : 'Заблокировать'}
                            </Button>
                        </td>
                    </tr>
                )}
                </tbody>
            </Table>

            <UserModal
                show={showModal} onHide={handleClose}
                selectedId={selectedUserId} setSelectedId={setSelectedUserId}
                title={title}
                callback={updateUsers}
            />
        </Container>
    );
};

export default Users;