import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import styled from 'styled-components'

const Info = styled.div`
  opacity:0;
  position : absolute;
  top : 0;
  left : 0;
  width : 100%;
  height : 100%;
  display : flex;
  justify-content : center;
  align-items : center;
  color:white;
  transition: all 1.5s ease;
`;

const Container = styled.div`
  flex : 1;
  margin : 5px;
  min-width : 280px;
  height : 350px;
  display : flex;
  align-items: center;
  justify-content : center;
  position:relative;
  &:hover ${Info}{
    opacity:1;
  }
`;

const Image = styled.img`
  height : 75%;
  width : 80%;
  object-fit:cover;
`;

const Icon = styled.div`
  width : 35px;
  height : 35px;
  display : flex;
  justify-content : center;
  align-items : center;
  background-color:white;
  color:black;
  border-radius:50%;
  margin:10px;
  transition: all 0.5s ease;
  &:hover{
    background-color:lightgray;
    transform: scale(1.1);
  }
  cursor:pointer;
`;

const Products = ({ item }) => {
  return (
    <Container>
        <Image src={process.env.PUBLIC_URL + item.img}></Image>
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <FavoriteBorderOutlined />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Info>
    </Container>
  )
}

export default Products
