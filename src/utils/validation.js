export const validate = (fieldValues, errors, setErrors) => {
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
    if ('password' in fieldValues) {
        temp.password = PASSWORD_REGEXP.test(fieldValues.password) ? "" : "Пароль должен быть не меньше 8 символов, содержать хотябы одну заглавную и одну прописные буквы, должен иметь спец. символы";
    }
    if ('repeatPassword' in fieldValues) {
        temp.password = fieldValues.password === fieldValues.repeatPassword ? "" : "Пароли должны совпадать"
    }

    if (fieldValues)
        setErrors({
            ...temp
        });

    return Object.values(temp).every(x => x === "")
}

function isEmailValid(email) {
    return EMAIL_REGEXP.test(email);
}

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const PASSWORD_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[*%!@#?])(?=.*\d)(?=.*[^a-zA-Z0-9])[\s\S]{8,}$/