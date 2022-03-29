import classes from './SinglePageLayout.module.css'
import TopPartBookPage from '../BookPage/TopPartBookPage/TopPartBookPage'
import BottomPartBookPage from '../BookPage/BottomPartBookPage/BottomPartBookPage'

const SinglePageLayout = () => {
   const booklist = []
   return (
      <div className={classes.ContainerForBook}>
         <TopPartBookPage booklist={booklist} />
         <BottomPartBookPage booklist={booklist} />
      </div>
   )
}

export default SinglePageLayout
