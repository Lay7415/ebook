import classes from './HistoryOperationItem.module.css'

const HistoryOperationItem = ({
   bookName,
   author,
   booksum,
   promocode,
   price,
   discount,
   dataRegistration,
   state,
}) => {
   return (
      <div className={classes.bookLi}>
         <img
            className={classes.historyImage}
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc_screen.jpg?ts=1637008457"
            alt="dsdfdf"
         />
         <div>
            <p className={classes.bookNameInformation}>{bookName}</p>
            <p className={classes.bookNameInformation}>{author}</p>
         </div>
         <p className={classes.numberOfBoook}>{booksum} шт</p>
         <div className={classes.aboutPrice}>
            <p className={classes.promocode}>промокод {promocode}%</p>
            <p>
               <span className={classes.withoutDiscount}>{price} c</span>
               {discount} c
            </p>
         </div>
         <p className={classes.dataRegistration}>{dataRegistration}</p>
         <p className={classes.state}>{state}</p>
      </div>
   )
}

export default HistoryOperationItem
