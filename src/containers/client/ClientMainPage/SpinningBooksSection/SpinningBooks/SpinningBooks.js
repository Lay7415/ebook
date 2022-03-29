import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { asyncUpdateBreadcrumb } from '../../../../../store/breadCrumbsSlice'
import { ROUTES } from '../../../../../utils/constants/constants'
import classes from './SpinningBooks.module.css'

const SpinningBooks = ({ books, topImageBooks }) => {
   const firstBook = { bookId: books[0].bookId, bookName: books[0].bookName }
   const secondBook = { bookId: books[1].bookId, bookName: books[1].bookName }
   const thirdBook = { bookId: books[2].bookId, bookName: books[2].bookName }
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const navigateToSingleBookPage = (bookInfo) => {
      const breadCrumbs = [
         {
            route_name: 'Главная',
            route: ROUTES.CLIENT_MAIN_PAGE,
         },
         {
            route_name: bookInfo.bookName,
         },
      ]
      dispatch(asyncUpdateBreadcrumb(breadCrumbs))
      navigate(`${ROUTES.CLIENT_BOOK_PAGE}/${bookInfo.bookId}`)
   }

   return (
      <div className={classes.spinningBooks}>
         <img
            role="presentation"
            onClick={() => navigateToSingleBookPage(firstBook)}
            className={classes.firstImage}
            src={topImageBooks[0]}
            alt=""
         />

         <div className={classes.secondImageContainer}>
            <img
               role="presentation"
               onClick={() => navigateToSingleBookPage(secondBook)}
               className={classes.secondImage}
               src={topImageBooks[1]}
               alt=""
            />
            <div>
               <p className={classes.bookName}>{books[1]?.bookName}</p>
               <div className={classes.aboutBook}>
                  <p className={classes.bookAuthor}>{books[1]?.author}</p>
                  <p className={classes.bookPrice}>{books[1]?.price} C</p>
               </div>
            </div>
         </div>

         <img
            role="presentation"
            onClick={() => navigateToSingleBookPage(thirdBook)}
            className={classes.thirdImage}
            src={topImageBooks[2]}
            alt=""
         />
      </div>
   )
}

export default SpinningBooks
