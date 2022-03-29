// import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ROLES, ROUTES } from '../../utils/constants/constants'
import classes from './VendorBooks.module.css'
import Button from '../../components/UI/Button/Button'
import VendorBookCard from '../../components/UI/VendorBookCard/VendorBookCard'
import SellectFilter from './SellectFilter/SellectFilter'
import { asyncUpdateBreadcrumb } from '../../store/breadCrumbsSlice'

const VendorBooks = (props) => {
   const { vendorBooks, userRole } = props
   const navigate = useNavigate()
   const dispatch = useDispatch()
   console.log(vendorBooks)

   const changeCategory = () => {
      // there will be function, which will be make filter category
   }

   const sendRequestLike = (bookIdForLike) => {
      console.log(bookIdForLike)
   }

   const onGetBookId = (bookInfo) => {
      if (userRole === ROLES.ADMIN) {
         const breadcrumbs = [
            {
               route_name: 'Заявки',
               route: ROUTES.APPLICATIONS,
            },
            {
               route_name: bookInfo.bookName,
            },
         ]
         dispatch(asyncUpdateBreadcrumb(breadcrumbs))
         navigate(`${ROUTES.ADMIN_BOOK_PAGE}/${bookInfo.id}`)
      }

      if (userRole === ROLES.VENDOR) {
         const breadcrumbs = [
            {
               route_name: 'Главная',
               route: ROUTES.VENDOR_AREA,
            },
            {
               route_name: bookInfo.bookName,
            },
         ]
         dispatch(asyncUpdateBreadcrumb(breadcrumbs))
         navigate(`${ROUTES.VENDOR_BOOK_PAGE}/${bookInfo.id}`)
      }
      return ''
   }

   return (
      <div className={classes.containerForVendorBookContent}>
         {vendorBooks !== undefined && (
            <div>
               <div className={classes.containerForTopPartInVendorBooks}>
                  <p className={classes.numberOfBooks}>
                     всего {vendorBooks.length} книг
                  </p>
                  <SellectFilter changeCategory={changeCategory} />
               </div>
               <hr className={classes.lineInVendorBooks} />
               <div className={classes.containerForbookContnet}>
                  {vendorBooks &&
                     vendorBooks.map((vendorbooks) => {
                        return (
                           <VendorBookCard
                              onGetBookId={onGetBookId}
                              id={vendorbooks.bookId}
                              sendRequestLike={sendRequestLike}
                              key={vendorbooks.bookId}
                              book={vendorbooks}
                           />
                        )
                     })}
               </div>
               {userRole === ROLES.ADMIN && (
                  <div className={classes.containerForDelleteButton}>
                     <Button variant="deleteProfile">Удалить профиль</Button>
                  </div>
               )}
            </div>
         )}
      </div>
   )
}

export default VendorBooks
