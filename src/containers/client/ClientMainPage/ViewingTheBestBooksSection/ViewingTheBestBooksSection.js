import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowButton } from '../../../../assets/icons/orangeArrow.svg'
import Button from '../../../../components/UI/Button/Button'
import { asyncUpdateBreadcrumb } from '../../../../store/breadCrumbsSlice'
import { ROUTES } from '../../../../utils/constants/constants'
import classes from './ViewingTheBestBooksSection.module.css'

const ViewingTheBestBooksSection = ({
   setBooks,
   setBookImages,
   sectionTitle,
   books,
   bookImages,
}) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const moveToLeft = () => {
      const lastbook = books.pop()
      setBooks([lastbook, ...books])

      const firstImagebook = bookImages.pop()
      setBookImages([firstImagebook, ...bookImages])
   }

   const moveToRight = () => {
      const firstbook = books.shift()
      setBooks([...books, firstbook])

      const firstImagebook = bookImages.shift()
      setBookImages([...bookImages, firstImagebook])
   }

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
      <div className={classes.viewingTheBestBooksSectionContainer}>
         <div className={classes.sectionTopPart}>
            <h2>{sectionTitle}</h2>
            <Button onClick={navigateToSortPage} variant="aboutMoreBtn">
               Смотреть все
            </Button>
         </div>
         <div className={classes.bookContent}>
            <div className={classes.bookDescription}>
               <h1 className={classes.bookTitle}>{books[0].bookName}</h1>
               <p className={classes.aboutBook}>
                  {books[0].description ||
                     '«Фо́ррест Гамп» (англ. Forrest Gump) — комедийная драма, девятый полнометражный фильм режиссёра Роберта Земекиса. Поставлен по одноимённому роману Уинстона Грума (1986), вышел на экраны в 1994 году. Наиболее успешный фильм режиссёра как среди зрителей (первое место по сборам в 1994 году), так и среди критиков и профессиональных кинематографистов (38 наград по всему миру, включая 6 премий «Оскар»).'}
               </p>
               <div className={classes.bottomPartAboutBook}>
                  <Button
                     onClick={() =>
                        navigateToSingleBookPage({
                           bookId: books[0].bookId,
                           bookName: books[0].bookName,
                        })
                     }
                     variant="aboutMoreBtn"
                  >
                     Подробнее
                  </Button>
                  <p className={classes.price}>{books[0].price} C</p>
               </div>
            </div>
            <div className={classes.books}>
               <img className={classes.mainImage} src={bookImages[0]} alt="" />
               {bookImages.slice(1).map((image) => {
                  return (
                     <img
                        key={image}
                        className={classes.image}
                        src={image}
                        alt=""
                     />
                  )
               })}
            </div>
         </div>
         <div className={classes.arrowButtonContainer}>
            <ArrowButton
               onClick={moveToLeft}
               className={classes.arrowButtonLeft}
            />
            <ArrowButton
               onClick={moveToRight}
               className={classes.arrowButtonRight}
            />
         </div>
      </div>
   )
}

export default ViewingTheBestBooksSection
