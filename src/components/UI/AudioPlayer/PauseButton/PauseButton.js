import classes from './PauseButton.module.css'
import pause from '../../../../assets/icons/pause.svg'

const PauseButton = ({ onClick }) => {
   return (
      <div role="presentation" onClick={onClick}>
         <img
            className={classes.pauseIcon}
            src={pause}
            alt="this button for pause audio"
         />
      </div>
   )
}

export default PauseButton
