import { Search, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"

const Container = styled.div`
    height : 60px;
    flex : 0;
`

const Wrapper = styled.div`
padding : 1px 10px;
display : flex;
justify-content : space-between;
align-items : center;
background-color : seashell;
`

const Left = styled.div`
 flex : 1;
 display : flex;
 align-items : center;
`

const Center = styled.div`
flex : 1;
text-align:center;
`

const Right = styled.div`
flex : 1;
display : flex;
padding : 2px;
align-items : center;
justify-content : flex-end;
`

const Language = styled.span`
font-size : 14px;
cursor : pointer;
`


const SearchContainer = styled.div`
border : 1px solid lightgray;
display : flex;
align-items : center;
margin-left: 25px;
padding:5px;
`

const Input = styled.div`
border : none;
width : 150px;
`

const MenuItem = styled.div`
border : none;
margin : 25px;
cursor : pointer;
`

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'inherit'
};

const Navbar = (props) => {

    const navigate = useNavigate();

    const clickHandler = (cartProducts) => {
        navigate("/cart", {
            state: { cartProducts }
        });
    }

    const cartItems = useSelector(state => state.counter.value);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input />
                        <Search style={{ color: "gray", fontSize: "16px" }} />
                    </SearchContainer>
                </Left>
                <Center><h1><Link to="/" style={linkStyle}>LAMA.</Link></h1></Center>
                <Right>
                    <MenuItem onClick={() => navigate("/register")}>Register</MenuItem>
                    <MenuItem onClick={() => navigate("/login")}>Sign In</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={cartItems} color="primary">
                            <ShoppingCartCheckoutOutlined onClick={() => clickHandler(props.cartProducts)} />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
