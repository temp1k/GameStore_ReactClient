import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import defaultImg from '../img/no_image.jpeg';
import {getImage} from "../http/imageAPI";
import {Spinner} from "react-bootstrap";

const ImageComponent = ({fileName, ...props}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getImageByte()
    }, [fileName]);

    const getImageByte = () => {
        setLoading(true);
        getImage(fileName)
            .then(data => {
                setImageUrl(data);
                setLoading(false);
            })
            .catch(err => {
                setImageUrl('');
                setLoading(false);
            })
    }

    if (loading) {
        return (
            <div style={{width: props.width, height: props.height, minHeight: 180}} className={"d-flex justify-content-center align-items-center"}>
                <Spinner animation={"border"} role={"status"} style={{marginRight: 50}}>
                    <span className={"sr-only"}>Загрузка...</span>
                </Spinner>
            </div>
        )
    }
    return (
        <>
            {imageUrl ?
                <Card.Img {...props} src={imageUrl} alt={'Изображение'}/>
                :
                <Card.Img {...props} src={defaultImg} alt={'Нет изображения'}/>}
        </>
    );
};

export default ImageComponent;