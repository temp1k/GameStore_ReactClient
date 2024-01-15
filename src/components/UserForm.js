import React, {useEffect} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import useForm from "../hooks/useForm";
import * as actions from "../actions/user";
import {connect} from "react-redux";

const initialFieldValues = {
    login: '',
    email: '',
    numberPhone: '',
    password: '',
    repeatPassword: ''
}

const UserForm = (props) => {

    //validation
    const validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('login' in fieldValues) {
            temp.login = fieldValues.login ? "" : "Логин не может быть пустым"
        }
        if ('email' in fieldValues) {
            temp.email = isEmailValid(fieldValues.email) ? "" : "Введите корректную электронную почту"
        }
        if ('numberPhone' in fieldValues) {
            temp.numberPhone = (/^(?:\+7|8)\d{10}$/).test(fieldValues.numberPhone) || fieldValues.numberPhone === "" ? "" : "Введите корректный номер телефона"
        }
        if ('password' && 'repeatPassword' in fieldValues) {
            temp.password = fieldValues.password === fieldValues.repeatPassword ? "" : "Пароли должны совпадать"
            if (temp.password === ""){
                temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотябы одну заглавную и одну прописные буквы, должен иметь спец. символы";
            }
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
        resetForm,
        handleInputChange
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault();
        if (validate()) {
            if (props.currentId === 0)
            props.createUser(values, () => {window.alert('Добавлено')})
            else
                props.updateUser(props.currentId, values, () => {window.alert('Изменено')})
        }
    }

    useEffect(() => {
        if (props.currentId!==0) {
            const user = props.usersList.find(x => x.id === props.currentId)
            setValues({
                repeatPassword:  user.password,
                ...user
            })
            setErrors({})
        }
    }, [props.currentId]);

    return (
        <form autoComplete="false" noValidate onSubmit={handleSubmit}>
            <Grid>
                <Grid item xs={12}
                      sx={{
                          '& .MuiTextField-root': {m: 1, width: '25ch'},
                      }}>
                    <TextField
                        name="login"
                        variant="outlined"
                        label="Логин"
                        value={values.login}
                        onChange={handleInputChange}
                        {...(errors.login && {error: true, helperText: errors.login})}
                    />
                    <TextField
                        name="email"
                        type="email"
                        variant="outlined"
                        label="Эл. почта"
                        value={values.email}
                        onChange={handleInputChange}
                        {...(errors.email && {error: true, helperText: errors.email})}
                    />
                    <TextField
                        name="numberPhone"
                        variant="outlined"
                        label="Номер телефона"
                        value={values.numberPhone}
                        onChange={handleInputChange}
                        {...(errors.numberPhone && {error: true, helperText: errors.numberPhone})}
                    />
                    <TextField
                        name="password"
                        variant="outlined"
                        label="Пароль"
                        type="password"
                        value={values.password}
                        onChange={handleInputChange}
                        {...(errors.password && {error: true, helperText: errors.password})}
                    />
                    <TextField
                        name="repeatPassword"
                        variant="outlined"
                        label="Повторите пароль"
                        type="password"
                        value={values.repeatPassword}
                        onChange={handleInputChange}
                    />
                    <Grid item xs={12} display="flex" flexDirection="row-reverse"
                          style={{marginRight: 40}}
                          sx={{
                              '& .MuiButton-root': {m: 0, marginRight: 2}
                          }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Подтвердить
                        </Button>
                        <Button
                            variant="contained"
                            color="inherit"
                            onClick={resetForm}
                        >
                            Сброс
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

const mapStateToProps = state => ({
    usersList: state.user.list
});

const mapActionToProps = {
    createUser: actions.create,
    updateUser: actions.update,
}

export default connect(mapStateToProps, mapActionToProps)(UserForm);