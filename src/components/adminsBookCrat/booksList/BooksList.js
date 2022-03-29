import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../../utils/constants/constants'
import VendorBookCard from '../../UI/VendorBookCard/VendorBookCard'
import classes from './BooksList.module.css'

const BooksList = (props) => {
   const { books } = props
   const userRole = useSelector((state) => state.role.roleData)

   const navigate = useNavigate()
   const onGetBookId = (bookInfo) => {
      if (userRole === 'ADMIN') {
         navigate(`${ROUTES.ADMIN_BOOK_PAGE}/${bookInfo.id}`)
      }
      if (userRole === 'VENDOR') {
         navigate(`${ROUTES.VENDOR_BOOK_PAGE}/${bookInfo.id}`)
      }
      return ''
   }

   const renderBook =
      books.length !== 0 ? (
         books.map((book) => (
            <VendorBookCard
               book={book}
               key={book.bookId}
               onGetBookId={onGetBookId}
               id={book.bookId}
            />
         ))
      ) : (
         <div className={classes.notFoundBox}>
            <div className={classes.notFoundImage} />
         </div>
      )
   return <div className={classes.bookslistbox}>{renderBook}</div>
}
export default BooksList
