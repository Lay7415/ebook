import classes from './PriceInput.module.css'
import { NAVICON } from '../../../utils/constants/constants'

const PriceInput = ({
   firstPrice,
   secondPrice,
   setFirstPrice,
   setSecondPrice,
}) => {
   const changeFirstHandler = (e) => {
      setFirstPrice(e.target.value)
   }

   const changeSecondHandler = (e) => {
      setSecondPrice(e.target.value)
   }

   const progresLeft = (secondPrice / 10000) * 100
   const progresRight = 100 - (firstPrice / 10000) * 100

   return (
      <div className={classes.price}>
         <div className={classes.title}>
            Стоимость <img src={NAVICON.ARRDOWN} alt="" />
         </div>
         <div className={classes.bookprice}>
            <input
               placeholder="от"
               type="number"
               value={secondPrice}
               onChange={changeSecondHandler}
               min="0"
               max="10000"
            />
            <input
               placeholder="до"
               type="number"
               value={firstPrice}
               onChange={changeFirstHandler}
               min="0"
               max="10000"
            />
         </div>
         <div className={classes.slider}>
            <div
               style={{
                  height: '5px',
                  left: `${progresLeft}%`,
                  right: `${progresRight}%`,
                  position: 'absolute',
                  background: '#f34901',
               }}
            />
         </div>
         <div className={classes.rangein}>
            <input
               type="range"
               min="0"
               max="10000"
               value={secondPrice}
               onChange={changeSecondHandler}
               step={100}
            />
            <input
               type="range"
               min="0"
               max="10000"
               value={firstPrice}
               step={100}
               className={classes.rangemax}
               onChange={changeFirstHandler}
            />
         </div>
      </div>
   )
}

export default PriceInput
