import { useState, useCallback, useEffect } from 'react'
import AudioBook from '../addAudioBook/AddAudioBook'
import ElectroBook from '../addElectroBook/AddElectroBook'
import Papperbook from '../addPapperBook/AddPapperBook'
import classes from './AddBookForm.module.css'
import UploadImageCart from '../imageUploader/UploadImageCart'
import { sendRequest } from '../../../../utils/helpers'
import {
   IS_AUDIOBOOK,
   IS_PAPPERBOOK,
   IS_ELECTROBOOK,
} from '../../../../utils/constants/constants'

const AddBookForm = () => {
   const [typeOfBook, setTypeOfBook] = useState(IS_ELECTROBOOK)
   const [allLanguages, setGetAllLanguages] = useState([])
   const [allGenres, setGetAllGenres] = useState([])

   const languagesUrl = 'api/books/languages'
   const genresUrl = 'api/genres'

   const getAllLanguagesApi = useCallback(async () => {
      const requestConfig = {
         url: languagesUrl,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      return setGetAllLanguages(response)
   }, [])

   const getAllGenresFromApi = useCallback(async () => {
      const requestConfig = {
         url: genresUrl,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      return setGetAllGenres(response)
   })

   useEffect(() => {
      getAllGenresFromApi()
   }, [])

   useEffect(() => {
      getAllLanguagesApi()
   }, [])

   const isAudioChangeHandler = () => {
      setTypeOfBook(IS_AUDIOBOOK)
   }

   const isElectroChangeHandler = () => {
      setTypeOfBook(IS_ELECTROBOOK)
   }
   const isBookChangeHandler = () => {
      setTypeOfBook(IS_PAPPERBOOK)
   }

   const electroBook = typeOfBook === IS_ELECTROBOOK
   const papperBook = typeOfBook === IS_PAPPERBOOK
   const audioBook = typeOfBook === IS_AUDIOBOOK

   const [mainPicture, setMainPicture] = useState('')
   const [secondPicture, setSecondPicture] = useState('')
   const [thirdPicture, setThirdPicture] = useState('')

   const onChangeMainPictureHandler = (image) => {
      setMainPicture(image)
   }
   const onChangeSecondPictureHandler = (image) => {
      setSecondPicture(image)
   }
   const onChangeThirdPictureHandler = (image) => {
      setThirdPicture(image)
   }

   const deleteAllPictureHandler = () => {
      setMainPicture('')
      setSecondPicture('')
      setThirdPicture('')
   }

   const deleteMainPictureHandler = () => {
      setMainPicture('')
   }

   const deleteSecondPictureHandler = () => {
      setSecondPicture('')
   }

   const deleteThirdPictureHandler = () => {
      setThirdPicture('')
   }

   return (
      <div className={classes.addBookFormContainer}>
         <main className={classes.adminBlog}>
            <p className={classes.uploadthreeBooks}>Загрузите 3 фото *</p>
            <UploadImageCart
               deleteThirdPictureHandler={deleteThirdPictureHandler}
               deleteSecondPictureHandler={deleteSecondPictureHandler}
               deleteMainPictureHandler={deleteMainPictureHandler}
               onChangeThirdPictureHandler={onChangeThirdPictureHandler}
               onChangeSecondPictureHandler={onChangeSecondPictureHandler}
               onChangeMainPictureHandler={onChangeMainPictureHandler}
               mainPicture={mainPicture}
               secondPicture={secondPicture}
               thirdPicture={thirdPicture}
            />
            <section className={classes.changeTypeofBook}>
               <h2 className={classes.type}>Тип</h2>
               <div className={classes.changeFormSection}>
                  <label className={classes.checkbox}>
                     <input
                        type="radio"
                        name="type"
                        defaultChecked={papperBook}
                        defaultValue={papperBook}
                        onChange={isBookChangeHandler}
                        className={classes.radioBtn}
                     />
                     Бумажная
                  </label>
                  <label className={classes.checkbox}>
                     <input
                        type="radio"
                        name="type"
                        onChange={isAudioChangeHandler}
                        defaultChecked={audioBook}
                        defaultValue={audioBook}
                        className={classes.radioBtn}
                     />
                     Аудиокнига
                  </label>
                  <label className={classes.checkbox}>
                     <input
                        type="radio"
                        name="type"
                        onChange={isElectroChangeHandler}
                        defaultChecked={electroBook}
                        defaultValue={electroBook}
                        className={classes.radioBtn}
                     />
                     Электонная Книга
                  </label>
               </div>
            </section>
            <section>
               {papperBook && (
                  <Papperbook
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                  />
               )}
               {audioBook && (
                  <AudioBook
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                  />
               )}
               {electroBook && (
                  <ElectroBook
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                  />
               )}
            </section>
         </main>
      </div>
   )
}

export default AddBookForm
