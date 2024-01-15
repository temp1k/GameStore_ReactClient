import React, {useEffect} from 'react';
import {Col, Container, ModalFooter, Row} from "react-bootstrap";
import {SlSocialVkontakte} from "react-icons/sl";
import {FaGamepad, FaGithub, FaHome, FaPhone, FaTelegram} from "react-icons/fa";
import {MdEmail} from "react-icons/md";
import {useLocation} from "react-router-dom/cjs/react-router-dom";

const Footer = () => {
    return (
        <footer className='text-center text-lg-start text-muted mt-auto' style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <section className='d-flex p-4 border-bottom'>
                <Container className={"d-flex"}>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Связь с нами через социальные сети:</span>
                    </div>

                    <div>
                        <a href='' className='ml-2 text-reset'>
                            <SlSocialVkontakte />
                        </a>
                        <a href='' className='ml-2 text-reset'>
                            <FaGithub icon="github" />
                        </a>
                        <a href='' className='ml-2 text-reset'>
                            <FaTelegram />
                        </a>
                    </div>
                </Container>
            </section>

            <section className=''>
                <Container className='text-center text-md-start mt-5'>
                    <Row className='mt-3'>
                        <Col md="4" lg="4" xl="4" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4 text-center'>
                                <FaGamepad icon="gem" className="me-3" />
                                GameStore
                            </h6>
                            <p>
                                Добро пожаловать в наш магазин игр, где вы найдете самые популярные и захватывающие игры для всех возрастов и интересов. Наш опытный персонал всегда готов помочь вам выбрать идеальную игру. Приходите к нам и откройте для себя мир увлекательных игр!
                            </p>
                        </Col>

                        <Col md="4" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Настройки
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Корзина
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Помощь
                                </a>
                            </p>
                        </Col>

                        <Col md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <FaHome className="me-2" />
                                Moscow, Moscow 10012, RU
                            </p>
                            <p>
                                <MdEmail className="me-3" />
                                info@example.com
                            </p>
                            <p>
                                <FaPhone className="me-3" /> + 01 234 567 88
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2023 Copyright:
                <a className='text-reset fw-bold' href='#'>
                    GameStore
                </a>
            </div>
        </footer>
    );
};

export default Footer;