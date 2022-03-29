import classes from './ModalForDelete.module.css'
import Modal from '../modal/ModalWindow'
import Button from '../Button/Button'

const ModalForDelete = ({ fullName, onClose, onDelete }) => {
   return (
      <Modal>
         <div className={classes.containerForContent}>
            <div className={classes.containerForText}>
               <p>Вы уверены, что хотите удалить</p>
               <p>
                  <b className={classes.name}>{fullName}</b> ?
               </p>
            </div>
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

export default ModalForDelete
