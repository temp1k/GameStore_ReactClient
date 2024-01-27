import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import CreditCartForm from "../components/CreditCartForm";
import {useHistory} from "react-router-dom";
import {PROFILE_ROUTE} from "../utils/consts";
import {useLocation} from "react-router-dom/cjs/react-router-dom";
import LoadModal from "../components/modals/LoadModal";
import {confirmBuyAPI} from "../http/purchasesAPI";

const EnterCart = () => {
    const history = useHistory();
    const location = useLocation();
    let items = location.state.items;
    const [loading, setLoading] = useState(false);
    console.log(items);

    const submitPay = () => {
        setLoading(true);
        confirmBuyAPI(items)
            .then(data => {
                setLoading(false);
                setTimeout(() => {
                    window.alert(data);
                    history.push(PROFILE_ROUTE);
                }, 500)
            })
            .catch(err => {
                setLoading(false);
                window.alert(err.response.data);
            })
    }

    return (
        <Container className={"p-lg-3 text-center h-100 align-items-center"}>
            <h3>Данные вашей карты:</h3>
            <div className={"d-flex justify-content-center mt-3"}>
                <CreditCartForm confirmPay={submitPay}/>
            </div>
            <LoadModal show={loading}/>
        </Container>
    );
};

export default EnterCart;