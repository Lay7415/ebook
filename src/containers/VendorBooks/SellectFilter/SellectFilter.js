import { useState } from 'react'
import classes from './SellectFilter.module.css'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg'
import Option from './Option/Option'

const SellectFilter = () => {
   const [keyName, setKeyName] = useState('All')
   const [showOptions, setShowOptions] = useState(false)

   const changeKeyName = (newKeyName) => {
      setKeyName(newKeyName)
      setShowOptions((showOptions) => !showOptions)
      // selectedСategory(category)
   }

   const changeShowOptions = () => {
      setShowOptions((showOptions) => !showOptions)
   }

   return (
      <div>
         <div
            role="presentation"
            onClick={changeShowOptions}
            className={classes.select}
         >
            <p className={classes.optionWithoutLine}>{keyName}</p>
            <ArrowIcon
               className={
                  showOptions ? classes.arrowUpIcon : classes.arrowDownIcon
               }
            />
         </div>
         {showOptions && (
            <div className={classes.containerForOptions}>
               <Option
                  optionName="Все"
                  changeKeyName={changeKeyName}
                  optionWithLine
               />
               <Option
                  optionName="В избранном"
                  changeKeyName={changeKeyName}
                  optionWithLine
               />
               <Option
                  optionName="В корзине"
                  changeKeyName={changeKeyName}
                  optionWithLine
               />
               <Option
                  optionName="Проданы"
                  changeKeyName={changeKeyName}
                  optionWithLine
               />
               <Option
                  optionName="Со скидками"
                  changeKeyName={changeKeyName}
                  optionWithLine={false}
               />
            </div>
         )}
      </div>
   )
}

export default SellectFilter
