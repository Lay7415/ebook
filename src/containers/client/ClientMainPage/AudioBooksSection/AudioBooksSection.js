// import { audioBooks } from '../../../../utils/constants/books'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import FirstBook from './Books/FirstBook/FirstBook'
import SecondBook from './Books/SecondBook/SecondBook'
import ThirdBook from './Books/ThirdBook/ThirdBook'
import classes from './AudioBooksSection.module.css'
import Button from '../../../../components/UI/Button/Button'
import { ROUTES } from '../../../../utils/constants/constants'
import { asyncUpdateBreadcrumb } from '../../../../store/breadCrumbsSlice'

const AudioBooksSection = ({ audioBooks, imageAudioBooks }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

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
      <div className={classes.audioBooksSectionContainer}>
         <div className={classes.sectionTopPart}>
            <h2>Аудиокниги</h2>
            <Button onClick={navigateToSortPage} variant="aboutMoreBtn">
               Смотреть все
            </Button>
         </div>
         <div className={classes.bookContent}>
            <FirstBook
               bookImage={imageAudioBooks[0]}
               bookAuthor={audioBooks[0].author}
               bookId={audioBooks[0].bookId}
               bookName={audioBooks[0].bookName}
               bookDuration={audioBooks[0].duration}
               bookPrice={audioBooks[0].price}
               navigateToSingleBookPage={navigateToSingleBookPage}
            />
            <SecondBook
               bookImage={imageAudioBooks[1]}
               bookAuthor={audioBooks[1].author}
               bookId={audioBooks[1].bookId}
               bookName={audioBooks[1].bookName}
               bookDuration={audioBooks[1].duration}
               bookPrice={audioBooks[1].price}
               navigateToSingleBookPage={navigateToSingleBookPage}
            />
            <ThirdBook
               bookImage={imageAudioBooks[2]}
               bookAuthor={audioBooks[2].author}
               bookId={audioBooks[2].bookId}
               bookName={audioBooks[2].bookName}
               bookDuration={audioBooks[2].duration}
               bookPrice={audioBooks[2].price}
               navigateToSingleBookPage={navigateToSingleBookPage}
            />
         </div>
      </div>
   )
}

export default AudioBooksSection
