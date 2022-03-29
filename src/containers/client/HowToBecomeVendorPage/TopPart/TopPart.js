import classes from './TopPart.module.css'
import HowToBecomeVendorPageHeader from './HowToBecomeVendorPageHeader/HowToBecomeVendorPageHeader'
import TopPartContent from './TopPartContent/TopPartContent'

const TopPart = () => {
   return (
      <div className={classes.topPartContainer}>
         <HowToBecomeVendorPageHeader />
         <TopPartContent />
      </div>
   )
}

export default TopPart
