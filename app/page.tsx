import Image from 'next/image'
import Cards from './components/Cards'
import Carousel from './components/Carousel'
import Footer from './components/Footer'
import NavBar from './components/NavBar'

export default function Home() {
  return (
    <main className="">
      <NavBar />
      <Carousel />
      <Cards />
      <Footer />
    </main>
  )
}
