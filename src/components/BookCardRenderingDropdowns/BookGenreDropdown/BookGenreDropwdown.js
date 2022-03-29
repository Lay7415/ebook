import { useState } from 'react'
import classes from './BookGenreDropdown.module.css'
import { ReactComponent as SelectIcon } from '../../../assets/icons/Vector.svg'

const BookGenreDropdown = (props) => {
   const { genres, getRequestOptions, ...rest } = props
   const [isOpen, setIsOpen] = useState(false)
   const toggling = () => setIsOpen(!isOpen)
   const [selectedOption, setSelectedOption] = useState(null)
   const onOptionClicked = (value) => () => {
      getRequestOptions({ genreId: +value.id })
      setSelectedOption(value.genreName)
      setIsOpen(false)
   }

   return (
      <div {...rest}>
         <div
            role="presentation"
            onClick={toggling}
            className={classes.selected}
         >
            {selectedOption || 'Жанры'}
            <SelectIcon className={classes.icon} />
         </div>
         {isOpen && (
            <div className={classes.frame}>
               <div className={`${classes.scroll} ${classes.content}`}>
                  <ul>
                     {genres.map((option) => (
                        <li
                           role="presentation"
                           onClick={onOptionClicked(option)}
                           key={option.id}
                        >
                           <div className={classes.items}>
                              <p className={classes.title}>
                                 {option.genreName}
                              </p>
                              <p className={classes.amount}>
                                 {option.quantityOfBooks}
                              </p>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         )}
      </div>
   )
}

export default BookGenreDropdown
