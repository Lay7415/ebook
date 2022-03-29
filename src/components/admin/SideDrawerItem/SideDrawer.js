import { Link } from 'react-router-dom'
import classes from './SideDrawer.module.css'

export const SideDrawerItem = (props) => {
   const {
      location,
      routePath,
      activeKey,
      routeActiveicon,
      routeIcon,
      routeName,
      onChangeHandler,
   } = props

   function onClick() {
      onChangeHandler(activeKey)
   }

   return (
      <Link to={routePath}>
         <li
            onClick={onClick}
            role="presentation"
            className={
               location === routePath ? classes.liActive : classes.noActive
            }
         >
            <img
               alt=""
               className={classes.app}
               src={location === routePath ? routeActiveicon : routeIcon}
            />
            <span>{routeName}</span>
         </li>
      </Link>
   )
}
