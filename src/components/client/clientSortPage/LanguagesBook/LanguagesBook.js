import React from 'react'
import CustomCheckbox from '../../../UI/customCheckbox/CustomCheckbox'
import classes from './Languages.module.css'

const LanguagesBook = ({ language, sendRequestLanguagesById }) => {
   const onChangeCheckBoxValue = () => {
      sendRequestLanguagesById(language)
   }
   return (
      <CustomCheckbox
         label={language}
         className={classes.check}
         onChangeCheckBoxValue={onChangeCheckBoxValue}
      />
   )
}

export default LanguagesBook
