import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './PromoCodeModal.module.css'
import Modal from '../modal-window/ModalWindow'
import { ReactComponent as Bug } from '../../../assets/icons/bug.svg'

const schema = yup.object().shape({
   promoName: yup.string().required(),
   startingDay: yup.string().required(),
   finishingDay: yup.string().required(),
   percent: yup.number().min(1).max(99).required(),
})
const PromoCodeModal = ({ onClose, sendRequestPromoCode }) => {
   const createPromoCode = (data) => {
      sendRequestPromoCode({
         promoName: data.promoName,
         startingDay: data.startingDay,
         finishingDay: data.finishingDay,
         percent: data.percent,
      })
      onClose()
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      mode: 'all',
      resolver: yupResolver(schema),
   })
   let today = new Date()
   const dd = String(today.getDate()).padStart(2, '0')
   const mm = String(today.getMonth() + 1).padStart(2, '0')
   const yyyy = today.getFullYear()
   today = `${yyyy}-${mm}-${dd}`

   return (
      <Modal onClose={onClose}>
         <form onSubmit={handleSubmit(createPromoCode)}>
            <div className={classes.title}>
               Промокод
               <input
                  className={`${
                     errors.promoName ? classes.errors : classes.promo
                  }`}
                  placeholder="Напишите промокод"
                  {...register('promoName')}
               />
            </div>
            <div className={classes.foot}>
               <div className={classes.title}>
                  Дата начала
                  <input
                     className={`${
                        errors.startingDay ? classes.errorsData : classes.data
                     }`}
                     placeholder="гг/мм/дд"
                     {...register('startingDay')}
                     defaultValue={today}
                  />
                  <Bug className={classes.bugIconPromo} />
               </div>
               <div className={classes.title}>
                  Дата завершения
                  <input
                     className={`${
                        errors.finishingDay
                           ? classes.errorsFinish
                           : classes.finish
                     }`}
                     placeholder="гг/мм/дд"
                     {...register('finishingDay')}
                  />
                  <Bug className={classes.bugIconPromo} />
               </div>
               <div className={classes.title}>
                  Процент скидки
                  <input
                     className={`${
                        errors.percent ? classes.errorsPersent : classes.percent
                     }`}
                     placeholder="%"
                     {...register('percent')}
                  />
               </div>
            </div>
            <div className={classes.button}>
               <button type="submit" className={classes.createButton}>
                  Создать
               </button>
            </div>
         </form>
      </Modal>
   )
}
export default PromoCodeModal
