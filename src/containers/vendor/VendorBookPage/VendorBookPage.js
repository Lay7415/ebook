import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classes from './VendorBookPage.module.css'
import TopPartBookPage from './TopPartBookPage/TopPartBookPage'
import BottomPartBookPage from './BottomPartBookPage/BottomPartBookPage'
import { GET_BOOK_BY_ID } from '../../../utils/constants/urls'
import { sendRequest } from '../../../utils/helpers'
import BreadCrumbs from '../../../components/UI/BreadCrumbs/BreadCrumbs'

const BookPage = () => {
   const { bookById } = useParams()
   const [bookInfo, setBookInfo] = useState()

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

   useEffect(() => {
      getSingleBookById()
   }, [bookById])

   const sendDeletedBookHundler = (bookId) => {
      console.log(bookId)
      // book delete api
   }

   return (
      <div className={classes.vendorBookWrapper}>
         <BreadCrumbs />
         {bookInfo && (
            <div className={classes.ContainerForBook}>
               <TopPartBookPage
                  sendDeletedBook={sendDeletedBookHundler}
                  book={bookInfo}
               />
               <BottomPartBookPage book={bookInfo} />
            </div>
         )}
      </div>
   )
}

export default BookPage
