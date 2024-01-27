import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {getProfileDataAPI} from "../http/userAPI";
import CenterLoading from "../components/feutures/CenterLoading";
import ImageComponent from "../components/ImageComponent";
import ChangePasswordModal from "../components/modals/ChangePasswordModal";
import ProfileModal from "../components/modals/ProfileModal";

const Profile = () => {
    const [profileData, setProfileData] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModalPass, setShowModalPass] = useState(false);
    const [showModalProfileData, setShowModalProfileData] = useState(false);

    useEffect(() => {
        setLoading(true)
        getProfileDataAPI()
            .then(data => {
                setProfileData(data)
                setLoading(false)
            })
            .catch(err => console.error(err))
    }, []);

    const updateUserData = (updateUser) => {
        setProfileData({...profileData, user: updateUser})
    }

    const switchShowModalPass = () => {
        setShowModalPass(!showModalPass);
    }

    const switchShowModalProfileData = () => {
        setShowModalProfileData(!showModalProfileData);
    }

    return (
        <Container style={{paddingLeft: "9rem", paddingRight: "9rem"}}>
            <Row className={"justify-content-center"} style={{minHeight: "60%"}}>
                <Card className={"mt-2 w-100"} bg={"light"} text={"dark"}>
                    <Card.Header className={"text-center"}>
                        <Card.Title>Ваш профиль</Card.Title>
                    </Card.Header>
                    <Card.Body style={{minHeight: "40%", fontSize: "1.2em"}}>
                        {loading ?
                            <CenterLoading/>
                            :
                            <Container style={{paddingLeft: "5rem", paddingRight: "5rem", margin: "auto"}}>
                                <Row>
                                    <Col sm={4}>
                                        <b>Логин</b>
                                    </Col>
                                    <Col sm={8}>
                                        {profileData.user.login}
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col sm={4}>
                                        <b>Электронная почта</b>
                                    </Col>
                                    <Col sm={8}>
                                        {profileData.user.email}
                                    </Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col sm={4}>
                                        <b>Номер телефона</b>
                                    </Col>
                                    <Col sm={8}>
                                        {profileData.user.numberPhone}
                                    </Col>
                                </Row>
                            </Container>
                        }

                    </Card.Body>
                    <Card.Footer style={{paddingLeft: "5rem", paddingRight: "5rem"}}>
                        <Row className={"justify-content-end"}>
                            <Button variant={"secondary"} style={{marginRight: "1rem"}}
                                    onClick={switchShowModalProfileData}>Изменить данные</Button>
                            <Button variant={"secondary"} onClick={switchShowModalPass}>Изменить пароль</Button>
                        </Row>
                    </Card.Footer>
                </Card>
            </Row>
            <Row className={"mt-3"}>
                <h3>Ваша библиотека</h3>
                {loading ?
                    <CenterLoading/>
                    :
                    <Container>
                        {profileData.purchases.map((item, index) =>
                            <Card className={"ml-auto mr-auto mb-2 d-flex w-75"} key={item.id}>
                                <Row>
                                    <Col xs={3}>
                                        <ImageComponent fileName={item.codeGameNavigation.game.photo}
                                                        style={{height: 100}}/>
                                    </Col>
                                    <Col xs={5}>
                                        <Card.Body style={{padding: "7px 0"}}>
                                            <Card.Title>{item.codeGameNavigation.game.fullName}</Card.Title>
                                            <Card.Text
                                                className={"text-left"}><b>Платформа:</b> {item.codeGameNavigation.platform.fullName}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col xs={4} className={"d-flex align-items-end justify-content-end"}>
                                        <Button size={"sm"} variant={"warning"} className={"mr-2 mb-2"}>Скопировать
                                            код</Button>
                                    </Col>
                                </Row>
                            </Card>
                        )}
                        <ProfileModal show={showModalProfileData} onHide={switchShowModalProfileData}
                                      profileData={profileData.user} callback={updateUserData}/>
                    </Container>
                }
            </Row>
            <ChangePasswordModal show={showModalPass} onHide={switchShowModalPass}/>
        </Container>
    );
};

export default Profile;