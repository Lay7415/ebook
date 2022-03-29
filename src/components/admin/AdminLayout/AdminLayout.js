import { Outlet } from 'react-router-dom'
import SideDrawer from '../AdminSideDrawer/AdminSideDrawer'
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import classes from './AdminLayout.module.css'

function AdminLayout() {
   return (
      <div className={classes.adminPage}>
         <SideDrawer />
         <div className={classes.box}>
            <HeaderAdmin />
            <Outlet />
         </div>
      </div>
   )
}

export default AdminLayout
