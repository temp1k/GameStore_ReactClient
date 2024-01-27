import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useLocation} from "react-router-dom/cjs/react-router-dom";
import {NavLink, useHistory} from "react-router-dom";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Context} from "../index";
import * as PropTypes from "prop-types";
import useForm from "../hooks/useForm";
import {login, registration} from "../http/userAPI";

const initialFieldValues = {
    login: '',
    email: '',
    numberPhone: '',
    password: '',
    repeatPassword: ''
}

const Auth = observer(() => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE;
    const {user} = useContext(Context);
    const history = useHistory();

    //validation
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('login' in fieldValues) {
            temp.login = fieldValues.login ? "" : "Логин не может быть пустым"
        }
        if ('email' in fieldValues && !isLogin) {
            temp.email = isEmailValid(fieldValues.email) ? "" : "Введите корректную электронную почту"
        }
        if ('numberPhone' in fieldValues && !isLogin) {
            temp.numberPhone = (/^(?:\+7|8)\d{10}$/).test(fieldValues.numberPhone) || fieldValues.numberPhone === "" ? "" : "Введите корректный номер телефона"
        }
        if ('password' in fieldValues) {
            temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотя бы одну заглавную и одну прописные буквы, должен иметь спец. символы";
        }
        if ('password' && 'repeatPassword' in fieldValues && !isLogin) {
            temp.password = fieldValues.password === fieldValues.repeatPassword ? "" : "Пароли должны совпадать"
        }

        if (fieldValues === values)
            setErrors({
                ...temp
            });

        return Object.values(temp).every(x => x === "")
    }
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*%!@#?])(?=.*\d)(?=.*[^a-zA-Z0-9])[\s\S]{8,}$/

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
    } = useForm(initialFieldValues, validate, 0)

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate()) {
                if (isLogin) {
                    login(values.login, values.password)
                        .then(data => {
                            user.setIsAuth(true)
                            user.setLogin(data.username)
                            user.setRole(data.role)
                            history.push(HOME_ROUTE)
                        })
                        .catch(err => {
                            window.alert(err.response.data);
                        })
                } else {
                    await registration(values.login, values.email, values.numberPhone, values.password)
                        .then(data => {
                            history.push(LOGIN_ROUTE)
                        })
                        .catch(err => window.alert(err.response.data))
                }
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form
                    className="d-flex flex-column"
                    autoComplete={"off"}
                    noValidate
                    onSubmit={handleSubmit}
                >
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
                        {!isLogin && <Form.Control
                            name="email"
                            className="mt-3"
                            placeholder="Введите почту..."
                            value={values.email}
                            onChange={handleInputChange}
                            type={"email"}
                            isInvalid={!!errors.email}

                        />}
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        {!isLogin && <Form.Control
                            name="numberPhone"
                            className="mt-3"
                            placeholder="Введите номер телефона..."
                            value={values.numberPhone}
                            onChange={handleInputChange}
                            type={"phone"}
                            isInvalid={!!errors.numberPhone}

                        />}
                        <Form.Control.Feedback type="invalid">
                            {errors.numberPhone}
                        </Form.Control.Feedback>
                    </Form.Group>
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
                    {!isLogin && <Form.Control
                        name="repeatPassword"
                        className="mt-3"
                        placeholder="Введите пароль..."
                        value={values.repeatPassword}
                        onChange={handleInputChange}
                        type={"password"}
                    />}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink className="d-inline p-0"
                                                       to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink className="d-inline p-0"
                                                        to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button variant={"outline-success"} type={"submit"}>
                            {isLogin ? "Войти" : "Зарегистрироваться"}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    )
});

export default Auth;