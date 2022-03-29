import { useEffect, useState } from 'react'
import classes from './ClientMainPage.module.css'
import SpinningBooksSection from './SpinningBooksSection/SpinningBooksSection'
import ViewingTheBestBooksSection from './ViewingTheBestBooksSection/ViewingTheBestBooksSection'
import LatestPublicationsSection from './LatestPublicationsSection/LatestPublicationsSection'
import AudioBooksSection from './AudioBooksSection/AudioBooksSection'
import { getImageUrl, sendRequest } from '../../../utils/helpers'
import SendEmailSection from './SendEmailSection/SendEmailSection'
import {
   REQUEST_URL_MAIN_PAGE,
   MAIN_PAGE_REQUEST_TYPE,
} from '../../../utils/constants/urls'

const ClientMainPage = () => {
   const [topBooks, setTopBooks] = useState([])
   const [topImageBooks, setTopImageBooks] = useState([])
   const [bestSellerBooks, setBestsellerBooks] = useState([])
   const [imageBestSellerBooks, setImageBestSellerBooks] = useState([])
   const [electronicBooks, setElectronicBooks] = useState([])
   const [imageElectronicBooks, setImageElectronicBooks] = useState([])
   const [lastBooks, setLastBooks] = useState([])
   const [imageLastBooks, setImageLastBooks] = useState([])
   const [audioBooks, setAudioBooks] = useState([])
   const [imageAudioBooks, setImageAudioBooks] = useState([])

   const getTopThreeBooks = async () => {
      const configRequestForTopBooks = {
         url: `${REQUEST_URL_MAIN_PAGE}${MAIN_PAGE_REQUEST_TYPE.THE_MOST_POPULAR_BOOKS}`,
      }
      const response = await sendRequest(configRequestForTopBooks)
      setTopBooks(response)
      const images = response.map((imageItem) => {
         const imageSrc = getImageUrl(imageItem.image?.id)
         return imageSrc
      })
      setTopImageBooks(images)
   }

   const getBestsellerBooks = async () => {
      const configRequestForTopBooks = {
         url: `${REQUEST_URL_MAIN_PAGE}${MAIN_PAGE_REQUEST_TYPE.BESTSELLER}`,
      }
      const response = await sendRequest(configRequestForTopBooks)
      setBestsellerBooks(response)

      const images = response.map((imageItem) => {
         const imageSrc = getImageUrl(imageItem.image?.id)
         return imageSrc
      })
      setImageBestSellerBooks(images)
   }

   const getLastBooks = async () => {
      const configRequestForTopBooks = {
         url: `${REQUEST_URL_MAIN_PAGE}${MAIN_PAGE_REQUEST_TYPE.LAST}`,
      }
      const response = await sendRequest(configRequestForTopBooks)
      setLastBooks(response)

      const images = response.map((imageItem) => {
         const imageSrc = getImageUrl(imageItem.bookResponse.image.id)
         return imageSrc
      })
      setImageLastBooks(images)
   }

   const getElectronicBooks = async () => {
      const configRequestForTopBooks = {
         url: `${REQUEST_URL_MAIN_PAGE}${MAIN_PAGE_REQUEST_TYPE.ELECTRONIC}`,
      }
      const response = await sendRequest(configRequestForTopBooks)
      setElectronicBooks(response)

      const images = response.map((imageItem) => {
         const imageSrc = getImageUrl(imageItem.image?.id)
         return imageSrc
      })
      setImageElectronicBooks(images)
   }

   const getAudioBooks = async () => {
      const configRequestForTopBooks = {
         url: `${REQUEST_URL_MAIN_PAGE}${MAIN_PAGE_REQUEST_TYPE.AUDIO}`,
      }
      const response = await sendRequest(configRequestForTopBooks)
      setAudioBooks(response)

      const images = response.map((imageItem) => {
         const imageSrc = getImageUrl(imageItem.image?.id)
         return imageSrc
      })
      setImageAudioBooks(images)
   }

   useEffect(() => {
      getTopThreeBooks()
      getBestsellerBooks()
      getLastBooks()
      getElectronicBooks()
      getAudioBooks()
   }, [])

   return (
      <div className={classes.clientMainPageContainer}>
         {topBooks.length !== 0 ? (
            <SpinningBooksSection
               topImageBooks={topImageBooks}
               setTopBooks={setTopBooks}
               setTopImageBooks={setTopImageBooks}
               topBooks={topBooks}
            />
         ) : (
            ''
         )}

         {(bestSellerBooks.length && imageBestSellerBooks.length) !== 0 ? (
            <ViewingTheBestBooksSection
               setBooks={setBestsellerBooks}
               setBookImages={setImageBestSellerBooks}
               sectionTitle="Бестселлеры"
               books={bestSellerBooks}
               bookImages={imageBestSellerBooks}
            />
         ) : (
            ''
         )}

         {(lastBooks.length && imageLastBooks.length) !== 0 ? (
            <LatestPublicationsSection
               lastBooks={lastBooks}
               imageLastBooks={imageLastBooks}
            />
         ) : (
            <p>No books</p>
         )}
         {(audioBooks.length && imageAudioBooks.length) !== 0 ? (
            <AudioBooksSection
               audioBooks={audioBooks}
               imageAudioBooks={imageAudioBooks}
            />
         ) : (
            ''
         )}

         {(electronicBooks.length && imageElectronicBooks.length) !== 0 ? (
            <ViewingTheBestBooksSection
               setBooks={setElectronicBooks}
               setBookImages={setImageElectronicBooks}
               sectionTitle="Електронные книги"
               books={electronicBooks}
               bookImages={imageElectronicBooks}
            />
         ) : (
            ''
         )}
         <SendEmailSection />
      </div>
   )
}

export default ClientMainPage
