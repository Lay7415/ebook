import classes from './HowToBecomeVendorPage.module.css'
import TopPart from './TopPart/TopPart'
import BottomPart from './BottomPart/BottomPart'
import VendorFooter from '../../../layout/VendorFooter/VendorFooter'

const HowToBecomeVendorPage = () => {
   return (
      <div className={classes.howToBecomeVendorPageWrapper}>
         <div className={classes.howToBecomeVendorPage}>
            <TopPart />
            <BottomPart />
         </div>
         ;
         <VendorFooter />
      </div>
   )
}

export default HowToBecomeVendorPage
