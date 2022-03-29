import classes from './TypeBook.module.css'

const TypeBook = ({ isAudioChangeHandler }) => {
   const isBookChangeHandler = (e) => {
      isAudioChangeHandler(e.target.value)
   }

   return (
      <div className={classes.e}>
         <div className={classes.changeFormSection}>
            <label className={classes.checkbox}>
               <input
                  type="radio"
                  name="type"
                  defaultValue="PAPER_BOOK"
                  onChange={isBookChangeHandler}
                  className={classes.radioBtn}
               />
               Бумажная
            </label>
            <label className={classes.checkbox}>
               <input
                  type="radio"
                  name="type"
                  onChange={isBookChangeHandler}
                  defaultValue="AUDIO_BOOK"
                  className={classes.radioBtn}
               />
               Аудиокнига
            </label>
            <label className={classes.checkbox}>
               <input
                  type="radio"
                  name="type"
                  onChange={isBookChangeHandler}
                  defaultValue="ELECTRONIC_BOOK"
                  className={classes.radioBtn}
               />
               Электонная Книга
            </label>
         </div>
      </div>
   )
}

export default TypeBook
