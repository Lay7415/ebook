import { ReactComponent as SearchIconImage } from '../../../../assets/icons/searchIcon.svg'
import classes from './Search-icon.module.css'

const SearchIcon = ({ isActive }) => {
   const className = isActive
      ? classes.searchIconOrange
      : classes.searchIconGray
   return <SearchIconImage className={className} />
}

export default SearchIcon
