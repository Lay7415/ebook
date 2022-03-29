import { useState } from 'react'
import classes from './BottomPart.module.css'
import StartSection from './StartSection/StartSection'
import Conditions from './Conditions/Conditions'
import Button from '../../../../components/UI/Button/Button'
import AuthModal from '../../../../components/auth/authModal/AuthModal'

const BottomPart = () => {
   const [vendor, setVendor] = useState(false)
   const HowToBecomeVendor = () => {
      setVendor((vendor) => !vendor)
   }
   return (
      <div className={classes.bottomPartContainer}>
         <StartSection />
         <Conditions />
         <div className={classes.containerForButton}>
            <Button
               className={classes.button}
               variant="variantBecomeToSeller"
               onClick={HowToBecomeVendor}
            >
               Стать продавцом
            </Button>
         </div>
         {vendor && <AuthModal onClose={HowToBecomeVendor}>_</AuthModal>}
      </div>
   )
}

export default BottomPart
