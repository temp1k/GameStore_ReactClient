import React, {useEffect, useState} from 'react';
import useForm from "../../hooks/useForm";
import {validate} from "../../utils/validation";
import {Button, Form, Modal} from "react-bootstrap";
import SelectComponent from "../SelectComponent";
import {getAllPlatforms, postCode} from "../../http/codeAPI";

let defaultCode = {
    code: '',
    isActive: true,
    gameArticul: '',
    platformId: 0,
    platform: {}
}
const CodeGameModal = ({show, onHide, callback, gameArticul}) => {
    const [isActive, setIsActive] = useState(defaultCode.isActive);
    const [platforms, setPlatforms] = useState([]);
    const [selectedPlatform, setSelectedPlatform] = useState(defaultCode.platform);
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(defaultCode, validate)

    const reset = () => {
        resetForm();
        setSelectedPlatform(defaultCode.platform)
    }

    useEffect(() => {
        getAllPlatforms()
            .then(data => {
                setPlatforms(data);
            })
            .catch(err => alert('Невозможно получить платформаы\n' + err));
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate(values, errors, setErrors)) {
                const code = {
                    code: values.code,
                    isBlock: isActive,
                    gameArticul: gameArticul,
                    platformId: selectedPlatform.id
                }
                postCode(code)
                    .then(data => {
                        reset()
                        onHide();
                        callback();
                    })
                    .catch(err => alert('Обишибка\n' + err))
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <Modal show={show} onHide={onHide} size={"sm"}>
            <Modal.Header closeButton>
                <Modal.Title>Добавление кода</Modal.Title>
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
                            name="code"
                            className="mt-3"
                            placeholder="Введите код..."
                            value={values.code}
                            onChange={handleInputChange}
                            isInvalid={!!errors.code}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.code}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            label="Активность кода"
                            defaultChecked
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </Form.Group>
                    <SelectComponent
                        values={platforms}
                        selectedValue={selectedPlatform} setSelectedValue={setSelectedPlatform}
                        placeholder={"Выберите платформу"}
                    />
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
};

export default CodeGameModal;