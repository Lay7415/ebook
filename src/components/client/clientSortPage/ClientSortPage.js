import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './ClientSortPage.module.css'
import {
   NAVICON,
   IS_PAPPERBOOK,
   ROUTES,
} from '../../../utils/constants/constants'
import PriceInput from '../../UI/PriceInput/PriceInput'
import { sendRequest } from '../../../utils/helpers'
import { GET_GENRES } from '../../../utils/constants/urls'
import GenreCheckBoxItem from './GenreCheckBoxItem/GenreCheckBoxItem'
import TopPart from './TopPart/TopPart'
import TypeBook from './TypeBook/TypeBook'
import LanguagesBook from './LanguagesBook/LanguagesBook'
import SortPageCard from '../../UI/SortPageCard/SortPageCard'
import { asyncUpdateBreadcrumb } from '../../../store/breadCrumbsSlice'

const ClientSortPage = () => {
   const [firstPrice, setFirstPrice] = useState(10000)
   const [secondPrice, setSecondPrice] = useState(0)
   const [genres, setGenres] = useState([])
   const [genreData, setGenreData] = useState([])
   const [languages, setLanguages] = useState([])
   const [languageData, setLanguageData] = useState([])
   const [books, setBooks] = useState([])
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const onChangeSortValueHandler = async (event) => {
      event.preventDefault()
      filtr()
   }

   const filtr = async () => {
      const bodyReq = {
         genres: genreData,
         price: {
            from: secondPrice,
            before: firstPrice,
         },
         languages: languageData,
         type: typeOfBook,
      }
      const filters = JSON.stringify(bodyReq)
      try {
         const configRequest = {
            url: `api/books/sort?filterBy=${filters}`,
            method: 'GET',
         }
         const response = await sendRequest(configRequest)
         setBooks(response)
      } catch (error) {
         console.log(error.message)
      }
   }

   const [typeOfBook, setTypeOfBook] = useState(IS_PAPPERBOOK)

   const isAudioChangeHandler = (typeOfBook) => {
      setTypeOfBook(typeOfBook)
   }

   const getGenres = async () => {
      const configRequest = { url: GET_GENRES }
      const response = await sendRequest(configRequest)
      setGenres(response)
   }

   const sendRequestGenreById = (genre) => {
      if (genreData.includes(genre)) {
         const newGenres = genreData.filter((item) => item !== genre)
         setGenreData(newGenres)
      } else {
         setGenreData([...genreData, genre])
      }
   }

   const redirectToSingleBookPage = (bookInfo) => {
      navigate(`${ROUTES.CLIENT_BOOK_PAGE}/${bookInfo.bookId}`)
      const breadCrumbs = [
         {
            route_name: 'Каталог',
            route: ROUTES.SORT,
         },
         {
            route_name: bookInfo.bookName,
         },
      ]
      dispatch(asyncUpdateBreadcrumb(breadCrumbs))
   }

   const getLanguages = async () => {
      const configRequest = { url: 'api/books/languages', method: 'GET' }
      const response = await sendRequest(configRequest)
      setLanguages(response)
   }
   const sendRequestLanguagesById = (language) => {
      if (languageData.includes(language)) {
         const newGenres = languageData.filter((item) => item !== language)
         setLanguageData(newGenres)
      } else {
         setLanguageData([...languageData, language])
      }
   }

   useEffect(() => {
      getLanguages()
      getGenres()
      filtr()
   }, [genreData, secondPrice, firstPrice, languageData, typeOfBook])
   return (
      <form onSubmit={onChangeSortValueHandler}>
         <section className={classes.section}>
            <div>
               <TopPart books={books.length} />
               <div className={classes.janr}>
                  <div className={classes.title}>
                     Жанры <img src={NAVICON.ARRDOWN} alt="" />
                  </div>
                  <div className={classes.genre}>
                     {genres &&
                        genres.map((genre) => {
                           return (
                              <GenreCheckBoxItem
                                 sendRequestGenreById={sendRequestGenreById}
                                 genre={genre}
                                 key={genre.id}
                                 genreId={genre.id}
                              />
                           )
                        })}
                  </div>
                  <div className={classes.typeblock}>
                     <div className={classes.title}>
                        Тип <img src={NAVICON.ARRDOWN} alt="" />
                     </div>
                     <TypeBook
                        typeOfBook={typeOfBook}
                        isAudioChangeHandler={isAudioChangeHandler}
                     />
                  </div>
                  <PriceInput
                     firstPrice={firstPrice}
                     secondPrice={secondPrice}
                     setFirstPrice={setFirstPrice}
                     setSecondPrice={setSecondPrice}
                  />
                  <div className={classes.lang}>
                     <span className={classes.lan}>
                        Язык издания <img src={NAVICON.ARRDOWN} alt="" />
                     </span>
                     <div className={classes.lanCheck}>
                        {languages &&
                           languages.map((language) => {
                              return (
                                 <LanguagesBook
                                    sendRequestLanguagesById={
                                       sendRequestLanguagesById
                                    }
                                    language={language}
                                    key={language}
                                 />
                              )
                           })}
                     </div>
                  </div>
               </div>
            </div>
            <div className={classes.cards}>
               {books.map((item) => {
                  return (
                     <SortPageCard
                        bookId={item.bookId}
                        image={item.image.id}
                        key={item.bookId}
                        bookName={item.bookName}
                        author={item.author}
                        price={item.price}
                        redirectToSingleBookPage={redirectToSingleBookPage}
                     />
                  )
               })}
            </div>
         </section>
      </form>
   )
}

export default ClientSortPage
