import { ReactComponent as BellIcon } from '../../../assets/icons/ep_bell.svg'
import EBookLogo from '../../../components/UI/EBookLogo/EBookLogo'
import Search from '../../../components/UI/Search/Search'
import VendorIcon from '../../../components/UI/VendorIcon/VendorIcon'
import classes from './VendorHeader.module.css'

const VendorHeader = () => {
   return (
      <div className={classes.vendorHeaderContainer}>
         <EBookLogo />
         <Search />
         <BellIcon className={classes.bellIcon} />
         <VendorIcon />
      </div>
   )
}

export default VendorHeader
