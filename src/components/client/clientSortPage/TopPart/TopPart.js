import React, { useState } from 'react'
import WhiteWrapper from '../../../UI/WhiteWrapper/WhiteWrapper'
import { NAVICON } from '../../../../utils/constants/constants'
import classes from './TopPart.module.css'

const TopPart = ({ books }) => {
   const [arrow, setArrow] = useState(false)
   const ArrowChangeHandler = () => {
      setArrow((prev) => !prev)
   }
   return (
      <main className={classes.main}>
         <span className={classes.found}>Найдены {books} книг</span>
         <span
            className={classes.sort}
            onClick={ArrowChangeHandler}
            role="presentation"
         >
            Сортировать <img src={NAVICON.ARRDOWN} alt="" />
            {arrow && (
               <WhiteWrapper className={classes.modal}>
                  <span className={classes.new}>Новинки</span>
                  <span className={classes.best}>Бестселлеры</span>
               </WhiteWrapper>
            )}
         </span>
      </main>
   )
}

export default TopPart
