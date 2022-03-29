import classes from './GengreDropDownList.module.css'
import { genres } from '../../../../utils/constants/genres'

const GengreDropDownList = () => {
   return (
      <div className={classes.gengreDropDownListContainer}>
         {genres &&
            genres.map((genre) => {
               return (
                  <div key={genre.id} className={classes.genreBox}>
                     <p className={classes.genreName}>{genre.genreName}</p>
                     <p>{genre.numberOfBooksInThisGenre}</p>
                  </div>
               )
            })}
      </div>
   )
}

export default GengreDropDownList
