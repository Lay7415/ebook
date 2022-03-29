import { Link } from 'react-router-dom'
import classes from './HowToBecomeVendorPageHeader.module.css'
import EBookLogo from '../../../../../components/UI/EBookLogo/EBookLogo'
import Button from '../../../../../components/UI/Button/Button'
import { ROUTES } from '../../../../../utils/constants/constants'

const HowToBecomeVendorPageHeader = () => {
   return (
      <div className={classes.howToBecomeVendorPageHeaderContainer}>
         <EBookLogo />
         <Link to={ROUTES.CLIENT_MAIN_PAGE}>
            <Button className={classes.buttonSize} variant="tertiary">
               Личный кабинет
            </Button>
         </Link>
      </div>
   )
}

export default HowToBecomeVendorPageHeader
