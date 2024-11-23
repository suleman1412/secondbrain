import Footer from './Footer'
import Hero from './Hero'
import { NavBar } from './NavBar'

const Landing = () => {
    
    return(
        <div className=' p-2 mx-auto max-w-7xl flex flex-col min-h-screen '>
            <NavBar />
            <Hero />
            <Footer />
        </div>
    )
}



export default Landing