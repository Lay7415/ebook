import React, { useEffect, useState } from 'react'
import classes from './ApplicationBook.module.css'
import TopPartInApplicationCard from './TopPartInApplicationCard/TopPartInApplicationCard'
import PopUp from './PopUp/PopUp'
import InformationInCardApplicationBook from './InformationInCardApplicationBook/InformationInCardVendorBook'
import { getImageUrl } from '../../../../utils/helpers'

const ApplicationBook = (props) => {
   const {
      book,
      isOpen,
      className,
      navigateToBookPage,
      editBookRedirect,
      sendRequestRejectingBook,
      isShowRejectModal,
      setShowRejectModal,
   } = props

   const [popUpShown, setPopUpShown] = useState(false)
   const [imageSrc, setImgSrc] = useState()

   const popUpChangeHandler = () => {
      setPopUpShown((prevState) => !prevState)
   }

   const giveBookId = () => {
      navigateToBookPage({ bookId: book.bookId, bookName: book.bookName })
   }

   useEffect(async () => {
      try {
         const response = await getImageUrl(book.image.id)
         await setImgSrc(response)
      } catch (error) {
         console.log(error.message)
      }
   }, [])

   return (
      <div className={classes.styles}>
         <div
            id={book.bookId}
            role="presentation"
            className={`${classes.card} ${className}`}
            onClick={isOpen}
         >
            <TopPartInApplicationCard
               numberOfFavorites={book.numberOfFavorites}
               numberOfBasket={book.numberOfBasket}
               popUpChangeHandler={popUpChangeHandler}
            />
            {popUpShown && (
               <PopUp
                  isShowRejectModal={isShowRejectModal}
                  setShowRejectModal={setShowRejectModal}
                  sendRequestRejectingBook={sendRequestRejectingBook}
                  bookId={book.bookId}
                  editBookRedirect={editBookRedirect}
               />
            )}
            <img
               className={classes.vedorbookcardimg}
               src={imageSrc}
               alt=""
               role="presentation"
               onClick={giveBookId}
            />
            <InformationInCardApplicationBook
               bookName={book.bookName}
               date={`${book.storageDate.day} ${book.storageDate.month} ${book.storageDate.year}`}
               netPrice={book.price}
            />
         </div>
      </div>
   )
}

export default ApplicationBook
