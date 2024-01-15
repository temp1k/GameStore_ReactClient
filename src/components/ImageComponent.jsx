import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import defaultImg from '../img/no_image.jpeg';
import {getImage} from "../http/imageAPI";

const ImageComponent = ({fileName, ...props}) => {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        getImageByte()
    }, [fileName]);

    const getImageByte = () => {
        getImage(fileName)
            .then(data => {
                setImageUrl(data);
            })
            .catch(err => {
                setImageUrl('')
            })
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