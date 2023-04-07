import { Search, ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

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
`
const Navbar = () => {

    const clickHandler = async () => {
        try {
            const resp = await axios.post("http://localhost:3001/api/payment/createOrder", {
                "amount": 200000
            });
            console.log(resp.data.id);
            makePayment(resp.data.id);
        } catch (err) {
            console.log(err);
        }
    }

    const makePayment = (id) => {

        console.log("inside makePayment " + id);

        const options = {
            "key_id": "rzp_test_XvVEwZAwS7PnEi", // Enter the Key ID generated from the Dashboard
            "amount": "200000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            //"callback_url": "http://localhost:3001/api/payment/verifyPayment",
            "handler": function (response) {
                verifymayment(response);
            },
            "prefill": {
                "name": "Sandeep Roy", //your customer's name
                "email": "sandeep.roy@hotmail.com",
                "contact": "9650777919"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    const verifymayment = async (response) => {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature)
        try {
            const resp = await axios.post("http://localhost:3001/api/payment/verifyPayment", {
                "razorpay_payment_id": response.razorpay_payment_id,
                "razorpay_order_id": response.razorpay_order_id,
                "razorpay_signature": response.razorpay_signature
            });
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }


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
                            <ShoppingCartCheckoutOutlined onClick={clickHandler} />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar
