import { Search, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'


import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height : 60px;
    flex : 0;
`

const Wrapper = styled.div`
padding : 1px 10px;
display : flex;
justify-content : space-between;
align-items : center;
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
`

const Navbar = () => {
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
                <Center><h1>LAMA.</h1></Center>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Sign In</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartCheckoutOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
