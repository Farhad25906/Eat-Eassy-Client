import { Outlet } from 'react-router-dom'
// import Navbar from '../Components/Shared/Navbar/Navbar'
import Footer from '../Components/Shared/Footer/Footer'
import Navbars from '../Components/Shared/Navbar/Navbars'
const Main = () => {
  return (
    <div>
      <Navbars />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main