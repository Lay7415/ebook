import classes from './ModalForAccept.module.css'
import { ReactComponent as AcceptIcon } from '../../../../assets/icons/acceptIcon.svg'
import Modal from '../../../../components/UI/modal-window/ModalWindow'

const ModalForAccept = ({ bookName }) => {
   return (
      <Modal>
         <div className={classes.contentConatiner}>
            <div className={classes.acceptIconBox}>
               <AcceptIcon className={classes.acceptIcon} />
            </div>
            <p className={classes.bookName}>{`“${bookName}”`}</p>
            <p className={classes.acceptMessage}>был успешно принят!</p>
         </div>
      </Modal>
   )
}

export default ModalForAccept
