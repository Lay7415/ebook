import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendRequest } from '../../../utils/helpers'
import classes from './showingBooksByAuthorOrPublishingHouse.module.css'
import {
   SEARCHBYPUBLISHER,
   SEARCHBYAUTHORNAME,
   GET_GENRE_BY_ID,
} from '../../../utils/constants/urls'
import VendorBookCard from '../../../components/UI/VendorBookCard/VendorBookCard'
import { ROUTES, ROLES } from '../../../utils/constants/constants'
import { asyncUpdateBreadcrumb } from '../../../store/breadCrumbsSlice'

const ShowingBooksByAuthorOrPublishingHouse = () => {
   const { authorName, publicationName, genreId } = useParams()
   const [data, setData] = useState([])
   const userRole = useSelector((state) => state.role.roleData)
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const getUpdatedBooks = async () => {
      let url = ''
      if (authorName !== undefined) {
         url = `${SEARCHBYAUTHORNAME}${authorName}`
      }
      if (publicationName !== undefined) {
         url = `${SEARCHBYPUBLISHER}${publicationName}`
      }
      if (genreId !== undefined) {
         url = `${GET_GENRE_BY_ID}${genreId}`
      }

      const response = await sendRequest({ url })
      setData(response)
   }

   useEffect(async () => {
      getUpdatedBooks()
   }, [authorName, publicationName, genreId])

   const onGetBookId = (bookInfo) => {
      if (userRole === ROLES.ADMIN) {
         navigate(`${ROUTES.ADMIN_BOOK_PAGE}/${bookInfo.id}`)
      }
      if (userRole === ROLES.VENDOR) {
         navigate(`${ROUTES.VENDOR_BOOK_PAGE}/${bookInfo.id}`)
      }
      if (userRole === undefined || userRole === ROLES.CLIENT) {
         navigate(`${ROUTES.CLIENT_BOOK_PAGE}/${bookInfo.id}`)
      }
      saveBreadCrumbs(bookInfo)
   }

   const saveBreadCrumbs = (bookInfo) => {
      let breadcrumbs = []
      if (authorName !== undefined) {
         breadcrumbs = [
            {
               route_name: authorName,
               route: `${ROUTES.SORT_AUTHOR}/${authorName}`,
            },
            {
               route_name: bookInfo.bookName,
            },
         ]
      }
      if (publicationName !== undefined) {
         breadcrumbs = [
            {
               route_name: publicationName,
               route: `${ROUTES.SORT_PUBLISHING_HOUSE}/${publicationName}`,
            },
            {
               route_name: bookInfo.bookName,
            },
         ]
      }
      if (genreId !== undefined) {
         breadcrumbs = [
            {
               route_name: data.genreName,
               route: `${ROUTES.SORT_GENRE}/${genreId}`,
            },
            {
               route_name: bookInfo.bookName,
            },
         ]
      }

      dispatch(asyncUpdateBreadcrumb(breadcrumbs))
   }
   const sendRequestLike = () => {}

   return (
      <div className={classes.contentContainer}>
         <div className={classes.contentContainerHeader}>
            <h1>{authorName || publicationName || data.genreName || ''}</h1>
            <p className={classes.numberOfBooks}>
               количество {data.books ? data.books.length : data.length} книг
            </p>
         </div>
         <div className={classes.content}>
            {data.books && genreId
               ? data.books.map((book) => {
                    return (
                       <VendorBookCard
                          book={book}
                          onGetBookId={onGetBookId}
                          sendRequestLike={sendRequestLike}
                          id={book.bookId}
                       />
                    )
                 })
               : data.map((book) => {
                    return (
                       <VendorBookCard
                          book={book}
                          onGetBookId={onGetBookId}
                          sendRequestLike={sendRequestLike}
                          id={book.bookId}
                       />
                    )
                 })}
         </div>
         <div />
      </div>
   )
}

export default ShowingBooksByAuthorOrPublishingHouse
