import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {getMyPurchasesAPI} from "../http/purchasesAPI";

const Profile = () => {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        getMyPurchasesAPI()
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <Container>
            Здесь будет профиль
        </Container>
    );
};

export default Profile;