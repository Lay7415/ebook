import classes from './TopPartVendorMainPage.module.css'
import VendorHeaderInMainPage from './VendorHeaderInMainPage/VendorHeaderInMainPage'
import ContentInTopPartVendorMainPage from './ContentInTopPartVendorMainPage/ContentInTopPartVendorMainPage'

const TopPartVendorMainPage = () => {
   return (
      <div className={classes.topPartVendorMainPageContainer}>
         <VendorHeaderInMainPage />
         <ContentInTopPartVendorMainPage />
      </div>
   )
}

export default TopPartVendorMainPage
