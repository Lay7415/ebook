import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import WrapperOfForms from '../../../../components/admin/wrapperOfAdminBook/WrapperOfForm'
import Input from '../../../../components/UI/input/Input'
import CustomSelect from '../../../../components/UI/customSelect/CustomSelect'
import CustomTextarea from '../../../../components/UI/customTextarea/CustomTextarea'
import CustomCheckbox from '../../../../components/UI/customCheckbox/CustomCheckbox'
import GenresSelect from '../../../../components/UI/genresSelect/GenresSelect'
import {
   UPDATE_ELECTONIC_BOOK,
   UPLOAD_IMAGE,
   UPLOAD_PDF_FILE,
} from '../../../../utils/constants/urls'
import PdfDropZone from '../../../../components/UI/pdfDropZone/PdfDropZone'
import { sendRequest, sendWithFormDataToApi } from '../../../../utils/helpers'
import Modal from '../../../../components/UI/modal-window/ModalWindow'
import SuccessfulMessage from '../../../../components/UI/successMessage/SuccessfulMessage'
import BookSpinner from '../../../../components/UI/loadingSpinner/BookSpinner'
import classes from './UpdateVendorsElectroBookForm.module.css'

const schema = yup.object().shape({
   bookName: yup.string().required(),
   author: yup.string().required(),
   publishingHouse: yup.string().required(),
   description: yup.string().required(),
   fragment: yup.string().required(),
   price: yup.number().required(),
   dataOfIssue: yup.string().required(),
})
const UpdateVendorsElectroBookForm = (props) => {
   const {
      languagesFromApi,
      genres,
      mainPicture,
      secondPicture,
      thirdPicture,
      bookInfo,
      deleteAllPictureHandler,
   } = props
   const {
      author: newAuthor,
      bookId: newBookId,
      bookName: newBookName,
      description: newDescription,
      fragment: newFragment,
      genre: { id: uploadedGenreId, genreName: uploadedGenreName },
      language: uploadedLanguage,
      pageSize: uploadedPageSize,
      price: uploadedPrice,
      publishingHouse: uploadedPublishingHouse,
      yearOfIssue: uploadedYearOfIssue,
      pdf: { fileName: uploadedFileName },
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
   const [isLoading, setIsLoading] = useState(false)
   const onChangeModal = () => {
      setIsModal((prevState) => !prevState)
   }

   const [pdf, setPdf] = useState({ file: { name: uploadedFileName } })

   const onChangeLanguagesValue = (lang) => {
      setTypeOfLanguage(lang)
   }

   const onChangeGenreValue = (genreId) => {
      setGenreId(genreId)
   }

   const onChangeCheckBoxValue = (value) => {
      setBestseller(value)
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

      const pdfFileOption = {
         file: pdf.file,
         url: UPLOAD_PDF_FILE,
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
         let idOfElectronicBook = null

         if (!pdf.file.path) {
            idOfElectronicBook = { id: bookInfo.pdf.id }
         } else {
            idOfElectronicBook = await sendWithFormDataToApi(pdfFileOption)
         }

         if (
            firstImageId.ok &&
            secondImageId.ok &&
            thirdImageId.ok &&
            idOfElectronicBook.ok
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
            fragment,
            pageSize,
            price,
            publishingHouse,
         } = data
         const exchangeGenreId = !genreId ? uploadedGenreId : genreId
         const exchangeLanguage = !typeOfLanguage
            ? uploadedLanguage
            : typeOfLanguage

         const transformedData = {
            images: [firstImageId.id, secondImageId.id, thirdImageId.id],
            bookName,
            author,
            genreId: +exchangeGenreId,
            description,
            language: exchangeLanguage,
            yearOfIssue: +dataOfIssue,
            bestSeller,
            price,
            discount: +discount,
            book: {
               fragment,
               pageSize: +pageSize,
               publishingHouse,
               electronicBookId: idOfElectronicBook.id,
            },
         }
         const requestConfig = {
            method: 'PUT',
            url: UPDATE_ELECTONIC_BOOK + newBookId,
            body: transformedData,
         }
         const response = await sendRequest(requestConfig)
         setIsLoading(false)
         deleteAllPictureHandler()
         reset()
         setResponseAnswer({
            bookName: response.bookName,
            error: null,
         })

         return setIsModal(true)
      } catch (error) {
         setIsLoading(false)
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
            <div className={classes.rightSection}>
               <Input
                  label="Название книги"
                  type="text"
                  placeholder="Напишите полное название книги"
                  className={classes.rightSectionInputVendor}
                  id="name"
                  {...register('bookName')}
                  hasError={errors.bookName}
                  defaultValue={newBookName}
               />
               <Input
                  label="ФИО автора"
                  type="text"
                  placeholder="Напишите ФИО автора"
                  className={classes.rightSectionInputVendor}
                  id="author"
                  {...register('author')}
                  hasError={errors.author}
                  defaultValue={newAuthor}
               />
               <GenresSelect
                  label="Выберите жанр"
                  data={genres}
                  className={classes.rightSectionSelectVendor}
                  initialstate="Литература, роман, стихи... "
                  onChangeGenreValue={onChangeGenreValue}
                  defaultValue={uploadedGenreName}
               />
               <Input
                  label="Издательство"
                  type="text"
                  placeholder="Напишите название издательства"
                  className={classes.rightSectionInputVendor}
                  id="izdatelstvo"
                  {...register('publishingHouse')}
                  defaultValue={uploadedPublishingHouse}
               />
               <CustomTextarea
                  label="O книге"
                  placeholder="Напишите о книге"
                  maxlengthofletters="1234"
                  maxLength="1234"
                  {...register('description')}
                  hasError={errors.description}
                  className={classes.textAreaClassVendor}
                  defaultValue={newDescription}
               />
               <CustomTextarea
                  label="Фрагмент книги"
                  placeholder="Напишите фрагмент книги"
                  maxlengthofletters="9234"
                  maxLength="9234"
                  {...register('fragment')}
                  hasError={errors.fragment}
                  className={classes.textAreaClassVendor}
                  defaultValue={newFragment}
               />
            </div>
            <div className={classes.containerOfSideBox}>
               <div className={classes.leftSideBox}>
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
                     label="Объем"
                     type="number"
                     placeholder="стр."
                     className={classes.leftSideInput}
                     id="number"
                     {...register('pageSize')}
                     hasError={errors.pageSize}
                     defaultValue={uploadedPageSize}
                  />
                  <Input
                     label="Стоимость"
                     type="number"
                     placeholder="сом"
                     className={classes.leftSideInput}
                     id="price"
                     {...register('price')}
                     defaultValue={uploadedPrice}
                  />
                  <div className={classes.uploadFrag}>
                     <PdfDropZone pdf={pdf} setPdf={setPdf} />
                  </div>
               </div>
               <div className={classes.rigthSideOfBox}>
                  <Input
                     placeholder="ГГ/ММ/ДД"
                     label="Год выпуска"
                     className={classes.leftSideDate}
                     {...register('dataOfIssue')}
                     hasError={errors.dataOfIssue}
                     defaultValue={uploadedYearOfIssue}
                  />
                  <CustomCheckbox
                     label="Бестселлер"
                     className={classes.bestseller}
                     onChangeCheckBoxValue={onChangeCheckBoxValue}
                  />
                  <Input
                     label="Скидка"
                     type="number"
                     placeholder="%"
                     className={classes.leftSideInput}
                     id="discount"
                     {...register('discount')}
                     defaultValue={bookInfo.discount}
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

export default UpdateVendorsElectroBookForm
