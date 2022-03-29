import { Outlet } from 'react-router-dom'
import Footer from '../../../layout/footer/Footer'
import UserHeader from '../../../layout/headers/UserHeader/UserHeader'
import UserNavMenu from '../../UI/UserNavMenu/UserNavMenu'
import classes from './ClientLayout.module.css'

const ClientLayout = () => {
   return (
      <div className={classes.clientLayoutContainer}>
         <UserHeader />
         <UserNavMenu />
         <Outlet />
         <Footer />
      </div>
   )
}

export default ClientLayout
