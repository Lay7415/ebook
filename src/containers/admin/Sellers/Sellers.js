import { useState, useEffect } from 'react'
import { sendRequest } from '../../../utils/helpers'
import classes from './Sellers.module.css'
import SellerList from './SellerList/SellerList'

const Sellers = () => {
   const [sellers, setSellers] = useState([])

   const getAllSellers = async () => {
      try {
         const url = { url: 'api/vendor/getAll' }
         const response = await sendRequest(url)
         await setSellers(response)
      } catch (error) {
         console.log(error.message)
      }
   }

   const sendRequestDeleteSeller = async (id) => {
      try {
         const sellerUrl = {
            url: `api/vendor/deleteById/${id}`,
            method: 'DELETE',
         }
         await sendRequest(sellerUrl)
      } catch (error) {
         console.log(error.messa)
      }
   }

   useEffect(() => {
      getAllSellers()
   }, [])

   return (
      <div className={classes.box}>
         <div className={classes.containerTitle}>
            <p>
               <b>№</b>
            </p>
            <p className={classes.mediumBox}>
               <b>Ф.И.</b>
            </p>
            <p className={classes.mediumBox}>
               <b>Номер телефона</b>
            </p>
            <p className={classes.mediumBox}>
               <b>Почта</b>
            </p>
            <p className={classes.mediumBox}>
               <b>Количество книг</b>
            </p>
         </div>
         <hr className={classes.line} />
         <div className={classes.containerList}>
            <SellerList
               sendRequestDeleteSeller={sendRequestDeleteSeller}
               sellerList={sellers}
            />
         </div>
      </div>
   )
}

export default Sellers
