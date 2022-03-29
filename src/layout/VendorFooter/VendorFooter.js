import classes from './VendorFooter.module.css'
import BlackWrapper from '../../components/UI/BlackWrapper/BlackWrapper'
import { ReactComponent as VendorEbookLogo } from '../../assets/icons/vendorEbookLogo.svg'

const VendorFooter = () => {
   return (
      <BlackWrapper className={classes.vendorFooterContainer}>
         <div className={classes.vendorFooterContent}>
            <div>
               <VendorEbookLogo className={classes.vendorEbookLogo} />
               <p className={classes.text}>Политика конфиденциальности</p>
            </div>
            <div>
               <p className={classes.boldText}>Свяжитесь с нами</p>
               <p className={classes.text}>+996 707 123 456</p>
               <p className={classes.text}>г. Бишкек ул. Исанова 45</p>
            </div>
         </div>
      </BlackWrapper>
   )
}

export default VendorFooter
