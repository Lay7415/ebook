import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { sendRequest } from '../../../utils/helpers'
import { SEARCH } from '../../../utils/constants/urls'
import classes from './Search.module.css'
import SearchIcon from './Search-icon/SearchIcon'
import SearchList from './SearchList/SearchList'

const Search = () => {
   const [isFocused, setFocused] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [filteredData, setFilteredData] = useState([])
   const role = useSelector((state) => state.role.roleData)

   function сolorInput() {
      if (isFocused) {
         return classes.formSearchActive
      }
      return classes.formSearch
   }

   const focusHandler = () => {
      setFocused((isFocused) => !isFocused)
   }

   const blurHandler = () => {
      if (searchValue === '') {
         setFocused((isFocused) => !isFocused)
         setFilteredData([])
      }
   }

   const sendRequestSearchValue = useCallback(
      async (event) => {
         try {
            await setSearchValue(event.target.value)
            if (event.target.value !== '') {
               const configRequest = {
                  url: `${SEARCH}${event.target.value}`,
               }
               const response = await sendRequest(configRequest)
               setFilteredData(response)
            } else {
               setFilteredData([])
            }
         } catch (error) {
            setFilteredData([])
            console.log(error.message)
         }
      },
      [searchValue]
   )

   return (
      <div className={classes.box}>
         <div>
            <form action="#" className={сolorInput()}>
               <input
                  onChange={sendRequestSearchValue}
                  onFocus={focusHandler}
                  onBlur={blurHandler}
                  value={searchValue}
                  placeholder={
                     isFocused
                        ? ''
                        : 'Искать жанр, книги, авторов, издательства... '
                  }
                  className={classes.input}
                  type="text"
               />
               <SearchIcon isActive={isFocused} />
            </form>
         </div>
         <SearchList
            role={role}
            setFilteredData={setFilteredData}
            filteredData={filteredData}
            setSearchValue={setSearchValue}
            setFocused={setFocused}
         />
      </div>
   )
}
export default Search
