import React, {useEffect} from 'react';
import useForm from "../../hooks/useForm";
import {validate} from "../../utils/validation";
import {getDeveloperById, postDeveloper, putDeveloper} from "../../http/developersAPI";
import {Button, Form, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {getPublisherById, postPublisher, putPublisher} from "../../http/publishersAPI";


let defaultDeveloper = {
    fullName: '',
    shortName: ''
}
const PublisherModal = observer(({show, onHide, title, selectedId, setSelectedId = 0, callback}) => {
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(defaultDeveloper, validate, setSelectedId)

    useEffect(() => {
        if (selectedId !== 0) {
            getPublisherById(selectedId)
                .then(data => {
                    defaultDeveloper = developerFromApiToDefaultValue(data);
                    setValues(defaultDeveloper);
                })
                .catch(e => {
                    alert(e.response.data.message);
                })
        } else {
            clearDefaultDeveloper();
        }
    }, [selectedId, setSelectedId]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate(values, errors, setErrors)) {
                const formData = new FormData()
                formData.append("fullName", values.fullName);
                formData.append("shortName", values.shortName);
                if (selectedId !== 0) {
                    putPublisher(formData, selectedId)
                        .then(data => {
                            onHide();
                            callback();
                        }).catch(err => console.log(err))
                } else {
                    postPublisher(formData)
                        .then(data => {
                            onHide();
                            callback();
                        })
                        .catch(err => console.log(err))
                }
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    function clearDefaultDeveloper() {
        defaultDeveloper = {
            fullName: '',
            shortName: '',
        }
        setValues(defaultDeveloper);
    }

    const developerFromApiToDefaultValue = (data) => {
        return {
            fullName: data.fullName,
            shortName: data.shortName,
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
                            name="fullName"
                            className="mt-3"
                            placeholder="Введите название..."
                            value={values.fullName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.fullName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.fullName}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="shortName"
                            className="mt-3"
                            placeholder="Введите сокращенное название..."
                            value={values.shortName}
                            onChange={handleInputChange}
                            type={"text"}
                            isInvalid={!!errors.shortName}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.shortName}
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

export default PublisherModal;