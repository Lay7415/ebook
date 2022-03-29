import { getImageUrl } from '../../../utils/helpers'
import classes from './SortPageCard.module.css'

const SortPageCard = ({
   redirectToSingleBookPage,
   bookName,
   author,
   price,
   image,
   bookId,
}) => {
   const imgSrc = getImageUrl(image)

   const onGiveBookIdHandler = () => {
      redirectToSingleBookPage({ bookId, bookName })
   }
   return (
      <div className={classes.card}>
         <div>
            <img
               role="presentation"
               onClick={onGiveBookIdHandler}
               src={imgSrc}
               alt=""
               className={classes.img}
            />
         </div>
         <div>
            <p className={classes.name}>{bookName}</p>
            <p className={classes.author}>{author}</p>
            <p className={classes.price}>{price} c</p>
         </div>
      </div>
   )
}

export default SortPageCard
