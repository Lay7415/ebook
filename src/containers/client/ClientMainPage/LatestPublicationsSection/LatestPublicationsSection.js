import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './LatestPublicationsSection.module.css'
import Button from '../../../../components/UI/Button/Button'
import BlackWrapper from '../../../../components/UI/BlackWrapper/BlackWrapper'
import Genres from './Genres/Genres'
import BookDescription from './BookDescription/BookDescription'
import { ROUTES } from '../../../../utils/constants/constants'
import { asyncUpdateBreadcrumb } from '../../../../store/breadCrumbsSlice'

const LatestPublicationsSection = ({ lastBooks, imageLastBooks }) => {
   const [genreCounter, setGengreCounter] = useState(0)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const bookResonse = lastBooks[genreCounter].bookResponse
      ? lastBooks[genreCounter].bookResponse
      : ''

   const navigateToSortPage = () => {
      navigate(ROUTES.SORT)
   }

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
      <BlackWrapper className={classes.latestPublicationsSectionContainer}>
         <div className={classes.sectionTopPart}>
            <h2 className={classes.containerTitle}>Последние публикации</h2>
            <Button onClick={navigateToSortPage} variant="aboutMoreBtn">
               Смотреть все
            </Button>
         </div>
         <div className={classes.bookContent}>
            <Genres lastBooks={lastBooks} setGengreCounter={setGengreCounter} />
            <div className={classes.imageContainer}>
               <img
                  role="presentation"
                  onClick={() =>
                     navigateToSingleBookPage({
                        bookId: bookResonse.bookId,
                        bookName: bookResonse.bookName,
                     })
                  }
                  className={classes.image}
                  src={imageLastBooks[genreCounter]}
                  alt=""
               />
            </div>
            <BookDescription
               bookId={bookResonse.bookId}
               bookName={bookResonse.bookName}
               aboutBook={bookResonse ? bookResonse.description : ''}
               price={bookResonse ? bookResonse.price : ''}
            />
         </div>
      </BlackWrapper>
   )
}

export default LatestPublicationsSection
