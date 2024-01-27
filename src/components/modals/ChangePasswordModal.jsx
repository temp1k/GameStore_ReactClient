import React from 'react';
import {Button, Modal} from "react-bootstrap";

const ChangePasswordModal = ({show, onHide}) => {
    return (
        <Modal show={show} onHide={onHide} size={"sm"}>
            <Modal.Header closeButton>
                <Modal.Title>Смена пароля</Modal.Title>
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

export default ChangePasswordModal;