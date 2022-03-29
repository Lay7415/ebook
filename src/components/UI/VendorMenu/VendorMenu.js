import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from './VendorMenu.module.css'
import Button from '../Button/Button'
import { ROUTES } from '../../../utils/constants/constants'
import { PROMO_CREATE } from '../../../utils/constants/urls'
import { ReactComponent as I } from '../../../assets/icons/i.svg'
import { ReactComponent as Plus } from '../../../assets/icons/addBookPlus.svg'
import PromoCodeModal from '../PromoCodeModal/PromoCodeModal'
import { sendRequest } from '../../../utils/helpers'
import { ReactComponent as Succes } from '../../../assets/icons/successful-icon.svg'
import Modal from '../modal-window/ModalWindow'

const VendorMenu = () => {
   const [promo, setPromo] = useState(false)
   const [succes, setSucces] = useState(false)

   const PromoCodeChangeHAndler = () => {
      setPromo((promo) => !promo)
   }

   const SuccesChangeHAndler = () => {
      setSucces((succes) => !succes)
   }

   const sendRequestPromoCode = async (data) => {
      try {
         const confiqRequset = { url: PROMO_CREATE, method: 'POST', body: data }
         const response = await sendRequest(confiqRequset)
         setSucces((succes) => !succes)
         console.log(response)
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className={classes.container}>
         <div className={classes.craete}>
            <Button variant="create" onClick={PromoCodeChangeHAndler}>
               Создать промокод
            </Button>
            <I className={classes.icon} />
            {succes && (
               <div className={classes.succes}>
                  <Modal onClose={SuccesChangeHAndler}>
                     <Succes className={classes.succesIcon} />
                     <p className={classes.succesMessage}>
                        Промокод успешно создан!
                     </p>
                  </Modal>
               </div>
            )}
         </div>
         {promo && (
            <PromoCodeModal
               onClose={PromoCodeChangeHAndler}
               sendRequestPromoCode={sendRequestPromoCode}
            />
         )}
         <Link to={ROUTES.ADDBOOKS}>
            <button className={classes.addBooksButton} type="button">
               <Plus className={classes.plusforbtn} /> Добавить Книгу
            </button>
         </Link>
      </div>
   )
}

export default VendorMenu
