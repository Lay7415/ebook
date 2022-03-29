import classes from './ModalForDeleteBook.module.css'
import Modal from '../../../../components/UI/modal-window/ModalWindow'
import Button from '../../../../components/UI/Button/Button'

const ModalForDeleteBook = ({ bookName, onClose, onDelete }) => {
   return (
      <Modal>
         <div className={classes.contentConatiner}>
            <p className={classes.deleteMessage}>
               Вы уверены, что хотите удалить
            </p>
            <p className={classes.bookName}>{`“${bookName}” ?`}</p>
            <div className={classes.containerForButtons}>
               <Button
                  className={classes.selectButton}
                  onClick={onClose}
                  variant="select"
               >
                  Отменить
               </Button>
               <Button onClick={onDelete}>Удалить</Button>
            </div>
         </div>
      </Modal>
   )
}

export default ModalForDeleteBook
