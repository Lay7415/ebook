import AdminIcon from '../../UI/adminIcon/AdminIcon'
import Search from '../../UI/Search/Search'
import classes from './HeaderAdmin.module.css'

const HeaderAdmin = () => {
   return (
      <div>
         <div className={classes.search}>
            <Search />
            <AdminIcon />
         </div>
      </div>
   )
}

export default HeaderAdmin
