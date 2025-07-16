import React from 'react'
import Container from '../src/component/Container'
import Navbar from './Layout/Navbar'
import UrlShortenerUI from '../src/pages/UrlShortenerUI'

const App = () => {
  return (
    <section>
        <Container>
            <Navbar/>
            <UrlShortenerUI/>

        </Container>
    </section>
  )
}

export default App