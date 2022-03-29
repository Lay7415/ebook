import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import WrapperOfForms from '../../../../components/admin/wrapperOfAdminBook/WrapperOfForm'
import Input from '../../../../components/UI/input/Input'
import CustomSelect from '../../../../components/UI/customSelect/CustomSelect'
import CustomTextarea from '../../../../components/UI/customTextarea/CustomTextarea'
import CustomCheckbox from '../../../../components/UI/customCheckbox/CustomCheckbox'
import GenresSelect from '../../../../components/UI/genresSelect/GenresSelect'
import { sendWithFormDataToApi, sendRequest } from '../../../../utils/helpers'
import { UPLOAD_IMAGE } from '../../../../utils/constants/urls'
import classes from './VednorPaperBookForm.module.css'
import SuccessfulMessage from '../../../../components/UI/successMessage/SuccessfulMessage'
import BookSpinner from '../../../../components/UI/loadingSpinner/BookSpinner'
import Modal from '../../../../components/UI/modal-window/ModalWindow'

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

const VednorPaperBookForm = (props) => {
   const {
      languagesFromApi,
      genres,
      mainPicture,
      secondPicture,
      thirdPicture,
      deleteAllPictureHandler,
   } = props

   const [genreId, setGenreId] = useState('')
   const [typeOfLanguage, setTypeOfLanguage] = useState('')
   const [bestSeller, setBestseller] = useState(false)
   const [isModal, setIsModal] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
   const [responseAnswer, setResponseAnswer] = useState({
      error: null,
      bookName: '',
   })

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
         const firstImageId = await sendWithFormDataToApi(firstImageConfig)
         const secondImageId = await sendWithFormDataToApi(secondImageConfig)
         const thirdImageId = await sendWithFormDataToApi(thridImageConfig)
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
         const trasformedBook = {
            images: [firstImageId.id, secondImageId.id, thirdImageId.id],
            bookName,
            author,
            description,
            price: +price,
            discount: +discount,
            genreId: +genreId,
            language: typeOfLanguage,
            yearOfIssue: dataOfIssue,
            bestSeller,
            book: {
               fragment,
               quantityOfBooks: +quantityOfBooks,
               pageSize: +pageSize,
               publishingHouse,
            },
         }

         const sendPaperBookUrl = 'api/books/save/paper_book'
         const requestConfig = {
            method: 'POST',
            url: sendPaperBookUrl,
            body: trasformedBook,
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
            {isLoading && <BookSpinner />}
            <div className={classes.rightSection}>
               <Input
                  label="Название книги"
                  {...register('bookName')}
                  type="text"
                  placeholder="Напишите полное название книги"
                  className={classes.rightSectionInputVendor}
                  id="name"
                  hasError={errors.bookName}
               />
               <Input
                  label="ФИО автора"
                  type="text"
                  placeholder="Напишите ФИО автора"
                  {...register('author')}
                  className={classes.rightSectionInputVendor}
                  id="author"
                  hasError={errors.author}
               />
               <GenresSelect
                  label="Выберите жанр"
                  data={genres}
                  className={classes.rightSectionSelectVendor}
                  initialstate="Литература, роман, стихи... "
                  onChangeGenreValue={onChangeGenreValue}
               />
               <Input
                  label="Издательство"
                  {...register('publishingHouse')}
                  type="text"
                  placeholder="Напишите название издательства"
                  className={classes.rightSectionInputVendor}
                  id="izdatelstvo"
                  hasError={errors.publishingHouse}
               />
               <CustomTextarea
                  label="O книге"
                  {...register('description')}
                  placeholder="Напишите о книге"
                  maxlengthofletters="1234"
                  maxLength="1234"
                  className={classes.textAreaClassVendor}
                  hasError={errors.description}
               />
               <CustomTextarea
                  label="Фрагмент книги"
                  {...register('fragment')}
                  placeholder="Напишите фрагмент книги"
                  maxlengthofletters="9234"
                  maxLength="9234"
                  className={classes.textAreaClassVendor}
                  hasError={errors.fragment}
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
                  />
                  <Input
                     label="Объем"
                     {...register('pageSize')}
                     type="number"
                     placeholder="стр."
                     className={classes.leftSideInput}
                     id="total"
                     hasError={errors.pageSize}
                  />
                  <Input
                     label="Стоимость"
                     {...register('price')}
                     type="number"
                     placeholder="сом"
                     className={classes.leftSideInput}
                     id="price"
                     hasError={errors.price}
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
                  />
                  <Input
                     label="Кол-во книг"
                     {...register('quantityOfBooks')}
                     type="number"
                     placeholder="шт."
                     className={classes.leftSideInput}
                     id="number"
                     hasError={errors.quantityOfBooks}
                  />
                  <Input
                     label="Скидка"
                     {...register('discount')}
                     type="number"
                     placeholder="1%"
                     className={classes.leftSideInput}
                     id="discount"
                  />
                  <button type="submit" className={classes.submitButtonVednor}>
                     Отправить
                  </button>
               </div>
            </div>
         </WrapperOfForms>
      </form>
   )
}

export default VednorPaperBookForm
