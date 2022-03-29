import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './BookActionButtons.module.css'
import Button from '../../../../../components/UI/Button/Button'
import DeletingBook from '../../ModalForDeleteBook/ModalForDeleteBook'
import { ROUTES } from '../../../../../utils/constants/constants'

const BookActionButtons = ({ bookName, bookId, sendDeletedBook }) => {
   const [isShowDeleteModal, setShowDeleteModal] = useState(false)

   const showBookHundler = () => {
      setShowDeleteModal((isShowDeleteModal) => !isShowDeleteModal)
   }

   const onDeleteHundler = () => {
      setShowDeleteModal((isShowDeleteModal) => !isShowDeleteModal)
      sendDeletedBook(bookId)
      // there will be deleting
   }
   const navigate = useNavigate()

   const redirectToEditPage = () => {
      navigate(`${ROUTES.ADD_BOOKS}/${bookId}`)
   }

   const onCloseHundler = () => {
      setShowDeleteModal((isShowDeleteModal) => !isShowDeleteModal)
   }

   return (
      <div className={classes.containerForBtn}>
         <Button
            onClick={showBookHundler}
            variant="light"
            className={classes.button}
         >
            Удалить
         </Button>
         <Button
            variant="secondary"
            className={classes.button}
            onClick={redirectToEditPage}
         >
            Редактировать
         </Button>
         {isShowDeleteModal && (
            <DeletingBook
               onDelete={onDeleteHundler}
               onClose={onCloseHundler}
               bookName={bookName}
            />
         )}
      </div>
   )
}

export default BookActionButtons
