import React from 'react';
import {Modal, Spinner} from "react-bootstrap";

const LoadModal = ({show}) => {
    return (
        <Modal show={show} style={{top: "30%"}}>
            <Modal.Body className={"d-flex justify-content-center"}>
                <Spinner animation={"border"} role={"status"}>
                    <span className={"sr-only"}>Загрузка...</span>
                </Spinner>
            </Modal.Body>
        </Modal>
    );
};

export default LoadModal;