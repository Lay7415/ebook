import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteFromLocalStorage } from '../../../utils/helpers'
import { setAuth } from '../../../store/authReducer/signInSlice'
import { ROUTES } from '../../../utils/constants/constants'
import { userRoleReducerActions } from '../../../store/userRoleSlice'
import Admin from '../../../assets/icons/Profile.svg'
import classes from './AdminIcon.module.css'
import WhiteWrapper from '../WhiteWrapper/WhiteWrapper'

const AdminIcon = () => {
   const [state, setState] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onChangeHandler = () => {
      setState((prevState) => !prevState)
   }

   const logOut = () => {
      deleteFromLocalStorage('EbookUserToken')
      dispatch(setAuth.logout())
      dispatch(userRoleReducerActions.cleanRoleData())
      navigate(ROUTES.CLIENT_MAIN_PAGE)
   }

   return (
      <div
         className={classes.admin}
         role="presentation"
         onClick={onChangeHandler}
      >
         <div className={classes.modal}>
            {state && (
               <WhiteWrapper onClick={logOut} className={classes.logout}>
                  Выйти
               </WhiteWrapper>
            )}
         </div>
         <img className={classes.img} src={Admin} alt="" />
         <span className={classes.title}>Administrator</span>
      </div>
   )
}

export default AdminIcon
