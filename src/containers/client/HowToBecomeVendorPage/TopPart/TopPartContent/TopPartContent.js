import { useState } from 'react'
import classes from './TopPartContent.module.css'
import Button from '../../../../../components/UI/Button/Button'
import { ReactComponent as GirlSitOnBooksImage } from '../../../../../assets/icons/girlSitOnBook.svg'
import { ReactComponent as PortalToBookWorldImage } from '../../../../../assets/icons/portalToBookWorld.svg'
import AuthModal from '../../../../../components/auth/authModal/AuthModal'

const TopPartContent = () => {
   const [vendor, setVendor] = useState(false)
   const HowToBecomeVendor = () => {
      setVendor((vendor) => !vendor)
   }
   return (
      <div className={classes.topPartContentContentContainer}>
         <div className={classes.textContainer}>
            <PortalToBookWorldImage
               className={classes.portalToBookWorldImage}
            />
            <p className={classes.text}>
               Начните продавать свои книги на eBook
            </p>
            <Button
               className={classes.button}
               variant="variantBecomeToSeller"
               onClick={HowToBecomeVendor}
            >
               Стать продавцом
            </Button>
            {vendor && <AuthModal onClose={HowToBecomeVendor}>a</AuthModal>}
         </div>
         <GirlSitOnBooksImage className={classes.girlSitOnBooksImage} />
      </div>
   )
}

export default TopPartContent
