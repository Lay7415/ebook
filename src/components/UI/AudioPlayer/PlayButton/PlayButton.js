import classes from './PlayButton.module.css'
import play from '../../../../assets/icons/playAudio.svg'

const PlayButton = ({ onClick }) => {
   return (
      <div role="presentation" onClick={onClick}>
         <img
            className={classes.playIcon}
            src={play}
            alt="this button for play audio"
         />
      </div>
   )
}

export default PlayButton
