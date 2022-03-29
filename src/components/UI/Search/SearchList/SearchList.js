import classes from './SearchList.module.css'
import UserItem from './SearchItem/SearchItem'

const SearchList = ({
   filteredData,
   setFilteredData,
   setSearchValue,
   setFocused,
   role,
}) => {
   return (
      <div className={classes.list}>
         {filteredData &&
            filteredData.map((searchItem) => {
               return (
                  <UserItem
                     role={role}
                     key={searchItem}
                     id={searchItem.id}
                     type={searchItem.type}
                     name={searchItem.search}
                     setFilteredData={setFilteredData}
                     setSearchValue={setSearchValue}
                     setFocused={setFocused}
                  />
               )
            })}
      </div>
   )
}
export default SearchList
