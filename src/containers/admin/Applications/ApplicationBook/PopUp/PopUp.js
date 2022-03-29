import { ReactComponent as RubishIcon } from '../../../../../assets/icons/rubish.svg'
import { ReactComponent as ReductorIcon } from '../../../../../assets/icons/akar-icons_cross.svg'
import classes from './PopUp.module.css'
import ModalForReject from '../../../ModalForReject/ModalForReject'

const PopUp = ({
   editBookRedirect,
   bookId,
   sendRequestRejectingBook,
   isShowRejectModal,
   setShowRejectModal,
}) => {
   const showRejectModal = () => {
      setShowRejectModal((isShowRejectModal) => !isShowRejectModal)
   }

   const sendRejectingBookHundler = (sendingText) => {
      sendRequestRejectingBook(sendingText)
   }

   const onEditHundler = () => {
      editBookRedirect(bookId)
   }

   return (
      <div className={classes.open}>
         <button
            type="button"
            onClick={onEditHundler}
            className={classes.redactor}
         >
            <RubishIcon className={classes.icon} /> Редактировать{' '}
         </button>
         <hr className={classes.line2} />
         <button
            type="button"
            onClick={showRejectModal}
            className={classes.redactor}
         >
            <ReductorIcon className={classes.icon} /> Отклонить
         </button>
         {isShowRejectModal && (
            <ModalForReject
               onClose={showRejectModal}
               bookId={bookId}
               sendRejectingBookHundler={sendRejectingBookHundler}
            />
         )}
      </div>
   )
}

export default PopUp
