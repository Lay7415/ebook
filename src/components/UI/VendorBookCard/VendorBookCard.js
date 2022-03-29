import React, { useState } from 'react'
import classes from './VendorBookCard.module.css'
import TopPartInVendorCard from './TopPartInVendorCard/TopPartInVendorCard'
import PopUp from './PopUp/PopUp'
import InformationInCardVendorBook from './InformationInCardVendorBook/InformationInCardVendorBook'
import { getImageUrl } from '../../../utils/helpers'

const VendorBookCard = (props) => {
   const { book, isOpen, className, onGetBookId, sendRequestLike, id } = props
   const [popUpShown, setPopUpShown] = useState(false)
   const popUpChangeHandler = () => {
      setPopUpShown((prevState) => !prevState)
   }
   const imageSrc = getImageUrl(book.image.id)

   const onClickImageHandler = () => {
      onGetBookId({ id, bookName: book.bookName })
   }

   return (
      <div className={classes.containterVendorBookCard}>
         <div className={classes.styles}>
            <div
               id={book.bookId}
               role="presentation"
               className={`${classes.card} ${className}`}
               onClick={isOpen}
               key={book.bookId}
            >
               <TopPartInVendorCard
                  id={book.bookId}
                  sendRequestLike={sendRequestLike}
                  numberOfFavorites={book.likes}
                  numberOfBasket={book.inBasket}
                  popUpChangeHandler={popUpChangeHandler}
               />
               {popUpShown && <PopUp id={book.bookId} />}
               <img
                  className={classes.vedorbookcardimg}
                  src={imageSrc}
                  alt=""
                  role="presentation"
                  onClick={onClickImageHandler}
               />
               <InformationInCardVendorBook
                  bookName={book.bookName}
                  date={book.date}
                  netPrice={book.netPrice}
               />
            </div>
         </div>
      </div>
   )
}

export default VendorBookCard
