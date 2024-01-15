import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {changeUser, createUser, getRoles, getUserById, login,} from "../../http/userAPI";
import useForm from "../../hooks/useForm";
import {observer} from "mobx-react-lite";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*%!@#?])(?=.*\d)(?=.*[^a-zA-Z0-9])[\s\S]{8,}$/

let defaultUser = {
    id: 0,
    login: '',
    email: '',
    numberPhone: '',
    roleId: 0,
    isBlock: false,
    role: '',
    password: '',
    repeatPassword: ''
}
const UserModal = observer(({show, onHide, title, selectedId, setSelectedId = 0, callback}) => {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('login' in fieldValues) {
            temp.login = fieldValues.login ? "" : "Логин не может быть пустым"
            temp.login = fieldValues.login.length >= 8 ? "" : "Логин должен быть больше 8 символов"
        }
        if ('email' in fieldValues) {
            temp.email = isEmailValid(fieldValues.email) ? "" : "Введите корректную электронную почту"
        }
        if (!!selectedRole) {
            temp.role = selectedRole.name ? "" : 'Выберите роль'
        }
        if ('numberPhone' in fieldValues) {
            temp.numberPhone = (/^(?:\+7|8)\d{10}$/).test(fieldValues.numberPhone) || fieldValues.numberPhone === "" ? "" : "Введите корректный номер телефона"
        }
        if ('password' in fieldValues) {
            temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотябы одну заглавную и одну прописные буквы, должен иметь спец. символы";
        }
        if ('repeatPassword' in fieldValues) {
            temp.password = fieldValues.password === fieldValues.repeatPassword ? "" : "Пароли должны совпадать"
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }

    function isEmailValid(email) {
        return EMAIL_REGEXP.test(email);
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(defaultUser, validate, setSelectedId)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate()) {
                const formData = new FormData()
                formData.append("login", values.login)
                formData.append("email", values.email)
                formData.append("numberPhone", values.numberPhone)
                formData.append("roleId", selectedRole.id)
                if (selectedId !== 0) {
                    changeUser(selectedId, formData)
                        .then(data => {
                            onHide();
                            callback();
                        })
                        .catch(err => alert(err.response.data.message))
                }
                else {
                    formData.append("password", values.password)
                    const formDataObj = {};
                    formData.forEach((value, key) => (formDataObj[key] = value));
                    console.log(formDataObj);
                    createUser(formData)
                        .then(data => {
                            onHide();
                            callback();
                        })
                        .catch(err => alert(err.response.data.message))
                }
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    function clearDefaultUser() {
        defaultUser = {
            id: 0,
            login: '',
            email: '',
            numberPhone: '',
            roleId: 0,
            isBlock: false,
            role: '',
            password: '',
            repeatPassword: ''
        }
        setValues(defaultUser);
        setSelectedRole({});
    }

    useEffect(() => {
        if (selectedId !== 0) {
            getUserById(selectedId)
                .then(async data => {
                    defaultUser = await userFromApiToDefatulValue(data)
                    setValues(defaultUser);
                })
                .catch(e => {
                    alert(e.response.data.message);
                }).finally(() => setSelectedRole(defaultUser.role));
        } else {
            clearDefaultUser();
        }
        getRoles().then(data => setRoles(data));
    }, [selectedId, setSelectedId]);

    const userFromApiToDefatulValue = async (data) => {
        return {
            login: data.login,
            email: data.email,
            numberPhone: data.numberPhone === null ? '' : data.numberPhone,
            roleId: data.roleId,
            isBlock: data.isBlock,
            role: data.role
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Form
                noValidate
                autoComplete={"off"}
                className="d-flex flex-column"
                onSubmit={handleSubmit}
            >
                <Modal.Body>
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
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedRole.name || 'Выберите роль'}</Dropdown.Toggle>
                        <Dropdown.Menu isInvalid={!!errors.role}>
                            {roles.map(role =>
                                <Dropdown.Item
                                    onClick={() => setSelectedRole(role)}
                                    key={role.id}>{role.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className={"invalid-feedback"} style={{display: "block"}}>{errors.role}</div>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetForm}>
                        Сбросить
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
});

export default UserModal;