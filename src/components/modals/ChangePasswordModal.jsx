import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {isPasswordValid} from "../../utils/validation";
import useForm from "../../hooks/useForm";
import {updatePassword} from "../../http/userAPI";

let initialValues = {
    confirmPassword: '',
    newPassword: '',
    repeatPassword: ''
}

const ChangePasswordModal = ({show, onHide}) => {

    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('newPassword' in fieldValues) {
            temp.newPassword = isPasswordValid(fieldValues.newPassword) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотябы одну заглавную и одну прописные буквы, должен иметь спец. символы";
        }
        if ('repeatPassword' in fieldValues) {
            temp.repeatPassword = fieldValues.newPassword === fieldValues.repeatPassword ? "" : "Пароли должны совпадать"
        }
        if ('confirmPassword' in fieldValues) {
            temp.confirmPassword = fieldValues.confirmPassword ? "" : "Это обязательное поле для заполнения"
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
    } = useForm(initialValues, validate)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            updatePassword(values.confirmPassword, values.newPassword)
                .then(data => {
                    window.alert(data);
                    onHide();
                    resetForm();
                })
                .catch(err => {
                    console.error(err);
                    window.alert(err.response.data);
                })
        }
    }

    const closeModal = () => {
        resetForm();
        onHide();
    }

    return (
        <Modal show={show} onHide={closeModal} size={"sm"}>
            <Modal.Header closeButton>
                <Modal.Title>Смена пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form id="formChangePassword"
                      noValidate
                      autoComplete="off"
                      onSubmit={handleSubmit}
                >
                    <Form.Group>
                        <Form.Control
                            name="confirmPassword"
                            className="mt-3"
                            placeholder="Введите старый пароль"
                            value={values.confirmPassword}
                            onChange={handleInputChange}
                            type={"password"}
                            isInvalid={!!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            <span>{errors.confirmPassword}</span>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <hr/>
                    <Form.Group>
                        <Form.Control
                            name="newPassword"
                            className="mt-3"
                            placeholder="Введите пароль..."
                            value={values.newPassword}
                            onChange={handleInputChange}
                            type={"password"}
                            isInvalid={!!errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.newPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="repeatPassword"
                            className="mt-3"
                            placeholder="Повторите пароль..."
                            value={values.repeatPassword}
                            onChange={handleInputChange}
                            type={"password"}
                            isInvalid={!!errors.repeatPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.repeatPassword}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={resetForm}>
                    Сбросить
                </Button>
                <Button variant="primary" type={"submit"} form={"formChangePassword"}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ChangePasswordModal;