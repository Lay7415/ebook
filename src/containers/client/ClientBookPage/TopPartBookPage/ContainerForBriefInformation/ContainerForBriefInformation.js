import classes from './ContainerForBriefInformation.module.css'
import { TYPEOFBOOK, LANGUAGES } from '../../../../../utils/constants/constants'

const ContainerForBriefInformation = ({ book }) => {
   const languageTranslate = () => {
      if (book.language === LANGUAGES.RUSSIAN) {
         return 'русский'
      }
      if (book.language === LANGUAGES.KYRGYZ) {
         return 'кыргызский'
      }
      if (book.language === LANGUAGES.ENGLISH) {
         return 'английский'
      }
      return ''
   }

   return (
      <div className={classes.containerForBriefInformation}>
         <div className={classes.smallContainerForBriefInformation}>
            <p>Автор</p>
            <p>Жанр</p>
            <p>Язык</p>
            {(book.typeOfBook === TYPEOFBOOK.ELECTRONICBOOK ||
               book.typeOfBook === TYPEOFBOOK.PAPERBOOK) && <p>Издательство</p>}
            <p>Год выпуска</p>
            {(book.typeOfBook === TYPEOFBOOK.ELECTRONICBOOK ||
               book.typeOfBook === TYPEOFBOOK.PAPERBOOK) && <p>Обьем</p>}
            {book.typeOfBook === TYPEOFBOOK.AUDIOBOOK && <p>Длительность</p>}
         </div>
         <div className={classes.smallContainerForBriefInformation}>
            <p>{book.author}</p>
            <p>{book.genre.genreName}</p>
            <p>{languageTranslate()}</p>
            <p>{book.publishingHouse}</p>
            <p>{book.yearOfIssue}</p>
            {(book.typeOfBook === TYPEOFBOOK.ELECTRONICBOOK ||
               book.typeOfBook === TYPEOFBOOK.PAPERBOOK) && (
               <p>{book.pageSize} стр</p>
            )}
            {book.typeOfBook === TYPEOFBOOK.AUDIOBOOK && (
               <p>
                  <span>
                     {book.duration.hour ? `${book.duration.hour} ч.` : ''}
                  </span>
                  <span>
                     {book.duration.minute
                        ? `${book.duration.minute} мин.`
                        : ''}
                  </span>
                  <span>
                     {book.duration.second
                        ? `${book.duration.second} сек.`
                        : ''}
                  </span>
               </p>
            )}
         </div>
      </div>
   )
}

export default ContainerForBriefInformation
