// import React, { useState } from 'react'
import classes from './GenreCheckBoxItem.module.css'
import CustomCheckbox from '../../../UI/customCheckbox/CustomCheckbox'

const GenreCheckBoxItem = ({ genre, genreId, sendRequestGenreById }) => {
   const onChangeCheckBoxValue = () => {
      sendRequestGenreById(genreId)
   }
   // console.log(id)
   return (
      <div className={classes.container}>
         <CustomCheckbox
            onChangeCheckBoxValue={onChangeCheckBoxValue}
            label={genre.genreName}
            className={classes.check}
         />
      </div>
   )
}

export default GenreCheckBoxItem
