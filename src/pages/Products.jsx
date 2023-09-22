import React from 'react'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { useEffect, useState } from "react";
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from "../responsive";
import AxiosConfig from "../components/AxiosConfig"
import { useDispatch } from 'react-redux';
import { incremented } from '../redux/counterSlice';
import { addProduct } from '../redux/productSlice';


const Container = styled.div` `;

const Image = styled.img`
    width : 30vh;
    padding : 30px;
    margin-right : 150px;
    border-radius: 15px;
    background-color : snow;
    transition: transform .5s ease;
    cursor : pointer;
`;

const ImageContainer = styled.div`
    height : 100%;
    padding : 30px;
    display : flex;
    align-items : center;
    justify-content : center;
`

const ImageDesc = styled.div`
    padding : 50px;
    border-radius : 15px;
    background-color : snow;
`;

const Title = styled.div`
    align-items : center;
    justify-content : center;
    margin-bottom : 30px;
`;

const Price = styled.div`
    display : flex;
    align-items : center;
    justify-content : left;
    margin-bottom : 10px;
`;

const Desc = styled.div`
    align-items : center;
    justify-content : center;
    margin-bottom : 10px;
`;

const Btn = styled.button`
 align-items : center;
 justify-content : center;
 width : 90px;
 height : 30px;
 background-color: hsla(40, 72%, 50%, 1);
 border: 1px solid hsla(40, 72%, 60%, 1);
 white-space: nowrap;
 color: hsla(150, 14%, 97%, 1);
 cursor: pointer;
 outline: none;
 text-shadow: 0.1rem 0.1rem 0.5rem hsla(0, 0%, 0%, 0.5);
 border-radius: 0.5rem;
 user-select: none;
 margin: 1rem;
 transition: all 0.1s ease-in;

 &:hover {
  background-color: hsla(40, 72%, 60%, 1);
  transform: translateY(-3px);
 }

 &:active {
  background-color: hsla(40, 72%, 35%, 1);
 }
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const Products = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cartProducts, setCartProducts] = useState([]);

    const mouseHandlerIn = (evt) => {
        evt.target.style.transform = 'scale(1.5)';
    }

    const mouseHandlerOut = (evt) => {
        evt.target.style.transform = 'scale(1)';
    }

    const fetchData = async () => {
        try {
            const resp = await AxiosConfig.get("/product");
            setProducts(resp.data);
            setFilteredProducts(resp.data);
            console.log(resp.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const [category, setCategory] = useState([]);

    const catHandler = (e) => {
        setCategory(e.target.value);
    }

    useEffect(() => {
        if (category === 'all' ? setFilteredProducts(products) :
            setFilteredProducts(products.filter((items) => { return items.category === category })));
    }, [category])

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const addItemsToCart = (val) => {
        //setCount(count + 1);
        dispatch(incremented());
        //cartProducts.push(products.filter((items) => { return items.id === val }));
        //setCartProducts(cartProducts);
        const item = products.filter((items) => { return items.id === val });
        dispatch(addProduct(item));     
    }

    return (
        <Container>
            <Navbar count={count} cartProducts={cartProducts} />
            <Announcement />
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="cat" onChange={catHandler}>
                        <Option selected>
                            all
                        </Option>
                        <Option value="men's clothing">men</Option>
                        <Option value="women's clothing">women</Option>
                        <Option>jewelery</Option>
                        <Option>electronics</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select>
                        <Option selected>Newest</Option>
                        <Option>Price (asc)</Option>
                        <Option>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            {filteredProducts.map((items) => (
                <ImageContainer>
                    <Image key={items.key} src={process.env.PUBLIC_URL + items.image} onMouseOver={mouseHandlerIn} onMouseOut={mouseHandlerOut}></Image>
                    <ImageDesc>
                        <Title><h1>{items.title}</h1></Title>
                        <Price><h2>Price:</h2>&nbsp;{items.price}</Price>
                        <Desc>{items.description}</Desc>
                        <Btn onClick={() => addItemsToCart(items.id)}>ADD TO CART</Btn>
                    </ImageDesc>
                </ImageContainer>
            ))}
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default Products
