import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './BookDescription.module.css'
import Button from '../../../../../components/UI/Button/Button'
import { ROUTES } from '../../../../../utils/constants/constants'
import { asyncUpdateBreadcrumb } from '../../../../../store/breadCrumbsSlice'

const BookDescription = ({ aboutBook, price, bookId, bookName }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const navigateToSingleBookPage = () => {
      const breadCrumbs = [
         {
            route_name: 'Главная',
            route: ROUTES.CLIENT_MAIN_PAGE,
         },
         {
            route_name: bookName,
         },
      ]
      dispatch(asyncUpdateBreadcrumb(breadCrumbs))
      navigate(`${ROUTES.CLIENT_BOOK_PAGE}/${bookId}`)
   }
   return (
      <div className={classes.bookDescription}>
         <p className={classes.bookTitle}>ИСТОРИЯ КНИГИ</p>
         <p className={classes.aboutBook}>{aboutBook}</p>
         <div className={classes.bottomPartAboutBook}>
            <Button onClick={navigateToSingleBookPage} variant="aboutMoreBtn">
               Подробнее
            </Button>
            <p className={classes.price}>{price} C</p>
         </div>
      </div>
   )
}

export default BookDescription
