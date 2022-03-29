import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classes from './PopUp.module.css'
import { ReactComponent as RubishIcon } from '../../../../assets/icons/rubish.svg'
import { ReactComponent as ReductorIcon } from '../../../../assets/icons/changeValue.svg'
import { ROLES, ROUTES } from '../../../../utils/constants/constants'

const PopUp = ({ id }) => {
   const navigate = useNavigate()
   const userRole = useSelector((state) => state.role.roleData)

   const onEditHundler = () => {
      if (userRole === ROLES.ADMIN) {
         navigate(`${ROUTES.ADD_BOOKS}/${id}`)
      }
      if (userRole === ROLES.VENDOR) {
         navigate(`${ROUTES.EDIT_BOOK}/${id}`)
      }
      // there will be function, which edit book
   }

   const onDeleteHundler = () => {
      // there will be function, which delete book
   }

   return (
      <div className={classes.open}>
         <button
            type="button"
            onClick={onEditHundler}
            className={classes.redactor}
         >
            <RubishIcon className={classes.rubishIcon} /> Редактировать{' '}
         </button>
         <hr className={classes.line2} />
         <button
            type="button"
            onClick={onDeleteHundler}
            className={classes.redactor}
         >
            <ReductorIcon className={classes.rubishIcon} /> Удалить
         </button>
      </div>
   )
}

export default PopUp
