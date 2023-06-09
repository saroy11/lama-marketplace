import React from 'react'
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Product from '../components/Product'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Slider></Slider>
      <Categories></Categories>
      <Product></Product>
      <Newsletter></Newsletter>
      <Footer></Footer>
    </div>
  )
}

export default Home
