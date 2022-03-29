import classes from './BookActionButtons.module.css'
import Button from '../../../../../components/UI/Button/Button'

const BookActionButtons = ({ bookId, sendToFavority, sendToBasket }) => {
   const addToFavorityHundler = () => {
      sendToFavority(bookId)
   }

   const addToBasketHundler = () => {
      sendToBasket(bookId)
   }

   return (
      <div className={classes.containerForBtn}>
         <Button
            onClick={addToFavorityHundler}
            variant="light"
            className={classes.button}
         >
            В избранное
         </Button>
         <Button
            onClick={addToBasketHundler}
            variant="secondary"
            className={classes.button}
         >
            Добавить в корзину
         </Button>
      </div>
   )
}

export default BookActionButtons
