import React from 'react'
import AnnouncementBar from './AnnouncementBar'
import Navbar from './Navbar'
import ProductNavbar from './ProductNavbar'

const Header = () => {
  return (
    <header>
        <AnnouncementBar text={`Reduceri de până la 52% folosind codul de reducere`} cod="SPRINGSALE"/>
        <Navbar />
        <ProductNavbar />
    </header>
  )
}

export default Header