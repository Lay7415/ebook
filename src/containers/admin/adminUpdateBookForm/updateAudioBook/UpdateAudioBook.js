import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './UpdateAudioBook.module.css'
import WrapperOfForms from '../../../../components/admin/wrapperOfAdminBook/WrapperOfForm'
import Input from '../../../../components/UI/input/Input'
import CustomCheckbox from '../../../../components/UI/customCheckbox/CustomCheckbox'
import CustomTextarea from '../../../../components/UI/customTextarea/CustomTextarea'
import CustomSelect from '../../../../components/UI/customSelect/CustomSelect'
import GenresSelect from '../../../../components/UI/genresSelect/GenresSelect'
import { sendRequest, sendWithFormDataToApi } from '../../../../utils/helpers'
import {
   UPLOAD_IMAGE,
   UPLOAD_AUDIO_FRAGMENT,
   UPLOAD_AUDIO_FILE,
   UPDATE_AUDIO_BOOK,
} from '../../../../utils/constants/urls'
import AudioDropZone from '../../../../components/UI/audioDropZone/AudioDropZone'
import Modal from '../../../../components/UI/modal-window/ModalWindow'
import SuccessfulMessage from '../../../../components/UI/successMessage/SuccessfulMessage'

const schema = yup.object().shape({
   bookName: yup.string().required(),
   author: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required(),
   discount: yup.number().required(),
   dataOfIssue: yup.string().required(),
})

const UpdateAudioBook = (props) => {
   const {
      bookInfo,
      languagesFromApi,
      genres,
      mainPicture,
      secondPicture,
      thirdPicture,
      deleteAllPictureHandler,
   } = props

   const {
      bookName: uploadedBookName,
      author: uploadedAuthor,
      description: uploadedDescription,
      language: uploadedLanguage,
      yearOfIssue: uploadedYearOfIssue,
      price: uploadedPrice,
      duration,
      audio: uploadedAudio,
      audioFragment,
      discount: uploadedDiscount,
      genre,
   } = bookInfo

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      mode: 'all',
      resolver: yupResolver(schema),
   })
   const [genreId, setGenreId] = useState('')
   const [typeOfLanguage, setTypeOfLanguage] = useState('')
   const [bestSeller, setBestseller] = useState(false)
   const [isModal, setIsModal] = useState(false)
   const [responseAnswer, setResponseAnswer] = useState({
      error: null,
      bookName: '',
   })
   const [audio, setAudio] = useState({
      audio: { fileName: '', name: '' },
   })

   const [fragment, setFragment] = useState({
      audio: { fileName: '', name: '' },
   })

   useEffect(() => {
      setAudio({ audio: { name: uploadedAudio.fileName } })
      setFragment({ audio: { name: audioFragment.fileName } })
   }, [bookInfo])

   const onChangeLanguagesValue = (lang) => {
      setTypeOfLanguage(lang)
   }

   const onChangeGenreValue = (genreId) => {
      setGenreId(genreId)
   }

   const onChangeCheckBoxValue = (value) => {
      setBestseller(value)
   }

   const onChangeModal = () => {
      setIsModal((prevState) => !prevState)
   }
   const audioOption = {
      title: 'Загрузите аудиозапись',
      timeDuration: '',
      id: 'f1',
   }
   const fragmentOption = {
      title: 'Загрузите фрагмент аудиозаписи',
      timeDuration: 'максимум 10 мин.',
      id: 'f2',
   }
   const submitHandler = async (data) => {
      const firstImageConfig = {
         file: mainPicture.avatar,
         url: UPLOAD_IMAGE,
      }
      const secondImageConfig = {
         file: secondPicture.avatar,
         url: UPLOAD_IMAGE,
      }
      const thridImageConfig = {
         file: thirdPicture.avatar,
         url: UPLOAD_IMAGE,
      }

      const uploadAudioOption = {
         file: audio.audio,
         url: UPLOAD_AUDIO_FILE,
      }

      const uploadFragmentOption = {
         file: fragment.audio,
         url: UPLOAD_AUDIO_FRAGMENT,
      }
      try {
         let firstImageId = null
         if (typeof mainPicture.avatar === 'string') {
            firstImageId = { id: bookInfo.images[0].id }
         } else {
            firstImageId = await sendWithFormDataToApi(firstImageConfig)
         }
         let secondImageId = null
         if (typeof secondPicture.avatar === 'string') {
            secondImageId = { id: bookInfo.images[1].id }
         } else {
            secondImageId = await sendWithFormDataToApi(secondImageConfig)
         }
         let thirdImageId = null
         if (typeof thirdPicture.avatar === 'string') {
            thirdImageId = { id: bookInfo.images[2].id }
         } else {
            thirdImageId = await sendWithFormDataToApi(thridImageConfig)
         }

         let uploadFragment = null
         if (!fragment.audio.path) {
            uploadFragment = { id: bookInfo.audioFragment.id }
         } else {
            uploadFragment = await sendWithFormDataToApi(uploadFragmentOption)
         }

         let uploadAudio = null
         if (!audio.audio.path) {
            uploadAudio = { id: bookInfo.audio.id }
         } else {
            uploadAudio = await sendWithFormDataToApi(uploadAudioOption)
         }
         if (
            firstImageId.ok &&
            secondImageId.ok &&
            thirdImageId.ok &&
            uploadFragment.ok &&
            uploadAudio.ok
         )
            await setResponseAnswer({
               error: firstImageId || secondImageId || thirdImageId,
            })
         const {
            author,
            bookName,
            dataOfIssue,
            description,
            discount,
            hour,
            minute,
            price,
            second,
         } = data
         const exchangeLanguage = !typeOfLanguage
            ? uploadedLanguage
            : typeOfLanguage
         const exchangeGenreId = !genreId ? genre.id : genreId
         const transformedData = {
            images: [firstImageId.id, secondImageId.id, thirdImageId.id],
            bookName,
            author,
            genreId: +exchangeGenreId,
            description,
            yearOfIssue: +dataOfIssue,
            language: exchangeLanguage,
            bestSeller,
            price,
            discount,
            book: {
               fragmentId: uploadFragment.id,
               duration: {
                  hour,
                  minute,
                  second,
               },
               audioBookId: uploadAudio.id,
            },
         }
         const requestConfig = {
            method: 'PUT',
            url: UPDATE_AUDIO_BOOK + bookInfo.bookId,
            body: transformedData,
         }
         const response = await sendRequest(requestConfig)
         setResponseAnswer({
            bookName: response.bookName,
            error: null,
            message: 'успешно изменён !',
         })
         reset()
         deleteAllPictureHandler()
         return setIsModal(true)
      } catch (error) {
         setResponseAnswer({
            error: error.message || 'Something went wrong !',
         })
         return setIsModal(true)
      }
   }
   return (
      <form
         onSubmit={handleSubmit(submitHandler)}
         className={classes.formControl}
      >
         <WrapperOfForms>
            {isModal && (
               <Modal onClose={onChangeModal}>
                  <SuccessfulMessage
                     apiAnswer={responseAnswer}
                     onClose={onChangeModal}
                  />
               </Modal>
            )}
            <section className={classes.rightSection}>
               <Input
                  {...register('bookName')}
                  label="Название книги"
                  type="text"
                  placeholder="Напишите полное название книги"
                  className={classes.rightSectionInput}
                  id="nameOfBook"
                  hasError={errors.bookName}
                  defaultValue={uploadedBookName}
               />
               <Input
                  label="ФИО автора"
                  type="text"
                  placeholder="Напишите ФИО автора"
                  className={classes.rightSectionInput}
                  id="author"
                  hasError={errors.author}
                  {...register('author')}
                  defaultValue={uploadedAuthor}
               />
               <GenresSelect
                  label="Выберите жанр"
                  data={genres}
                  className={classes.rightSectionSelect}
                  initialstate="Литература, роман, стихи... "
                  onChangeGenreValue={onChangeGenreValue}
                  defaultValue={genre.genreName}
               />
               <CustomTextarea
                  label="O книге"
                  placeholder="Напишите о книге"
                  maxlengthofletters="1234"
                  maxLength="1234"
                  className={classes.textAreaClasses}
                  {...register('description')}
                  hasError={errors.description}
                  defaultValue={uploadedDescription}
               />
            </section>
            <section className={classes.leftSection}>
               <section className={classes.settingOfBook}>
                  <div className={classes.languagesBox}>
                     <CustomSelect
                        required
                        data={languagesFromApi}
                        initialstate="Русский"
                        label="Язык"
                        className={classes.leftSideSelect}
                        onChangeLanguagesValue={onChangeLanguagesValue}
                        defaultValue={uploadedLanguage}
                     />
                     <Input
                        {...register('dataOfIssue')}
                        placeholder="ГГ/ММ/ДД"
                        label="Год выпуска"
                        className={classes.leftSideDate}
                        step="1"
                        hasError={errors.dataOfIssue}
                        defaultValue={uploadedYearOfIssue}
                     />
                  </div>
                  <div className={classes.timeDuration}>
                     <Input
                        label="Длительность"
                        step="1"
                        placeholder="ч"
                        className={classes.timeDurationInput}
                        id="time"
                        {...register('hour')}
                        hasError={errors.hour}
                        defaultValue={duration.hour}
                     />
                     <Input
                        step="1"
                        placeholder="мин"
                        className={classes.timeDurationInputSec}
                        id="time"
                        {...register('minute')}
                        hasError={errors.minute}
                        defaultValue={duration.minute}
                     />
                     <Input
                        step="1"
                        placeholder="сек"
                        className={classes.timeDurationInputSec}
                        id="time"
                        {...register('second')}
                        hasError={errors.second}
                        defaultValue={duration?.second}
                     />
                  </div>
                  <div className={classes.bestSellerBox}>
                     <CustomCheckbox
                        label="Бестселлер"
                        className={classes.bestseller}
                        onChangeCheckBoxValue={onChangeCheckBoxValue}
                     />
                  </div>
                  <div className={classes.priceSelection}>
                     <Input
                        label="Стоимость"
                        type="number"
                        placeholder="сом"
                        className={classes.leftSideInput}
                        id="price"
                        {...register('price')}
                        hasError={errors.price}
                        defaultValue={uploadedPrice}
                     />
                     <Input
                        label="Скидка"
                        type="number"
                        placeholder="%"
                        className={classes.leftSideInput}
                        id="discount"
                        {...register('discount')}
                        defaultValue={uploadedDiscount}
                     />
                  </div>
                  <div className={classes.dropzoneBox}>
                     <AudioDropZone
                        audio={fragment}
                        setAudio={setFragment}
                        dropZoneOption={fragmentOption}
                     />
                     <AudioDropZone
                        audio={audio}
                        setAudio={setAudio}
                        dropZoneOption={audioOption}
                     />
                  </div>
                  <button type="submit" className={classes.submitButton}>
                     Отправить
                  </button>
               </section>
            </section>
         </WrapperOfForms>
      </form>
   )
}

export default UpdateAudioBook
