import classes from './Genre.module.css'

const Genre = ({ genreName, genreCounter, switchToGenre }) => {
   const changeToGenre = () => {
      switchToGenre(genreCounter)
   }

   return (
      <p role="presentation" onClick={changeToGenre} className={classes.genre}>
         {genreName}
      </p>
   )
}

export default Genre
