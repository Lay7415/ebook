import { useState } from 'react'
import classes from './HistoryOperation.module.css'
import HistoryOperationBooksList from './HistoryOperationBooksList/HistoryOperationBooksList'
import HistoryOperationButtons from './HistoryOperationButtons/HistoryOperationButtons'
import HistoryOperationTitles from './HistoryOperationTitles/HistoryOperationTitles'

let numberOfParchased
let numberOfFavorites
let numberOfBasket

const HistoryOperation = () => {
   const [location, setLocation] = useState('parchased')

   let history = [
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 1,
         location: 'parchased',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 2,
         location: 'parchased',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 3,
         location: 'parchased',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 4,
         location: 'favorites',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 5,
         location: 'favorites',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 6,
         location: 'favorites',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 7,
         location: 'favorites',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 8,
         location: 'basket',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 9,
         location: 'basket',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 10,
         location: 'parchased',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
      {
         author: 'Baybolot',
         book_name: 'Super Mario',
         booksum: 5,
         data_registration: '12.12.22',
         discount: 360,
         id: 11,
         location: 'parchased',
         price: 560,
         promocode: 30,
         state: 'завершен',
      },
   ]

   const changeToParchased = () => {
      setLocation('parchased')
   }

   const changeToFavorites = () => {
      setLocation('favorites')
   }

   const changeToBasket = () => {
      setLocation('basket')
   }

   const cleanHistory = () => {
      // there will be some function, which delete data from server
   }

   const showBooks = () => {
      numberOfParchased = history.filter(
         (book) => book.location === 'parchased'
      ).length
      numberOfFavorites = history.filter(
         (book) => book.location === 'favorites'
      ).length
      numberOfBasket = history.filter(
         (book) => book.location === 'basket'
      ).length

      history = history.filter((book) => book.location === location)
      return <HistoryOperationBooksList history={history} />
   }

   return (
      <div className={classes.HistoryOperationContainer}>
         <HistoryOperationTitles cleanHistory={cleanHistory} />
         <div className={classes.showHistoryContainer}>
            <HistoryOperationButtons
               changeToParchased={changeToParchased}
               changeToFavorites={changeToFavorites}
               changeToBasket={changeToBasket}
               location={location}
               numberOfParchased={numberOfParchased}
               numberOfFavorites={numberOfFavorites}
               numberOfBasket={numberOfBasket}
            />
            <div className={classes.BooksList}>{showBooks()}</div>
         </div>
      </div>
   )
}

export default HistoryOperation
