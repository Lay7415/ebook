import classes from './VendorHeaderInMainPage.module.css'
import EBookLogo from '../../../UI/EBookLogo/EBookLogo'
import Button from '../../../UI/Button/Button'

const VendorHeaderInMainPage = () => {
   return (
      <div className={classes.vendorHeaderInMainPageContainer}>
         <EBookLogo />
         <Button className={classes.buttonSize} variant="tertiary">
            Личный кабинет
         </Button>
      </div>
   )
}

export default VendorHeaderInMainPage
