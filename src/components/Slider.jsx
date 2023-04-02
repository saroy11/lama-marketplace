import React from 'react'
import styled from 'styled-components'
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { sliderItems } from "../data"
import { useState } from 'react';

const Container = styled.div`
    width : 100%;
    height :100vh;
    display : flex;
    background-color : white;
    position : relative;
    overflow : hidden;
`
const Arrow = styled.div`
    width : 50px;
    height : 50px;
    background-color : lightgray;
    border-radius : 50%;
    display : flex;
    align-items : center;
    justify-content : center;
    position : absolute;
    top: 0;
    bottom: 0;
    left : ${props => props.direction === "left" && "10px"};
    right : ${props => props.direction === "right" && "10px"};
    margin : auto;
    cursor : pointer;
    opacity : 0.5;
    z-index : 2;
`

const Wrapper = styled.div`
    height : 100%;
    padding : 0px;
    display : flex;
`
const Slide = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    align-items : center;
    transition : all 1.5s ease;
    transform : translateX(-${props => props.slideIndex * 100}%);
    background-color : ${props => props.bgColour};
`
const ImageContainer = styled.div` 
    height : 100%;
    flex : 1;
`

const Image = styled.img`
    height : 80%;
    border-radius : 20%;
`

const InfoContainer = styled.div`
    flex : 1;
    padding : 50px;
`

const Title = styled.h1`
    font-size : 70px;
`
const Desc = styled.p`
    margin : 50px 0px;
    font-size : 20px;
    font-weight : 500;
    letter-spacing : 3px;
`
const Button = styled.button`
    padding : 10px;
    font-size : 20px;
    background-color : lightgray;
    cursor : pointer;
`

const Slider = () => {

    const [slideIndex, setslideIndex] = useState(0);
    const sliderData = sliderItems.length;

    const handleClick = (direction) => {

        if (direction === "right") {
            if (slideIndex === 0 || slideIndex < sliderData - 1 ? setslideIndex(slideIndex + 1) : setslideIndex(0));
        }
        if (direction === "left") {
            if (slideIndex === sliderData || slideIndex > 0 ? setslideIndex(slideIndex - 1) : setslideIndex(sliderData - 1));
        }
    };

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlinedIcon></ArrowLeftOutlinedIcon>
            </Arrow>
            <Wrapper >
                {sliderItems.map((items) => (
                    <Slide bgColour={items.bg} slideIndex={slideIndex} key={items.id}>
                        <ImageContainer>
                            <Image src={process.env.PUBLIC_URL + items.img}></Image>
                        </ImageContainer>
                        <InfoContainer>
                            <Title>{items.title}</Title>
                            <Desc>{items.desc}</Desc>
                            <Button>SHOP NOW</Button>
                        </InfoContainer>
                    </Slide>
                ))}

            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlinedIcon></ArrowRightOutlinedIcon>
            </Arrow>
        </Container>
    )
}

export default Slider

