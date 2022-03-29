import classes from './HistoryOperationButtons.module.css'

const HistoryOperationButtons = ({
   location,
   numberOfParchased,
   changeToFavorites,
   changeToParchased,
   numberOfFavorites,
   changeToBasket,
   numberOfBasket,
}) => {
   return (
      <div className={classes.BooksLocationBar}>
         <button
            type="button"
            onClick={changeToParchased}
            className={
               location === 'parchased'
                  ? classes.historyOperationOrangeBtn
                  : classes.historyOperationBtn
            }
         >
            Купленные ({numberOfParchased} книг)
         </button>
         <button
            type="button"
            onClick={changeToFavorites}
            className={
               location === 'favorites'
                  ? classes.historyOperationOrangeBtn
                  : classes.historyOperationBtn
            }
         >
            Избранные ({numberOfFavorites} книг)
         </button>
         <button
            type="button"
            onClick={changeToBasket}
            className={
               location === 'basket'
                  ? classes.historyOperationOrangeBtn
                  : classes.historyOperationBtn
            }
         >
            В корзине ({numberOfBasket} книг)
         </button>
      </div>
   )
}

export default HistoryOperationButtons
