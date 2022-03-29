import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from './AdminBookPage.module.css'
import TopPartBookPage from './TopPartBookPage/TopPartBookPage'
import BottomPartBookPage from './BottomPartBookPage/BottomPartBookPage'
import { sendRequest } from '../../../utils/helpers'
import { GET_BOOK_BY_ID, APPLICATIONS } from '../../../utils/constants/urls'
import BreadCrumbs from '../../../components/UI/BreadCrumbs/BreadCrumbs'

const BookPage = () => {
   const [bookInfo, setBookInfo] = useState()
   const [isShowAcceptModal, setShowAcceptModal] = useState(false)
   const [isShowRejectModal, setShowRejectModal] = useState(false)

   const navigate = useNavigate()
   const { bookById } = useParams()

   const sendRequestRejectingHundler = async (sentText) => {
      try {
         const configRequest = {
            url: APPLICATIONS.REJECT_APLLICATION,
            method: 'POST',
            body: sentText,
         }
         await sendRequest(configRequest)
         setShowRejectModal((isShowRejectModal) => !isShowRejectModal)
         navigate(-1)
      } catch (error) {
         console.log(error.message)
      }
   }

   const sendRequestAcceptingHundler = async (bookId) => {
      try {
         const configRequest = {
            url: `${APPLICATIONS.ACCEPT_APPLICATION}/${bookId}`,
            method: 'POST',
         }
         await sendRequest(configRequest)
         setShowAcceptModal((isShowAcceptModal) => !isShowAcceptModal)
      } catch (error) {
         console.log(error.message)
      }
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
      <div className={classes.adminBookWrapper}>
         <BreadCrumbs />
         {bookInfo && (
            <div className={classes.ContainerForBook}>
               <TopPartBookPage
                  book={bookInfo}
                  isShowAcceptModal={isShowAcceptModal}
                  isShowRejectModal={isShowRejectModal}
                  setShowRejectModal={setShowRejectModal}
                  sendRequestRejectingBook={sendRequestRejectingHundler}
                  sendRequestAcceptingBook={sendRequestAcceptingHundler}
               />
               <BottomPartBookPage book={bookInfo} />
            </div>
         )}
      </div>
   )
}

export default BookPage
