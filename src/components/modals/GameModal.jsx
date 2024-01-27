import React, {useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import useForm from "../../hooks/useForm";
import {changeUser, createUser, getRoles, getUserById} from "../../http/userAPI";
import {Button, Col, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {validate} from "../../utils/validation";
import {changeGame, createGame, getGameById, imageExample} from "../../http/gameAPI";
import {formatDate, formatDateToInput, formatDateToNormal} from "../../utils/formatDate";
import ImageComponent from "../ImageComponent";
import {getAllPublishers} from "../../http/publishersAPI";
import {getAllDevelopers} from "../../http/developersAPI";
import SelectComponent from "../SelectComponent";
import CodeGameModal from "./CodeGameModal";
import {deleteCode} from "../../http/codeAPI";

let defaultGame = {
    articul: '',
    fullName: '',
    shortName: '',
    price: 0,
    releaseDate: '',
    company: {
        id: 0,
        fullName: '',
        shortName: ''
    },
    publisher: {
        id: 0,
        fullName: '',
        shortName: ''
    },
    codeGames: [{}]
}

const GameModal = ({show, onHide, title, selectedId, setSelectedId = 0, callback}) => {
    const [img, setImg] = useState("");
    const [publishers, setPublishers] = useState([]);
    const [selectedPublisher, setSelectedPublisher] = useState(defaultGame.publisher);
    const [developers, setDevelopers] = useState([]);
    const [selectedDeveloper, setSelectedDeveloper] = useState(defaultGame.company);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => {
        setShowModal(false)
    }

    const handleShow = () => {
        setShowModal(true);
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(defaultGame, validate, setSelectedId)

    const reset = () => {
        resetForm()
        setSelectedPublisher(defaultGame.publisher);
        setSelectedPublisher(defaultGame.publisher);
        setSelectedDeveloper(defaultGame.company);
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validate(values, errors, setErrors)) {
                const formData = new FormData()
                formData.append("fullName", values.fullName);
                formData.append("shortName", values.shortName);
                formData.append("description", values.description);
                formData.append("image", img);
                formData.append("price", values.price);
                formData.append("releaseDate", values.releaseDate);
                formData.append("companyId", selectedDeveloper.id);
                formData.append("publisherId", selectedPublisher.id);
                console.log(img);
                if (selectedId !== 0) {
                    changeGame(selectedId, formData)
                        .then(data => {
                            onHide();
                            callback();
                        }).catch(err => console.log(err))
                } else {
                    createGame(formData)
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

    function clearDefaultGame() {
        defaultGame = {
            articul: '',
            fullName: '',
            shortName: '',
            image: '',
            photo: '',
            price: 0,
            releaseDate: '',
            company: {},
            publisher: {},
            codeGames: [],
        }
        setImg("");
        setValues(defaultGame);
    }

    const updateGame = () => {
        getGameById(selectedId)
            .then(data => {
                defaultGame = gameFromApiToDefaultValue(data);
                setValues(prevValues => ({
                    ...data,
                    codeGames: data.codeGames
                }))
                setImg(data.photo)
                setSelectedPublisher(data.publisher)
                setSelectedDeveloper(data.company)
            })
            .catch(e => {
                alert(e.response.data.message);
            })
    }

    useEffect(() => {
        getAllPublishers()
            .then(pubs => {
                setPublishers(pubs)
            }).catch(err => alert('Не удалость загрузить издателей\n' + err))
        getAllDevelopers()
            .then(devs => {
                setDevelopers(devs)
            }).catch(err => alert('Не удалость загрузить разработчиков\n' + err))
        if (selectedId !== 0) {
            updateGame();
        } else {
            clearDefaultGame();
        }
        // getRoles().then(data => setRoles(data));
    }, [selectedId, setSelectedId]);

    const gameFromApiToDefaultValue = (data) => {
        return {
            fullName: data.fullName,
            shortName: data.shortName,
            description: data.description,
            photo: data.photo,
            price: data.price,
            releaseDate: formatDate(data.releaseDate),
            company: data.company,
            publisher: data.publisher,
            codeGames: data.codeGames,
        }
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        setImg(file);
    }

    const delCode = (id) => {
        if (!window.confirm("Вы уверены что хотите удалить код?")) return;

        deleteCode(id)
            .then(data => {
                alert(data)
                setValues({
                    ...values,
                    codeGames: values.codeGames.filter(code => code.code !== id)
                });
            })
            .catch(err => {
                console.log(err.response.data.message);
                alert('Невозможно удалить код')
            })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size={"lg"}
        >
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
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            name="description"
                            className="mt-3"
                            placeholder="Введите описание"
                            value={values.description}
                            onChange={handleInputChange}
                            type={"text"}
                            isInvalid={!!errors.description}

                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Изображение</Form.Label><br/>
                        {values.photo && <ImageComponent fileName={values.photo} style={{maxHeight: 300, width: 'auto'}}/>}
                        <Form.Control type="file" onChange={handleImageChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="price"
                            className="mt-3"
                            placeholder="Введите цену..."
                            value={values.price}
                            onChange={handleInputChange}
                            type={"number"}
                            isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            className="mt-3"
                            name={"releaseDate"}
                            value={formatDateToInput(values.releaseDate)}
                            onChange={handleInputChange}
                            type={"date"}
                            isInvalid={!!errors.releaseDate}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.releaseDate}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <SelectComponent
                        values={developers}
                        selectedValue={selectedDeveloper} setSelectedValue={setSelectedDeveloper}
                        placeholder={"Выберите разработчика"}
                    />
                    <SelectComponent
                        values={publishers}
                        selectedValue={selectedPublisher} setSelectedValue={setSelectedPublisher}
                        placeholder={"Выберите издателя"}
                    />
                    {selectedId ? <div>
                        <h4>Ключи: </h4>
                        <hr/>
                        <Button variant={"outline-primary"} size={"sm"} onClick={handleShow}>
                            Добавить ключ
                        </Button>
                        {values.codeGames && values.codeGames.map(code =>
                            <Row className={"mt-2"} key={code.code}>
                                <Col md={4}>
                                    <Form.Control
                                        value={code.code}
                                        type={""}
                                        disabled
                                    />
                                </Col>
                                <Col md={4}>
                                    <Button variant={"outline-danger"}
                                            onClick={() => delCode(code.code)}>Удалить</Button>
                                </Col>
                            </Row>
                        )}
                    </div>
                    :
                    ''
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={reset}>
                        Сбросить
                    </Button>
                    <Button variant="primary" type={"submit"}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Form>

            <CodeGameModal
                show={showModal} onHide={handleClose}
                callback={updateGame}
                gameArticul={selectedId}
            />
        </Modal>
    );
};

export default GameModal;