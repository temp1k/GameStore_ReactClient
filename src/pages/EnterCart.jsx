import React from 'react';
import {Container} from "react-bootstrap";
import CreditCartForm from "../components/CreditCartForm";
import {useHistory} from "react-router-dom";
import {PROFILE_ROUTE} from "../utils/consts";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

const EnterCart = () => {
    const history = useHistory();
    const location = useLocation();
    let items = location.state.items;
    console.log(items);

    const submitPay = () => {
        alert('Вы успешно купили игры')
        history.push(PROFILE_ROUTE);
    }

    return (
        <Container className={"p-lg-3 text-center h-100 align-items-center"}>
            <h3>Данные вашей карты:</h3>
            <div className={"d-flex justify-content-center mt-3"}>
                <CreditCartForm confirmPay={submitPay}/>
            </div>
        </Container>
    );
};

export default EnterCart;