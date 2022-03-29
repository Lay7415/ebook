import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classes from './BreadCrumbs.module.css'

const BreadCrumbs = () => {
   const breadcrumbs = useSelector((state) => state.bread.breadCrumbsData)

   return (
      <div className={classes.containerForLocations}>
         {breadcrumbs &&
            breadcrumbs.map((breadcrumb) => {
               return breadcrumb.route ? (
                  <Link
                     className={classes.link}
                     key={breadcrumb.route_name}
                     to={breadcrumb.route}
                  >
                     <p className={classes.previousLocation}>
                        {breadcrumb.route_name} /
                     </p>
                  </Link>
               ) : (
                  <p
                     key={breadcrumb.route_name}
                     className={classes.currentLocation}
                  >
                     {breadcrumb.route_name}
                  </p>
               )
            })}
      </div>
   )
}

export default BreadCrumbs
