import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import SelectComponent from "../SelectComponent";

const ProfileModal = ({show, onHide}) => {
    return (
        <Modal show={show} onHide={onHide} size={"lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Изменение данных</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">
                    Сбросить
                </Button>
                <Button variant="primary">
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;