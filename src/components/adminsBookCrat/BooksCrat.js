import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BooksList from './booksList/BooksList'
import { ROUTES } from '../../utils/constants/constants'
import { ReactComponent as Plus } from '../../assets/icons/addBookPlus.svg'
import classes from './BooksCrat.module.css'
import BookTypeDropdown from '../BookCardRenderingDropdowns/BookTypeDropdown/BookTypeDropdown'
import BookGenreDropdown from '../BookCardRenderingDropdowns/BookGenreDropdown/BookGenreDropwdown'
import { sendRequest } from '../../utils/helpers'
import { GET_ASSEPTED_BOOKS } from '../../utils/constants/urls'

const BooksCratLayout = () => {
   const [genres, setGenres] = useState([])
   const [genereBooks, setGenreBooks] = useState([])
   const getGenresUrl = 'api/genres'

   const [sortBooks, setSortBooks] = useState({
      typeOfBook: '',
      genreId: null,
   })
   const getAcceptedBooks = async () => {
      const requestConfig = {
         url: GET_ASSEPTED_BOOKS,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      await setGenreBooks(response)
   }
   const getRequestOptions = async (requestOptions) => {
      setSortBooks({
         ...sortBooks,
         ...requestOptions,
      })
      const stringifaedData = JSON.stringify({
         ...sortBooks,
         ...requestOptions,
      })
      const requestConfig = {
         url: `api/admin/get/books/accepted?filterBy=${stringifaedData} `,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      setGenreBooks(response)
   }

   // get generes
   const getGenres = useCallback(async () => {
      const requestConfig = {
         url: getGenresUrl,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      return setGenres(response)
   }, [])

   useEffect(() => {
      getGenres()
   }, [])

   useEffect(() => {
      getAcceptedBooks()
   }, [])
   return (
      <div className={classes.bookCratBox}>
         <div className={classes.customselectbox}>
            <div className={classes.booktypedropdown}>
               <BookTypeDropdown getRequestOptions={getRequestOptions} />
               <BookGenreDropdown
                  genres={genres}
                  getRequestOptions={getRequestOptions}
               />
            </div>
            <div className={classes.linkToNextPage}>
               <Link to={ROUTES.ADD_BOOKS}>
                  <button className={classes.addBooksButton} type="button">
                     <Plus className={classes.plusforbtn} /> Добавить Книгу
                  </button>
               </Link>
            </div>
         </div>
         <div>
            <p className={classes.totalBooksP}>
               Всего: {genereBooks.quantityOfBooks || '0'}
            </p>
            <BooksList books={genereBooks} />
         </div>
      </div>
   )
}
export default BooksCratLayout
