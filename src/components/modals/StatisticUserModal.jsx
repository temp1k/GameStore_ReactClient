import React, {Suspense} from 'react';
import {Modal} from "react-bootstrap";
import TrafficDistribution from "../TrafficDistribution";

const StatisticUserModal = ({show, onHide, users}) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Body>
                <Suspense fallback={<div>Идет загрузка графика...</div>}>
                    <TrafficDistribution values={users}/>
                </Suspense>
            </Modal.Body>
        </Modal>
    );
};

export default StatisticUserModal;