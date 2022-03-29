import classes from './InformationInCard.module.css'

const InformationInCard = ({
   bookName,
   author,
   discount,
   netPrice,
   discountedPrice,
}) => {
   return (
      <div className={classes.info}>
         <div>
            <span className={classes.title}>{bookName}</span>
            <p className={classes.bookAuthor}>{author}</p>
         </div>
         <div className={classes.price}>
            <p className={classes.discount}>(-{discount}%)</p>
            <p className={classes.pastPrice}>{netPrice} c</p>
            <p className={classes.bookPrice}>{discountedPrice} c </p>
         </div>
      </div>
   )
}

export default InformationInCard
