import { useState } from 'react'
import classes from './BookTypeDropdown.module.css'
import { ReactComponent as SelectIcon } from '../../../assets/icons/Vector.svg'

const options = [
   { title: 'Все книги', value: '' },
   { title: 'Бумажные книги', value: 'PAPER_BOOK' },
   { title: 'Аудиокниги', value: 'AUDIO_BOOK' },
   { title: 'Электронные книги', value: 'ELECTRONIC_BOOK' },
]

const BookTypeDropdown = ({ select, getRequestOptions }) => {
   const [isOpen, setIsOpen] = useState(false)
   const toggling = () => setIsOpen(!isOpen)
   const [selectedOption, setSelectedOption] = useState(null)
   const onOptionClicked = (option) => () => {
      setSelectedOption(option.title)
      setIsOpen(false)
      getRequestOptions({ typeOfBook: option.value })
   }

   return (
      <div>
         <div
            role="presentation"
            onClick={toggling}
            className={classes.selected}
         >
            {selectedOption || 'Все книги'}
            <SelectIcon className={classes.icon} />
         </div>
         {isOpen && (
            <div className={classes.container2}>
               <div className={classes.context}>
                  <ul>
                     {options.map((option) => (
                        <li
                           role="presentation"
                           key={option.value}
                           value={option.value}
                           onClick={onOptionClicked(option)}
                           onSelect={select}
                        >
                           {option.title}
                           {option.title === 'Электронные книги' ? (
                              !(<hr className={classes.line2} />)
                           ) : (
                              <hr className={classes.line2} />
                           )}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         )}
      </div>
   )
}

export default BookTypeDropdown
