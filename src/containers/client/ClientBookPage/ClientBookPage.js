import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import classes from './ClientBookPage.module.css'
import TopPartBookPage from './TopPartBookPage/TopPartBookPage'
import BottomPartBookPage from './BottomPartBookPage/BottomPartBookPage'
import { GET_BOOK_BY_ID } from '../../../utils/constants/urls'
import { sendRequest } from '../../../utils/helpers'
import BreadCrumbs from '../../../components/UI/BreadCrumbs/BreadCrumbs'

const BookPage = () => {
   const { bookById } = useParams()
   const [bookInfo, setBookInfo] = useState()

   const sendRequestToFavority = (bookId) => {
      console.log(bookId)
   }
   const sendRequestToBasket = (bookId) => {
      console.log(bookId)
   }

   const getSingleBookById = async () => {
      try {
         const requestConfig = {
            method: 'GET',
            url: GET_BOOK_BY_ID + bookById,
         }
         const response = await sendRequest(requestConfig)
         await setBookInfo(response)
      } catch (error) {
         console.log(error.message)
      }
   }

   useEffect(async () => {
      await getSingleBookById()
   }, [bookById])

   return (
      <div className={classes.clientBookwrapper}>
         <BreadCrumbs />
         {bookInfo && (
            <div className={classes.ContainerForBook}>
               <TopPartBookPage
                  sendToBasket={sendRequestToBasket}
                  sendToFavority={sendRequestToFavority}
                  book={bookInfo}
               />
               <BottomPartBookPage book={bookInfo} />
            </div>
         )}
      </div>
   )
}

export default BookPage
