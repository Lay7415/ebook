import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { asyncUpdateBreadcrumb } from '../../../../../store/breadCrumbsSlice'
import {
   ROUTES,
   ROLES,
   SEARCH_VALUE_TYPE,
} from '../../../../../utils/constants/constants'
import classes from './SearchItem.module.css'
import WhiteWrapper from '../../../WhiteWrapper/WhiteWrapper'

const SearchItem = ({
   name,
   type,
   id,
   setFilteredData,
   setSearchValue,
   setFocused,
   role,
}) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const breadCrumbs = [
      {
         route_name: name,
      },
   ]

   const navigateToType = () => {
      if (type === SEARCH_VALUE_TYPE.GENRE) {
         navigate(`${ROUTES.SORT_GENRE}/${id}`)
      }
      if (type === SEARCH_VALUE_TYPE.AUTHOR) {
         navigate(`${ROUTES.SORT_AUTHOR}/${name}`)
      }
      if (type === SEARCH_VALUE_TYPE.PUBLISHING_HOUSE) {
         navigate(`${ROUTES.SORT_PUBLISHING_HOUSE}/${name}`)
      }
      if (type === SEARCH_VALUE_TYPE.BOOK && role === ROLES.ADMIN) {
         navigate(`${ROUTES.ADMIN_BOOK_PAGE}/${id}`)
         dispatch(asyncUpdateBreadcrumb(breadCrumbs))
      }
      if (type === SEARCH_VALUE_TYPE.BOOK && role === ROLES.VENDOR) {
         navigate(`${ROUTES.VENDOR_BOOK_PAGE}/${id}`)
         dispatch(asyncUpdateBreadcrumb(breadCrumbs))
      }
      if (type === SEARCH_VALUE_TYPE.BOOK && (role === null || ROLES.CLIENT)) {
         navigate(`${ROUTES.CLIENT_BOOK_PAGE}/${id}`)
         dispatch(asyncUpdateBreadcrumb(breadCrumbs))
      }
      setSearchValue('')
      setFilteredData([])
      setFocused((isFocused) => !isFocused)
   }
   return (
      <div role="presentation" onClick={navigateToType}>
         <WhiteWrapper className={classes.li}>{name}</WhiteWrapper>
      </div>
   )
}

export default SearchItem
