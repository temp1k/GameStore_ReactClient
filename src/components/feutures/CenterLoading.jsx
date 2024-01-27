import React from 'react';
import {Spinner} from "react-bootstrap";

const CenterLoading = () => {
    return (
        <div className={"d-flex h-75 w-100 justify-content-center align-items-center"}>
            <Spinner animation={"border"} role={"status"}>
                <span className={"sr-only"}>Загрузка...</span>
            </Spinner>
        </div>
    );
};

export default CenterLoading;