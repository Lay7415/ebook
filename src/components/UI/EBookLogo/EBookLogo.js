import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import BlackWrapper from '../BlackWrapper/BlackWrapper'
import classes from './EBookLogo.module.css'
import ebookLogo from '../../../assets/icons/eBooK.svg'
import { ROLES, ROUTES } from '../../../utils/constants/constants'

const EBookLogo = (props) => {
   const { propsClassName } = props
   const role = useSelector((state) => state.role.roleData)
   const navigate = useNavigate()

   const navigateToMainPage = () => {
      if (role === ROLES.ADMIN) {
         navigate(ROUTES.APPLICATIONS)
      }
      if (role === ROLES.VENDOR) {
         navigate(ROUTES.VENDOR_AREA)
      }
      if (role === undefined || role === ROLES.CLIENT) {
         navigate(ROUTES.CLIENT_MAIN_PAGE)
      }
   }
   return (
      <BlackWrapper
         onClick={navigateToMainPage}
         className={`${classes.ebookbox} ${propsClassName}`}
      >
         <img
            className={`${classes.ebookLogo} `}
            src={ebookLogo}
            alt="ebook logo"
         />
      </BlackWrapper>
   )
}

export default EBookLogo
