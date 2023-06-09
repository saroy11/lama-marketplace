import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  flex : 1;
  height : 30vw;
  margin : 3px;
  position : relative;
`
const Image = styled.img`
  width : 100%;
  height : 100%;
  object-fit : cover;
`
const Info = styled.div`
  position : absolute;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  display : flex;
  justify-content : center;
  align-items : center;
  flex-direction : column;
`
const Title = styled.h1`
  color : white;
  margin-bottom : 20px;

`
const Button = styled.button`
  border : none;
  padding : 10px;
  cursor : pointer;
  background-color : white;
  color : grey;
  font-weight : 600;
`
const CategoryItems = ({ item }) => {
  return (
    <Container>
      <Image src={process.env.PUBLIC_URL + item.img}></Image>
      <Info>
        <Title>{item.title}</Title>
        <Link to="/productList">
        <Button>SHOP NOW</Button>
        </Link>
      </Info>
    </Container>
  )
}

export default CategoryItems
