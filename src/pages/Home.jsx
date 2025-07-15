import React from 'react'
import Header from '../component/Header'
import Steps from '../component/Steps'
import Description from '../component/Description'
import Testimonials from '../component/Testimonials'
import GenerateBtn from '../component/GenerateBtn'

const Home = () => {
  return (
    <div>
      <Header/>
      <Steps/>
      <Description/>
      <Testimonials/>
      <GenerateBtn/>
    </div>
  )
}

export default Home
