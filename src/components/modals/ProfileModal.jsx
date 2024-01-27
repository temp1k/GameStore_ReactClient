import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import useForm from "../../hooks/useForm";
import {updateProfileData} from "../../http/userAPI";
import {isEmailValid} from "../../utils/validation";

const ProfileModal = ({show, onHide, profileData, callback}) => {
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('login' in fieldValues) {
            temp.login = fieldValues.login ? "" : "Логин не может быть пустым"
            temp.login = fieldValues.login.length >= 8 ? "" : "Логин должен быть больше 8 символов"
        }
        if ('email' in fieldValues) {
            temp.email = isEmailValid(fieldValues.email) ? "" : "Введите корректную электронную почту"
        }
        if ('numberPhone' in fieldValues) {
            temp.numberPhone = (/^(?:\+7|8)\d{10}$/).test(fieldValues.numberPhone) || fieldValues.numberPhone === "" ? "" : "Введите корректный номер телефона"
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(profileData, validate)

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (validate()) {
                updateProfileData(values)
                    .then(data => {
                        console.log(data);
                        callback(values);
                        onHide();
                    })
                    .catch(err => {
                        alert(err.response.data);
                    })
            }
        } catch (ex) {
            console.error(ex);
        }
    }

    return (
        <Modal show={show} onHide={onHide} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение данных</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="formUpdateProfile"
                      noValidate
                      autoComplete={"off"}
                      className="d-flex flex-column"
                      onSubmit={handleSubmit}>
                    <Form.Group className="Group">
                        <Form.Control
                            name="login"
                            className="mt-3"
                            placeholder="Введите логин..."
                            value={values.login}
                            onChange={handleInputChange}
                            isInvalid={!!errors.login}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.login}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="email"
                            className="mt-3"
                            placeholder="Введите почту..."
                            value={values.email}
                            onChange={handleInputChange}
                            type={"email"}
                            isInvalid={!!errors.email}

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="numberPhone"
                            className="mt-3"
                            placeholder="Введите номер телефона..."
                            value={values.numberPhone}
                            onChange={handleInputChange}
                            type={"text"}
                            isInvalid={!!errors.numberPhone}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.numberPhone}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={resetForm}>
                    Сбросить
                </Button>
                <Button variant="primary" type={"submit"} form="formUpdateProfile">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;