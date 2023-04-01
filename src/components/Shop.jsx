import React from 'react'
import Announcement from './Announcement'
import Navbar from './Navbar'
import Products from './Products'

const Shop = () => {
    return (
        <div>
            <Announcement></Announcement>
            <Navbar></Navbar>
            <h1>Shopping Page..</h1>
            <Products/>
        </div>
    )
}

export default Shop
