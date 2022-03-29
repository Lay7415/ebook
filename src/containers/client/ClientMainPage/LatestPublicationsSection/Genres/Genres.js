import classes from './Genres.module.css'
import Genre from './Genre/Genre'

const Genres = ({ setGengreCounter, lastBooks }) => {
   const switchToGenre = (changedGenreCounter) => {
      setGengreCounter(changedGenreCounter)
   }

   return (
      <div className={classes.genres}>
         {lastBooks &&
            lastBooks.map((genreItem, index) => {
               return (
                  <Genre
                     genreName={genreItem.genre.genreName}
                     genreCounter={index}
                     switchToGenre={switchToGenre}
                  />
               )
            })}
      </div>
   )
}

export default Genres
