import React from 'react'
import { favProducts } from '../data'
import Products from './Products'
import styled from 'styled-components'

const Container = styled.div`
    display : flex;
    flex-wrap : wrap;
    padding : 20px;
    justify-content : space-between;
`

const Product = () => {
    return (
        <Container>
            {
                favProducts.map(item => (
                    <Products item={item} key={item.id} />
                ))
            }
        </Container>
    )
}

export default Product
