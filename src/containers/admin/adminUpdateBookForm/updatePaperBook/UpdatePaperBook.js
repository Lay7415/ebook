import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import WrapperOfForms from '../../../../components/admin/wrapperOfAdminBook/WrapperOfForm'
import Input from '../../../../components/UI/input/Input'
import CustomTextarea from '../../../../components/UI/customTextarea/CustomTextarea'
import CustomCheckbox from '../../../../components/UI/customCheckbox/CustomCheckbox'
import GenresSelect from '../../../../components/UI/genresSelect/GenresSelect'
import CustomSelect from '../../../../components/UI/customSelect/CustomSelect'
import { sendWithFormDataToApi, sendRequest } from '../../../../utils/helpers'
import Modal from '../../../../components/UI/modal-window/ModalWindow'
import SuccessfulMessage from '../../../../components/UI/successMessage/SuccessfulMessage'
import {
   UPDATE_PAPER_BOOK,
   UPLOAD_IMAGE,
} from '../../../../utils/constants/urls'
import BookSpinner from '../../../../components/UI/loadingSpinner/BookSpinner'
import classes from './UpdatePaperBook.module.css'

const schema = yup.object().shape({
   bookName: yup.string().required(),
   author: yup.string().required(),
   publishingHouse: yup.string().required(),
   description: yup.string().required(),
   fragment: yup.string().required(),
   pageSize: yup.number().required(),
   price: yup.number().required(),
   discount: yup.number().required(),
   dataOfIssue: yup.string().required(),
   quantityOfBooks: yup
      .number()
      .required('Quantity of Books should be required please'),
})

const UpdatePaperBook = (props) => {
   const {
      languagesFromApi,
      genres,
      mainPicture,
      secondPicture,
      thirdPicture,
      deleteAllPictureHandler,
      bookInfo,
   } = props
   const {
      author: uploadedAuthor,
      bookName: uploadedBookName,
      bookId: uploadedBookid,
      description: uploadedDescription,
      fragment: uploadedFragment,
      language: uploadedLanguage,
      pageSize: uploadedPageSize,
      price: uplodedPrice,
      publishingHouse: updloadedPublishingHouse,
      yearOfIssue: uploadedYearOfIssue,
      quantityOfBooks: bookQuantity,
      genre: { id: uploadedGenreId, genreName: upldoadedGenreName },
   } = bookInfo

   const [genreId, setGenreId] = useState('')
   const [typeOfLanguage, setTypeOfLanguage] = useState('')
   const [bestSeller, setBestseller] = useState(false)
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

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      mode: 'all',
      resolver: yupResolver(schema),
   })

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

         if (firstImageId.ok && secondImageId.ok && thirdImageId.ok)
            await setResponseAnswer({
               error: firstImageId || secondImageId || thirdImageId,
            })

         const {
            bookName,
            author,
            description,
            price,
            discount,
            fragment,
            quantityOfBooks,
            pageSize,
            publishingHouse,
            dataOfIssue,
         } = data

         const transformedGenreId = !genreId ? uploadedGenreId : genreId
         const transformedLang = uploadedLanguage || typeOfLanguage

         const trasformedBook = {
            images: [firstImageId.id, secondImageId.id, thirdImageId.id],
            bookName,
            author,
            description,
            price,
            discount,
            genreId: +transformedGenreId,
            language: transformedLang,
            yearOfIssue: +dataOfIssue,
            bestSeller,
            book: {
               fragment,
               quantityOfBooks,
               pageSize,
               publishingHouse,
            },
         }
         const requestConfig = {
            method: 'PUT',
            url: UPDATE_PAPER_BOOK + uploadedBookid,
            body: trasformedBook,
         }
         const response = await sendRequest(requestConfig)
         setIsLoading(false)
         reset()
         setResponseAnswer({
            bookName: response.bookName,
            error: '',
            message: 'успешно изменён !',
         })
         deleteAllPictureHandler()
         return setIsModal(true)
      } catch (error) {
         setIsLoading(false)
         setResponseAnswer({
            error: error.message || 'Something went wrong !',
         })
         return setIsModal(true)
      }
   }
   const getOptionLabel = (item) => item

   const getOptionValue = (item) => item

   return (
      <form
         onSubmit={handleSubmit(submitHandler)}
         className={classes.formControlUpdateForm}
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
            {isLoading && <BookSpinner />}

            <div className={classes.rightSection}>
               <Input
                  label="Название книги"
                  {...register('bookName')}
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
                  {...register('author')}
                  className={classes.rightSectionInput}
                  id="author"
                  hasError={errors.author}
                  defaultValue={uploadedAuthor}
               />
               <GenresSelect
                  label="Выберите жанр"
                  data={genres}
                  className={classes.rightSectionSelect}
                  initialstate="Литература, роман, стихи... "
                  onChangeGenreValue={onChangeGenreValue}
                  defaultValue={upldoadedGenreName}
               />
               <Input
                  label="Издательство"
                  {...register('publishingHouse')}
                  type="text"
                  placeholder="Напишите название издательства"
                  className={classes.rightSectionInput}
                  id="izdatelstvo"
                  hasError={errors.publishingHouse}
                  defaultValue={updloadedPublishingHouse}
               />
               <CustomTextarea
                  label="O книге"
                  {...register('description')}
                  placeholder="Напишите о книге"
                  maxlengthofletters="1234"
                  maxLength="1234"
                  className={classes.textAreaClass}
                  hasError={errors.description}
                  defaultValue={uploadedDescription}
               />
               <CustomTextarea
                  label="Фрагмент книги"
                  {...register('fragment')}
                  placeholder="Напишите фрагмент книги"
                  maxlengthofletters="9234"
                  maxLength="9234"
                  className={classes.textAreaClass}
                  hasError={errors.fragment}
                  defaultValue={uploadedFragment}
               />
            </div>
            <div className={classes.leftSection}>
               <div className={classes.settingOfBook}>
                  <CustomSelect
                     required
                     data={languagesFromApi}
                     getOptionLabel={getOptionLabel}
                     getOptionValue={getOptionValue}
                     initialstate="Русский"
                     label="Язык"
                     className={classes.leftSideSelect}
                     onChangeLanguagesValue={onChangeLanguagesValue}
                     defaultValue={uploadedLanguage}
                  />
                  <Input
                     label="Объем"
                     {...register('pageSize')}
                     type="number"
                     placeholder="стр."
                     className={classes.leftSideInput}
                     id="total"
                     hasError={errors.pageSize}
                     defaultValue={uploadedPageSize}
                  />
                  <Input
                     label="Стоимость"
                     {...register('price')}
                     type="number"
                     placeholder="сом"
                     className={classes.leftSideInput}
                     id="price"
                     hasError={errors.price}
                     defaultValue={uplodedPrice}
                  />
                  <CustomCheckbox
                     label="Бестселлер"
                     className={classes.bestsellers}
                     onChangeCheckBoxValue={onChangeCheckBoxValue}
                  />
               </div>
               <div className={classes.settingOfPrice}>
                  <Input
                     {...register('dataOfIssue')}
                     step="1"
                     placeholder="ГГ/ММ/ДД"
                     label="Год выпуска"
                     className={classes.leftSideDate}
                     id="year"
                     hasError={errors.dataOfIssue}
                     defaultValue={uploadedYearOfIssue}
                  />
                  <Input
                     label="Кол-во книг"
                     {...register('quantityOfBooks')}
                     type="number"
                     placeholder="шт."
                     className={classes.leftSideInput}
                     id="number"
                     hasError={errors.quantityOfBooks}
                     defaultValue={bookQuantity}
                  />
                  <Input
                     label="Скидка"
                     {...register('discount')}
                     type="number"
                     placeholder="1%"
                     className={classes.leftSideInput}
                     id="discount"
                     defaultValue={bookInfo.discount || 0}
                  />
                  <button type="submit" className={classes.submitButton}>
                     Отправить
                  </button>
               </div>
            </div>
         </WrapperOfForms>
      </form>
   )
}

export default UpdatePaperBook
