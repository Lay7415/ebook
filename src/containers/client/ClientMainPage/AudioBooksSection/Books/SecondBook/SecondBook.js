import classes from './SecondBooks.module.css'

const SecondBook = ({
   bookImage,
   bookAuthor,
   bookName,
   bookDuration,
   bookPrice,
   navigateToSingleBookPage,
   bookId,
}) => {
   return (
      <div className={classes.secondAudioBookContainer}>
         <img
            role="presentation"
            onClick={() => navigateToSingleBookPage({ bookId, bookName })}
            className={classes.image}
            src={bookImage}
            alt=""
         />
         <p className={classes.bookName}>{bookName}</p>
         <p className={classes.author}>{bookAuthor}</p>
         <div className={classes.otherInformations}>
            <p className={classes.duration}>
               <span>{bookDuration.hour ? `${bookDuration.hour} ч.` : ''}</span>
               <span>
                  {bookDuration.minute ? `${bookDuration.minute} мин.` : ''}
               </span>
               <span>
                  {bookDuration.second ? `${bookDuration.second} сек.` : ''}
               </span>
            </p>
            <p className={classes.price}>{bookPrice} C</p>
         </div>
      </div>
   )
}

export default SecondBook
