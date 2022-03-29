import React from 'react'
import classes from './ClientBookCard.module.css'

const ClientBookCard = ({ book, className, onAddButton }) => {
   return (
      <div>
         <ul className={classes.styles}>
            <li>
               <div
                  className={`${classes.card} ${className}`}
                  onClick={onAddButton}
                  role="presentation"
               >
                  <img src={book.url} alt="" />
                  <div className={classes.info}>
                     <p className={classes.title}>{book.title}</p>
                     <p className={classes.author}>{book.author}</p>
                     <p className={classes.price}>{book.price} с</p>
                  </div>
               </div>
            </li>
         </ul>
      </div>
   )
}

export default ClientBookCard
