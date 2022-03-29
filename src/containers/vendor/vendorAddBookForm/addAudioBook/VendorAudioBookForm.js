import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
   SEND_AUDIO_BOOK_URL,
} from '../../../../utils/constants/urls'
import classes from './VendorAudioBookForm.module.css'
import AudioDropZone from '../../../../components/UI/audioDropZone/AudioDropZone'
import BookSpinner from '../../../../components/UI/loadingSpinner/BookSpinner'
import SuccessfulMessage from '../../../../components/UI/successMessage/SuccessfulMessage'
import Modal from '../../../../components/UI/modal-window/ModalWindow'

const schema = yup.object().shape({
   bookName: yup.string().required(),
   author: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required(),
   discount: yup.number().required(),
   dataOfIssue: yup.string().required(),
})

const VendorAudioBookForm = (props) => {
   const {
      languagesFromApi,
      genres,
      mainPicture,
      secondPicture,
      thirdPicture,
      deleteAllPictureHandler,
   } = props
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
   const [audio, setAudio] = useState({ audio: {} })
   const [fragment, setFragment] = useState({ audio: {} })
   const [isModal, setIsModal] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [responseAnswer, setResponseAnswer] = useState({
      error: null,
      bookName: '',
   })

   const onChangeModal = () => {
      setIsModal((prevState) => !prevState)
   }
   const onChangeLanguagesValue = (lang) => {
      setTypeOfLanguage(lang)
   }

   const onChangeGenreValue = (genreId) => {
      setGenreId(genreId)
   }

   const onChangeCheckBoxValue = (value) => {
      setBestseller(value)
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
      setIsLoading(true)
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
         const firstImageId = await sendWithFormDataToApi(firstImageConfig)
         const secondImageId = await sendWithFormDataToApi(secondImageConfig)
         const thirdImageId = await sendWithFormDataToApi(thridImageConfig)

         const uploadFragment = await sendWithFormDataToApi(uploadAudioOption)
         const uploadAudio = await sendWithFormDataToApi(uploadFragmentOption)

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
         const transformedData = {
            images: [firstImageId.id, secondImageId.id, thirdImageId.id],
            bookName,
            author,
            genreId: +genreId,
            description,
            yearOfIssue: +dataOfIssue,
            language: typeOfLanguage,
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
            method: 'POST',
            url: SEND_AUDIO_BOOK_URL,
            body: transformedData,
         }
         const response = await sendRequest(requestConfig)
         setIsLoading(false)
         setResponseAnswer({
            bookName: response.bookName,
            error: '',
            message: 'Ваш запрос был успешно отправлен!',
         })
         deleteAllPictureHandler()
         reset()
         return setIsModal(true)
      } catch (error) {
         setIsLoading(false)
         setResponseAnswer({
            error: error.message,
         })
         return setIsModal(true)
      }
   }
   return (
      <form
         onSubmit={handleSubmit(submitHandler)}
         className={classes.formControl}
      >
         {isModal && (
            <Modal onClose={onChangeModal}>
               <SuccessfulMessage
                  apiAnswer={responseAnswer}
                  onClose={onChangeModal}
               />
            </Modal>
         )}
         {isLoading && <BookSpinner />}
         <WrapperOfForms>
            <section className={classes.rightSection}>
               <Input
                  {...register('bookName')}
                  label="Название книги"
                  type="text"
                  placeholder="Напишите полное название книги"
                  className={classes.rightSectionInputVendor}
                  id="nameOfBook"
                  hasError={errors.bookName}
               />
               <Input
                  label="ФИО автора"
                  type="text"
                  placeholder="Напишите ФИО автора"
                  className={classes.rightSectionInputVendor}
                  id="author"
                  hasError={errors.author}
                  {...register('author')}
               />
               <GenresSelect
                  label="Выберите жанр"
                  data={genres}
                  className={classes.rightSectionSelectVendor}
                  initialstate="Литература, роман, стихи... "
                  onChangeGenreValue={onChangeGenreValue}
               />
               <CustomTextarea
                  label="O книге"
                  placeholder="Напишите о книге"
                  maxlengthofletters="1234"
                  maxLength="1234"
                  className={classes.textAreaClassesVendor}
                  {...register('description')}
                  hasError={errors.description}
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
                     />
                     <Input
                        {...register('dataOfIssue')}
                        placeholder="ГГ/ММ/ДД"
                        label="Год выпуска"
                        className={classes.leftSideDate}
                        step="1"
                        hasError={errors.dataOfIssue}
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
                     />
                     <Input
                        step="1"
                        placeholder="мин"
                        className={classes.timeDurationInputSec}
                        id="time"
                        {...register('minute')}
                        hasError={errors.minute}
                     />
                     <Input
                        step="1"
                        placeholder="сек"
                        className={classes.timeDurationInputSec}
                        id="time"
                        {...register('second')}
                        hasError={errors.second}
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
                     />
                     <Input
                        label="Скидка"
                        type="number"
                        placeholder="%"
                        className={classes.leftSideInput}
                        id="discount"
                        {...register('discount')}
                     />
                  </div>
                  <div className={classes.dropzoneBoxVendor}>
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
                  <button type="submit" className={classes.submitButtonVendor}>
                     Отправить
                  </button>
               </section>
            </section>
         </WrapperOfForms>
      </form>
   )
}

export default VendorAudioBookForm
