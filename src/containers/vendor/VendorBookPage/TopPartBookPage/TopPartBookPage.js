import classes from './TopPartBookPage.module.css'
import ContainerForBriefInformation from './ContainerForBriefInformation/ContainerForBriefInformation'
import SmallContainer from './SmallContainer/SmallContainer'
import BookActionButtons from './BookActionButtons/BookActionButtons'
import { notPhoto } from '../../../../utils/constants/books'
import { getImageUrl } from '../../../../utils/helpers'

const TopPartBookPage = ({ book, sendDeletedBook }) => {
   const firstImage =
      book?.images[0]?.id === undefined
         ? notPhoto
         : getImageUrl(book?.images[0]?.id)

   const secondImage =
      book?.images[1]?.id === undefined
         ? notPhoto
         : getImageUrl(book?.images[1]?.id)

   return (
      <div className={classes.meddiumContainer}>
         <img
            className={classes.firstImage}
            src={firstImage}
            alt="some images"
         />
         <img
            className={classes.secondImage}
            src={secondImage}
            alt="some images"
         />
         <div className={classes.containerForInformation}>
            <h1 className={classes.title}>{book.bookName}</h1>
            <SmallContainer book={book} />
            <ContainerForBriefInformation book={book} />
            <BookActionButtons
               sendDeletedBook={sendDeletedBook}
               bookName={book.bookName}
               bookId={book.bookId}
            />
         </div>
      </div>
   )
}

export default TopPartBookPage
