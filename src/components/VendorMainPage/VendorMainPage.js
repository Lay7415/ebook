import classes from './VendorMainPage.module.css'
import TopPartVendorMainPage from './TopPartVendorMainPage/TopPartVendorMainPage'
import BottomPartVendorMainPage from './BottomPartVendorMainPage/BottomPartVendorMainPage'
import VendorFooter from '../../layout/VendorFooter/VendorFooter'

const VendorMainPage = () => {
   return (
      <div className={classes.vendorMainPageWrapper}>
         <div className={classes.vendorMainPageContainer}>
            <TopPartVendorMainPage />
            <BottomPartVendorMainPage />
         </div>
         ;
         <VendorFooter />
      </div>
   )
}

export default VendorMainPage
