import classes from './BottomPartVendorMainPage.module.css'
import SectionHowToBecomeSeller from './SectionHowToBecomeSeller/SectionHowToBecomeSeller'
import SectionInConditions from './SectionInConditions/SectionInConditions'
import Button from '../../UI/Button/Button'

const BottomPartVendorMainPage = () => {
   return (
      <div className={classes.bottomPartVendorMainPageContainer}>
         <SectionHowToBecomeSeller />
         <SectionInConditions />
         <div className={classes.containerForButton}>
            <Button className={classes.button} variant="variantBecomeToSeller">
               Стать продавцом
            </Button>
         </div>
      </div>
   )
}

export default BottomPartVendorMainPage
