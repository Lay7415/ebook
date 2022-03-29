import classes from './InformationInCardApplicationBook.module.css'

const InformationInCardApplicationBook = ({ bookName, date, netPrice }) => {
   return (
      <div className={classes.info}>
         <div>
            <p className={classes.title}>{bookName}</p>
         </div>
         <div className={classes.smallInfoContainer}>
            <p className={classes.date}>{date}</p>
            <p className={classes.price}>{netPrice} С</p>
         </div>
      </div>
   )
}

export default InformationInCardApplicationBook
