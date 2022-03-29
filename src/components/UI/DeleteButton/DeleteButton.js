import classes from './DeleteButton.module.css'
import deleteIcon from '../../../assets/icons/deleteIcon.svg'

const DeleteButton = ({ onClick }) => {
   return (
      <div
         role="presentation"
         onClick={onClick}
         className={classes.borderDeleteIcon}
      >
         <img src={deleteIcon} alt="delete icon" />
      </div>
   )
}

export default DeleteButton
