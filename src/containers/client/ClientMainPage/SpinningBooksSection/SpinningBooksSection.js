import classes from './SpinningBooksSection.module.css'
import BlackWrapper from '../../../../components/UI/BlackWrapper/BlackWrapper'
import SpinningBooks from './SpinningBooks/SpinningBooks'
import { ReactComponent as OrangeArrowButton } from '../../../../assets/icons/orangeArrow.svg'

const SpinningBooksSection = ({
   topBooks,
   setTopBooks,
   topImageBooks,
   setTopImageBooks,
}) => {
   const moveImageToRight = () => {
      const firstbook = topBooks.shift()
      setTopBooks([...topBooks, firstbook])

      const firstImageBook = topImageBooks.shift()
      setTopImageBooks([...topImageBooks, firstImageBook])
   }

   const moveImageToLeft = () => {
      const lastbook = topBooks.pop()
      setTopBooks([lastbook, ...topBooks])

      const lastImageBook = topImageBooks.pop()
      setTopImageBooks([lastImageBook, ...topImageBooks])
   }

   return (
      <BlackWrapper className={classes.spinningBooksSectionContainer}>
         {topBooks && (
            <div className={classes.spinningBooksSectionContent}>
               <OrangeArrowButton
                  onClick={moveImageToLeft}
                  className={classes.orangeArrowLeft}
               />
               <SpinningBooks topImageBooks={topImageBooks} books={topBooks} />
               <OrangeArrowButton
                  onClick={moveImageToRight}
                  className={classes.orangeArrowRight}
               />
            </div>
         )}
      </BlackWrapper>
   )
}

export default SpinningBooksSection
