import classes from './UserHeader.module.css'
import EBookLogo from '../../../components/UI/EBookLogo/EBookLogo'
import Search from '../../../components/UI/Search/Search'
import { ReactComponent as HeartIcon } from '../../../assets/icons/heart.svg'

const UserHeader = () => {
   return (
      <div className={classes.userHeaderContainer}>
         <EBookLogo />
         <Search />
         <div className={classes.notfications}>
            <HeartIcon className={classes.heartIcon} />
            <p className={classes.basket}>Корзина ()</p>
         </div>
      </div>
   )
}

export default UserHeader
