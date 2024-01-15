import React, {useContext, useState} from 'react';
import {Button, Card, Form, Modal} from "react-bootstrap";
import useForm from "../../hooks/useForm";
import {validate} from "../../utils/validation";
import {exportView} from "../../http/backupAPI";
import {Context} from "../../index";
import {login} from "../../http/userAPI";

const ExportViewModal = ({show, onHide, setLoading}) => {
    const {user} = useContext(Context);
    const [views, setViews] = useState(['Users']);
    const [selectedView, setSelectedView] = useState('');
    const {
        values,
        setValues,
        errors,
        setErrors,
        resetForm,
        handleInputChange,
    } = useForm({password: ''}, validate)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (selectedView === '') {
                window.alert('Выберите представление');
                return;
            }
            if (validate(values, errors, setErrors)) {
                setLoading(true);
                login(user.login, values.password)
                    .then(data => {
                            exportView()
                                .then(data => {
                                    setLoading(false);
                                    const url = window.URL.createObjectURL(new Blob([data]));
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.setAttribute('download', 'export.csv');
                                    document.body.appendChild(link);
                                    link.click();
                                    resetForm();
                                    onHide();
                                })
                                .catch(err => {
                                    alert(err.response.data);
                                    setLoading(false);
                                })
                        }
                    )
                    .catch(err => {
                        console.log(err);
                        setLoading(false);
                        if (err.response.status === 401) {
                            window.alert("Неверный пароль");
                        }
                    })

            }
        } catch (ex) {
            console.log(ex);
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>Экспорт в csv</Modal.Title>
            </Modal.Header>
            <Form
                noValidate
                autoComplete={"off"}
                className="d-flex flex-column"
                onSubmit={handleSubmit}
            >
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            name="password"
                            className="mt-3"
                            placeholder="Введите пароль..."
                            value={values.password}
                            onChange={handleInputChange}
                            type={"password"}
                            isInvalid={!!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <p>Выберите представления для импорта:</p>
                    <div className={"d-flex"}>
                        {views.map(view =>
                            <Card
                                key={view}
                                border={selectedView === view ? 'danger' : 'outlined'}
                                style={{cursor: "pointer", fontSize: 14}}
                                className="p-2 m-2"
                                onClick={() => setSelectedView(view)}
                            >
                                {view}
                            </Card>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={"primary"} type={"submit"}>Подтвердить</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ExportViewModal;