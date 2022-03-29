import classes from './SellerList.module.css'
import SellerItem from './SellerItem/SellerItem'

const SellerList = ({ sellerList, sendRequestDeleteSeller }) => {
   return (
      <div>
         <ol className={classes.list}>
            {sellerList &&
               sellerList !== [] &&
               sellerList.map((seller) => {
                  return (
                     <SellerItem
                        sendRequestDeleteSeller={sendRequestDeleteSeller}
                        firstName={seller.firstName}
                        lastName={seller.lastName}
                        phoneNumber={seller.phoneNumber}
                        email={seller.email}
                        booksum={seller.booksum}
                        id={seller.vendorId}
                        key={seller.vendorId}
                     />
                  )
               })}
         </ol>
      </div>
   )
}

export default SellerList
