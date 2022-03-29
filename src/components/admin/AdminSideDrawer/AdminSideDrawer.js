import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import classes from './AdminSideDrawer.module.css'
import { ROUTES } from '../../../utils/constants/constants'
import { SideDrawerItem } from '../SideDrawerItem/SideDrawer'
import EBookLogo from '../../UI/EBookLogo/EBookLogo'

const SideDrawer = () => {
   const location = useLocation()
   const [isActive, setIsActive] = useState(location.pathname)
   const onChangeActiveHandler = (activeKey) => {
      setIsActive(activeKey)
   }

   return (
      <div className={classes.container}>
         <div className={classes.containerForEbookLogo}>
            <EBookLogo />
         </div>
         <div className={classes.ul}>
            {ROUTES.SIDE_DRAWER_DATA.map((item) => (
               <SideDrawerItem
                  location={location.pathname}
                  key={item.route_name}
                  activeKey={item.activeKey}
                  isActive={isActive}
                  routeName={item.route_name}
                  routePath={item.route_path}
                  onChangeHandler={onChangeActiveHandler}
                  routeActiveicon={item.route_Activeicon}
                  routeIcon={item.route_icon}
               />
            ))}
         </div>
      </div>
   )
}

export default SideDrawer
