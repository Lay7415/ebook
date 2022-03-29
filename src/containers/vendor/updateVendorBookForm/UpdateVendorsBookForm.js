import { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GET_BOOK_BY_ID } from '../../../utils/constants/urls'
import { getImageUrl, sendRequest } from '../../../utils/helpers'
import classes from './UpdateVendorsBooksForm.module.css'
import VendorImageSection from '../vendorAddBookForm/vendorImageUploader/VendorImageSection'
import UpdateVenodrsPaperBookForm from './updateVenodrsPaperBookForm/UpdateVenodrsPaperBookForm'
import UpdateVendorsAudioBooksForm from './updateVendorsAudioBooksForm/UpdateVendorsAudioBooksForm'
import UpdateVendorsElectroBookForm from './updateVendorsElectroBookForm/UpdateVendorsElectroBookForm'

const UpdateVendorsBooksForm = () => {
   const params = useParams()
   const [bookInfo, setBookInfo] = useState([])

   const [allLanguages, setGetAllLanguages] = useState([])
   const [allGenres, setGetAllGenres] = useState([])

   const [mainPicture, setFirstImage] = useState('')
   const [secondPicture, setSecondImage] = useState('')
   const [thirdPicture, setThirdImage] = useState('')

   const languagesUrl = 'api/books/languages'
   const genresUrl = 'api/genres'

   const getBookById = async () => {
      const requestConfig = {
         url: GET_BOOK_BY_ID + params.bookId,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      await setBookInfo(response)
      const firstImageSrc = getImageUrl(response.images[0].id)
      const secondImageSrc = getImageUrl(response.images[1].id)
      const thirdImageSrc = getImageUrl(response.images[2].id)
      setFirstImage({ avatar: firstImageSrc, preview: firstImageSrc })
      setSecondImage({ avatar: secondImageSrc, preview: secondImageSrc })
      setThirdImage({ avatar: thirdImageSrc, preview: thirdImageSrc })
   }

   const getAllLanguagesApi = useCallback(async () => {
      const requestConfig = {
         url: languagesUrl,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      return setGetAllLanguages(response)
   }, [])

   const getAllGenresFromApi = async () => {
      const requestConfig = {
         url: genresUrl,
         method: 'GET',
      }
      const response = await sendRequest(requestConfig)
      await setGetAllGenres(response)
   }
   useEffect(getAllGenresFromApi, [])

   useEffect(getAllLanguagesApi, [])

   useEffect(getBookById, [])

   const electroBook = bookInfo.typeOfBook === 'ELECTRONIC_BOOK'
   const papperBook = bookInfo.typeOfBook === 'PAPER_BOOK'
   const audioBook = bookInfo.typeOfBook === 'AUDIO_BOOK'

   const onChangeMainPictureHandler = (image) => {
      setFirstImage(image)
   }
   const onChangeSecondPictureHandler = (image) => {
      setSecondImage(image)
   }
   const onChangeThirdPictureHandler = (image) => {
      setThirdImage(image)
   }

   const deleteAllPictureHandler = () => {
      setFirstImage('')
      setSecondImage('')
      setThirdImage('')
   }

   const deleteMainPictureHandler = () => {
      setFirstImage('')
   }

   const deleteSecondPictureHandler = () => {
      setSecondImage('')
   }

   const deleteThirdPictureHandler = () => {
      setThirdImage('')
   }
   return (
      <div>
         <main className={classes.vendorBlog}>
            <p className={classes.uploadthreeBooks}>Загрузите 3 фото *</p>
            <VendorImageSection
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
                        className={classes.radioBtn}
                        readOnly
                     />
                     Бумажная
                  </label>
                  <label className={classes.checkbox}>
                     <input
                        type="radio"
                        name="type"
                        defaultChecked={audioBook}
                        defaultValue={audioBook}
                        className={classes.radioBtn}
                        readOnly
                     />
                     Аудиокнига
                  </label>
                  <label className={classes.checkbox}>
                     <input
                        type="radio"
                        name="type"
                        defaultChecked={electroBook}
                        defaultValue={electroBook}
                        className={classes.radioBtn}
                        readOnly
                     />
                     Электонная Книга
                  </label>
               </div>
            </section>
            <section>
               {papperBook && (
                  <UpdateVenodrsPaperBookForm
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                     bookInfo={bookInfo}
                  />
               )}
               {audioBook && (
                  <UpdateVendorsAudioBooksForm
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                     bookInfo={bookInfo}
                  />
               )}
               {electroBook && (
                  <UpdateVendorsElectroBookForm
                     languagesFromApi={allLanguages}
                     genres={allGenres}
                     mainPicture={mainPicture}
                     secondPicture={secondPicture}
                     thirdPicture={thirdPicture}
                     deleteAllPictureHandler={deleteAllPictureHandler}
                     bookInfo={bookInfo}
                  />
               )}
            </section>
         </main>
      </div>
   )
}
export default UpdateVendorsBooksForm
