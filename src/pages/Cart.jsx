import React, { useEffect, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import AxiosConfig from "../components/AxiosConfig"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { decremented, incremented } from "../redux/counterSlice";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  padding : 22px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 100px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [cartLen, setCartLen] = useState([]);
  const [cartProducts, setcartProducts] = useState([]);
  const cartItems = useSelector(state=>state.counter.value);
  const productItems = useSelector(state=>state.product.product);

  useEffect(() => {
    /*const { cartProducts } = location.state;
    const len = cartProducts.length;
    const len = productItems.length;
    len > 0 ? setCartLen(len) : setCartLen(0);
    setcartProducts(location.state.cartProducts.flat(Infinity))*/
    setcartProducts(productItems.flat(Infinity));
  }, []);

  const clickHandler = async () => {
    try {
      const resp = await AxiosConfig.post("/payment/createOrder", {
        "amount": 200000
      });
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
      const resp = await AxiosConfig.post("/payment/verifyPayment", {
        "razorpay_payment_id": response.razorpay_payment_id,
        "razorpay_order_id": response.razorpay_order_id,
        "razorpay_signature": response.razorpay_signature
      });
      console.log(resp);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  const dispatch = useDispatch();

  const addItem = ()=> {
    dispatch(incremented());
  }

  const removeItem = ()=> {
    dispatch(decremented());
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={()=>navigate("/products")}>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag ({cartItems})</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cartProducts.map((items) => (
                <Product>
                  <ProductDetail>
                    <Image src={items.image} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {items.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {items._id}
                      </ProductId>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add onClick={addItem}/>
                      <ProductAmount>2</ProductAmount>
                      <Remove onClick={removeItem}/>
                    </ProductAmountContainer>
                    <ProductPrice>{items.price}</ProductPrice>
                  </PriceDetail>
                </Product>
              ))
            }
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={clickHandler}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;