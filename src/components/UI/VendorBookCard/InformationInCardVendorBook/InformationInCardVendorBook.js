import classes from './InformationInCardVendorBook.module.css'

const InformationInCardVendorBook = ({ bookName, date, netPrice }) => {
   return (
      <div className={classes.info}>
         <div>
            <p className={classes.title}>{bookName}</p>
            <p className={classes.date}>{date}</p>
         </div>
         <div className={classes.pricel}>
            <p className={classes.price}>{netPrice} С</p>
         </div>
      </div>
   )
}

export default InformationInCardVendorBook
