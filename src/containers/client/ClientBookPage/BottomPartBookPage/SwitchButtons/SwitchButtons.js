import classes from './SwitchButtons.module.css'
import Button from '../../../../../components/UI/Button/Button'
import { TYPEOFBOOK } from '../../../../../utils/constants/constants'

const SwitchButtons = (props) => {
   const { book, transition, redirectToAbout, redirectToFragment } = props

   return (
      <div className={classes.containerForSwitch}>
         <Button
            variant={
               transition === 'about'
                  ? 'redirectActiveButton'
                  : 'redirectButton'
            }
            onClick={redirectToAbout}
         >
            О книге
         </Button>
         {(book.typeOfBook === TYPEOFBOOK.ELECTRONICBOOK ||
            book.typeOfBook === TYPEOFBOOK.PAPERBOOK) && (
            <Button
               variant={
                  transition === 'fragment'
                     ? 'redirectActiveButton'
                     : 'redirectButton'
               }
               onClick={redirectToFragment}
            >
               Читать фрагмент
            </Button>
         )}
      </div>
   )
}

export default SwitchButtons
