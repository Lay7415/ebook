import { useState } from 'react'
import { notPhoto } from '../../../../utils/constants/books'
import { getImageUrl } from '../../../../utils/helpers'
// import { getImageUrl } from '../../../../utils/helpers'
import classes from './BottomPartBookPage.module.css'
import SwitchButtons from './SwitchButtons/SwitchButtons'
import TextInBottomPart from './TextInBottomPart/TextInBottomPart'

const BottomPartBookPage = ({ book }) => {
   const [transition, setTransition] = useState('about')
   const thirdImage =
      book?.images[2]?.id === undefined
         ? notPhoto
         : getImageUrl(book?.images[2]?.id)

   const redirectToAbout = () => {
      setTransition('about')
   }

   const redirectToFragment = () => {
      setTransition('fragment')
   }

   return (
      <div className={classes.containerForInformationAboutBook}>
         <div className={classes.containerForAboutBookAndFragment}>
            <SwitchButtons
               redirectToAbout={redirectToAbout}
               redirectToFragment={redirectToFragment}
               book={book}
               transition={transition}
            />
            <TextInBottomPart book={book} transition={transition} />
         </div>
         <img
            className={classes.thirdImage}
            src={thirdImage}
            alt="some images"
         />
      </div>
   )
}

export default BottomPartBookPage
