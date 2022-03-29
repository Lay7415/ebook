import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteFromLocalStorage } from '../../../utils/helpers'
import { setAuth } from '../../../store/authReducer/signInSlice'
import { ROUTES } from '../../../utils/constants/constants'
import { userRoleReducerActions } from '../../../store/userRoleSlice'
import Admin from '../../../assets/icons/Profile.svg'
import { ReactComponent as Arrow } from '../../../assets/icons/arowdown.svg'
import classes from './VendorIcon.module.css'
import WhiteWrapper from '../WhiteWrapper/WhiteWrapper'
import Button from '../Button/Button'
import Modal from '../modal-window/ModalWindow'

const VendorIcon = () => {
   const [state, setState] = useState(false)
   const [show, setShow] = useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const onChangeHandler = () => {
      setState((state) => !state)
   }

   const onChangeLogoutHandler = () => {
      setShow((show) => !show)
   }

   const logOut = () => {
      deleteFromLocalStorage('EbookUserToken')
      dispatch(setAuth.logout())
      dispatch(userRoleReducerActions.cleanRoleData())
      navigate(ROUTES.CLIENT_MAIN_PAGE)
   }

   return (
      <div
         className={classes.vendor}
         role="presentation"
         onClick={onChangeHandler}
      >
         <div className={classes.modal}>
            {state && (
               <WhiteWrapper className={classes.popUp}>
                  <p
                     onClick={onChangeLogoutHandler}
                     role="presentation"
                     className={classes.log}
                  >
                     Выйти
                  </p>
                  <Link to={ROUTES.PROFILE_UPDATE}>
                     <p role="presentation" className={classes.prof}>
                        Профиль
                     </p>
                  </Link>
               </WhiteWrapper>
            )}
         </div>
         {show && (
            <Modal onClose={onChangeLogoutHandler}>
               <div className={classes.logoutModal}>
                  Вы уверены что хотите выйти ?
                  <div className={classes.buttons}>
                     <Button onClick={onChangeLogoutHandler} variant="cancel">
                        Отменить
                     </Button>
                     <Button onClick={logOut}>Выйти</Button>
                  </div>
               </div>
            </Modal>
         )}
         <img className={classes.img} src={Admin} alt="" />
         <span className={classes.title}>
            <Arrow />{' '}
         </span>
      </div>
   )
}

export default VendorIcon
