import { useForm } from 'react-hook-form'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import AuthButton from '../../../UI/authButton/AuthButton'
import InputField from '../../../UI/inputField/InputField'
import classes from './VendorRegistrationForm.module.css'
import isEye from '../../../../assets/png/isEye.png'
import eye from '../../../../assets/png/eye.png'
import { EMAIL, PASSWORD } from '../../../../utils/constants/constants'
import { authFetch } from '../../../../store/authReducer/signInSlice'
import LoadingSpinner from '../../../UI/modal-window/loadingSpinner/LoadingSpinner'

const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

const schema = yup.object().shape({
   firstName: yup.string().required('First Name should be required please'),
   lastName: yup.string().required(),
   phoneNumber: yup.string().matches(phoneRegex, 'Invalid phone.'),
   email: yup.string().email().required(),
   password: yup.string().min(6).max(15).required(),
   confrimpassword: yup.string().oneOf([yup.ref('password'), null]),
})

const VendorRegistration = () => {
   const dispatch = useDispatch()
   const { error, status } = useSelector((state) => state.authorization)
   const vendorRegistrationUrl = 'api/vendor/signup/vendor'

   const {
      register,
      handleSubmit,
      formState: { errors, isValid },
   } = useForm({ mode: 'all', resolver: yupResolver(schema) })

   const submitHadnler = useCallback(
      (ebookUser) => {
         const transformedData = ebookUser
         delete transformedData.confrimpassword
         const ebookUserInfo = {
            url: vendorRegistrationUrl,
            method: 'POST',
            body: ebookUser,
         }
         dispatch(authFetch(ebookUserInfo))
      },
      [dispatch]
   )

   const [isPasswordShown, setIsPasswordShown] = useState(false)

   const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false)

   const togglePassword = () => {
      setIsPasswordShown((prevState) => !prevState)
   }

   const toggleisConfirmPasswordShown = () => {
      setisConfirmPasswordShown((prevState) => !prevState)
   }

   const getErrorMessage = () => {
      const isHasErrorMessage =
         (errors.firstName && 'Забыли заполнить имя') ||
         (errors.email && 'Введите коррекный Email') ||
         (errors.password && 'Длина пароля должна быть не менее 5 символов') ||
         (errors.confrimpassword && 'Пороли не совподают') ||
         (errors.phoneNumber && 'Введите корретный номер') ||
         (errors.lastName && 'Забыли заполнить фамилию') ||
         (error && `An error occured: ${error}`)
      return isHasErrorMessage
   }

   return (
      <form className={classes.form} onSubmit={handleSubmit(submitHadnler)}>
         <InputField
            type="text"
            placeholder="Напишите ваше имя"
            label="Ваше имя"
            {...register('firstName')}
            hasError={errors.firstName}
         />
         <InputField
            type="text"
            placeholder="Напишите вашу фамилию"
            label="Ваша фамилия"
            {...register('lastName')}
            hasError={errors.lastName}
         />
         <InputField
            type="tel"
            placeholder="+996 (_ _ _) _ _  _ _  _ _"
            label="Номер вашего телефона"
            maxLength="13"
            {...register('phoneNumber')}
            hasError={errors.phoneNumber}
         />
         <InputField
            type="email"
            placeholder="Напишите ваш email"
            label="Email"
            {...register(EMAIL)}
            hasError={errors.email}
         />
         <div className={classes.forAbsolute}>
            <InputField
               type={isPasswordShown ? 'text' : 'password'}
               placeholder="Напишите пароль"
               label="Пароль"
               autoComplete="off"
               {...register(PASSWORD)}
               hasError={errors.password}
            />
            <img
               className={classes.pngOfPassword}
               src={isPasswordShown ? isEye : eye}
               alt=""
               onClick={togglePassword}
               role="presentation"
            />

            <InputField
               type={isConfirmPasswordShown ? 'text' : 'password'}
               placeholder="Подтвердите пароль"
               label="Подтвердите пароль"
               autoComplete="off"
               {...register('confrimpassword')}
               hasError={errors.confrimpassword}
            />
            <img
               className={classes.pngOfPassword}
               src={isConfirmPasswordShown ? isEye : eye}
               alt=""
               onClick={toggleisConfirmPasswordShown}
               role="presentation"
            />
         </div>
         <p className={classes.message}>{getErrorMessage()}</p>
         {status === 'loading' && <LoadingSpinner />}
         {status === 'loading' && <p>Loading....</p>}
         <AuthButton type="submit" disabled={!isValid}>
            Создать аккаунт
         </AuthButton>
      </form>
   )
}

export default VendorRegistration
