import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './BookActionButtons.module.css'
import Button from '../../../../../components/UI/Button/Button'
import ModalForReject from '../../../ModalForReject/ModalForReject'
import ModalForAccept from '../../ModalForAccept/ModalForAccept'

const BookActionButtons = ({
   bookName,
   bookId,
   sendRequestRejectingBook,
   sendRequestAcceptingBook,
   isShowAcceptModal,
   isShowRejectModal,
   setShowRejectModal,
}) => {
   const navigate = useNavigate()

   const showRejectModal = () => {
      setShowRejectModal((isShowRejectModal) => !isShowRejectModal)
   }

   const sendRejectingBookHundler = (sendingText) => {
      sendRequestRejectingBook(sendingText)
   }

   const showAcceptModal = () => {
      sendRequestAcceptingBook(bookId)
   }

   useEffect(() => {
      if (isShowAcceptModal === true) {
         const acceptTimer = setTimeout(() => {
            showAcceptModal()
            navigate(-1)
         }, 1500)
         if (isShowAcceptModal === true) {
            return acceptTimer
         }
         return () => {
            clearTimeout(acceptTimer)
         }
      }
      return ''
   }, [isShowAcceptModal])

   return (
      <div className={classes.containerForBtn}>
         <Button
            onClick={showRejectModal}
            variant="light"
            className={classes.button}
         >
            Отклонить
         </Button>
         <Button
            onClick={showAcceptModal}
            variant="secondary"
            className={classes.button}
         >
            Принять
         </Button>
         {isShowRejectModal && (
            <ModalForReject
               onClose={showRejectModal}
               bookId={bookId}
               sendRejectingBookHundler={sendRejectingBookHundler}
            />
         )}
         {isShowAcceptModal && (
            <ModalForAccept onClose={showAcceptModal} bookName={bookName} />
         )}
      </div>
   )
}

export default BookActionButtons
