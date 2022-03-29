import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import UpdateInput from '../../../components/UI/vendorUpdateInput/UpdateInput'
import classes from './UpdateClientAccount.module.css'
import { ReactComponent as ShowPassword } from '../../../assets/icons/passwordEye.svg'
import { ReactComponent as HidePassword } from '../../../assets/icons/hidePassword.svg'
import { sendRequest, deleteFromLocalStorage } from '../../../utils/helpers'
import SuccessfulMessage from '../../../components/UI/successMessage/SuccessfulMessage'
import ModalForDelete from '../../../components/UI/ModalForDelete/ModalForDelete'
import { authFetch, setAuth } from '../../../store/authReducer/signInSlice'
import { userRoleReducerActions } from '../../../store/userRoleSlice'
import { ROUTES } from '../../../utils/constants/constants'
import Modal from '../../../components/UI/modal-window/ModalWindow'
import {
   AUTHENTICATION_URL,
   DELETE_CLIENT_BY_ID,
   UPDATE_CLIENT_BY_ID,
} from '../../../utils/constants/urls'

const UpdateClientFormAccount = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [isModal, setIsModal] = useState(false)
   const [success, setSuccessMessage] = useState({
      error: null,
      bookName: '',
      message: '',
   })
   const [modalForDelete, setModalForDelete] = useState(false)

   const modalForDeleteChangeHandler = () => {
      setModalForDelete((prevState) => !prevState)
   }
   const modalChangeHandler = () => {
      setIsModal((prevState) => !prevState)
   }

   const [userInfo, setUserInfo] = useState(null)
   const getUserInfo = useCallback(async () => {
      const requestConfig = {
         method: 'GET',
         url: 'api/clients/show/info',
      }
      const response = await sendRequest(requestConfig)
      return setUserInfo(response)
   }, [])

   useEffect(() => {
      getUserInfo()
   }, [])

   const [isPasswordShown, setIsPasswordShown] = useState(true)
   const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(true)
   const [newPassword, setNewPassword] = useState(true)

   const { register, handleSubmit } = useForm({ mode: 'all' })

   const togglePassword = () => {
      setIsPasswordShown((prevState) => !prevState)
   }
   const toggleConfirmPassword = () => {
      setisConfirmPasswordShown((prevState) => !prevState)
   }
   const toggleNewPassword = () => {
      setNewPassword((prevState) => !prevState)
   }

   const showPassword = isPasswordShown ? (
      <ShowPassword
         onClick={togglePassword}
         className={classes.passwordInputIcons}
      />
   ) : (
      <HidePassword
         onClick={togglePassword}
         className={classes.passwordInputIcons2}
      />
   )

   const showConfirmPassword = isConfirmPasswordShown ? (
      <ShowPassword
         onClick={toggleConfirmPassword}
         className={classes.passwordInputIcons}
      />
   ) : (
      <HidePassword
         onClick={toggleConfirmPassword}
         className={classes.passwordInputIcons2}
      />
   )

   const showNewPassword = newPassword ? (
      <ShowPassword
         onClick={toggleNewPassword}
         className={classes.passwordInputIcons}
      />
   ) : (
      <HidePassword
         onClick={toggleNewPassword}
         className={classes.passwordInputIcons2}
      />
   )

   const typeOfPasswordInput = isPasswordShown ? 'password' : 'text'
   const typeOfConfirmInput = isConfirmPasswordShown ? 'password' : 'text'
   const typeOfNewPasswordInput = newPassword ? 'password' : 'text'

   const submitHandler = async (data) => {
      const { password, name, email, currentPassword } = data
      const updateEmail = !email ? userInfo.email : email
      const updateName = !name ? userInfo.name : name
      const transformedData = {
         newPassword: password,
         currentPassword,
         email: updateEmail,
         name: updateName,
      }
      try {
         const responseConfig = {
            method: 'PUT',
            url: UPDATE_CLIENT_BY_ID + userInfo.clientId,
            body: transformedData,
         }
         const response = await sendRequest(responseConfig)
         setSuccessMessage({
            bookName: userInfo.name,
            error: '',
            message: 'Ваши данные успешно изменены',
         })
         const { email: newEmail } = response

         const exchangedPassword = !password ? currentPassword : password
         const getNewToken = {
            email: newEmail,
            password: exchangedPassword,
         }
         const ebookUserInfo = {
            url: AUTHENTICATION_URL,
            method: 'POST',
            body: getNewToken,
         }
         if (response) {
            await dispatch(authFetch(ebookUserInfo))
         }
         return setIsModal(true)
      } catch (error) {
         setSuccessMessage({
            error: error.message || 'Введите корректный пароль',
         })
         return setIsModal(true)
      }
   }

   const deleteVendorAccount = async () => {
      const responseConfig = {
         method: 'DELETE',
         url: DELETE_CLIENT_BY_ID + userInfo.clientId,
      }
      await sendRequest(responseConfig)
      deleteFromLocalStorage('EbookUserToken')
      dispatch(setAuth.logout())
      dispatch(userRoleReducerActions.cleanRoleData())
      navigate(ROUTES.CLIENT_MAIN_PAGE)
   }

   return (
      <form
         className={classes.vendorUpdateForm}
         onSubmit={handleSubmit(submitHandler)}
      >
         {isModal && (
            <Modal onClose={modalChangeHandler}>
               <SuccessfulMessage
                  apiAnswer={success}
                  onClose={modalChangeHandler}
               />
            </Modal>
         )}
         <div className={classes.vendorUpdateFormFirstBox}>
            <h1 className={classes.vendorUpdateFormh1}>Личная информация</h1>
            <UpdateInput
               label="Ваше имя"
               placeholder="Напишите ваше имя"
               type="text"
               id="name"
               className={classes.updateInputs}
               {...register('name')}
               defaultValue={userInfo?.name}
            />
            <UpdateInput
               label="Email"
               placeholder="Напишите ваш Email"
               id="email"
               type="email"
               className={classes.updateInputs}
               {...register('email')}
               defaultValue={userInfo?.email}
            />
            <button
               type="button"
               className={classes.deleteAccountBtn}
               onClick={modalForDeleteChangeHandler}
            >
               Удалить профиль?
            </button>
            {modalForDelete && (
               <ModalForDelete
                  onClose={modalForDeleteChangeHandler}
                  onDelete={deleteVendorAccount}
                  fullName={userInfo.name}
               />
            )}
         </div>
         <div>
            <h1 className={classes.vendorUpdateFormh1}>Изменить пароль</h1>
            <div className={classes.vendorUpdateFormSecondBox}>
               <UpdateInput
                  label="Текущий пароль"
                  placeholder="Напишите текущий пароль"
                  type={typeOfPasswordInput}
                  id="password"
                  className={classes.updateInputs}
                  {...register('currentPassword')}
                  autoComplete="off"
               />
               <p className={classes.forAbsoluteUpdate}>{showPassword}</p>
               <UpdateInput
                  label="Новый пароль"
                  placeholder="Напишите ваш новый пароль"
                  type={typeOfConfirmInput}
                  id="newPassword"
                  className={classes.updateInputs}
                  {...register('password')}
                  autoComplete="off"
               />
               <p className={classes.forAbsoluteUpdate2}>
                  {showConfirmPassword}
               </p>
               <UpdateInput
                  label="Подтвердите пароль"
                  placeholder="Подтвердите пароль"
                  type={typeOfNewPasswordInput}
                  id="confirm"
                  className={classes.updateInputs}
                  {...register('confirmPassword')}
                  autoComplete="off"
               />
               <p className={classes.forAbsoluteUpdate3}>{showNewPassword}</p>
            </div>
            <div>
               <button type="button" className={classes.vendorUpdateSaveBtn}>
                  Отменить
               </button>
               <button type="submit" className={classes.vendorUpdateSaveBtn}>
                  Сохранить
               </button>
            </div>
         </div>
      </form>
   )
}
export default UpdateClientFormAccount
