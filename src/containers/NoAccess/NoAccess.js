import { useNavigate } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import { ROUTES } from '../../utils/constants/constants'
import classes from './NoAccess.module.css'

const NoAccess = () => {
   const navigate = useNavigate()
   return (
      <div className={classes.noaccess}>
         <span className={classes.title}>Нет доступа !</span>
         <p className={classes.p}>
            Уважаемый взломщик, мошенник, хакер у вас нет доступа к этой
            странице, пожалуйста вернитесь обратно в главную страницу чтобы
            зарегистрироваться!
         </p>
         <Button
            variant="goBack"
            className={classes.button}
            onClick={() => {
               navigate(ROUTES.CLIENT_MAIN_PAGE)
            }}
         >
            Вернутся на главную страницу
         </Button>
      </div>
   )
}

export default NoAccess
