import DropZone from '../../../../components/UI/dropZone/DropZone'
import classes from './UploadImageCart.module.css'

const UploadImageCart = (props) => {
   const {
      mainPicture,
      secondPicture,
      thirdPicture,
      onChangeMainPictureHandler,
      onChangeSecondPictureHandler,
      onChangeThirdPictureHandler,
      deleteMainPictureHandler,
      deleteSecondPictureHandler,
      deleteThirdPictureHandler,
   } = props

   const firstButton = mainPicture && (
      <button
         type="button"
         className={classes.deleteBtn}
         onClick={deleteMainPictureHandler}
      >
         Удалить
      </button>
   )

   const secondButton = secondPicture && (
      <button
         type="button"
         className={classes.deleteBtn}
         onClick={deleteSecondPictureHandler}
      >
         Удалить
      </button>
   )

   const thirdButton = thirdPicture && (
      <button
         type="button"
         className={classes.deleteBtn}
         onClick={deleteThirdPictureHandler}
      >
         Удалить
      </button>
   )

   return (
      <section className={classes.uploadImageSection}>
         <div className={classes.imageblog}>
            <div className={classes.labelBlog}>
               <DropZone
                  avatar={mainPicture}
                  setAvatar={onChangeMainPictureHandler}
               />
               <p className={classes.mainImage}>Главное фото</p>
               {firstButton}
            </div>
            <div className={classes.labelBlog}>
               <DropZone
                  avatar={secondPicture}
                  setAvatar={onChangeSecondPictureHandler}
               />
               <p className={classes.mainImage}>2</p>
               {secondButton}
            </div>
            <div className={classes.labelBlog}>
               <DropZone
                  avatar={thirdPicture}
                  setAvatar={onChangeThirdPictureHandler}
               />
               <p className={classes.mainImage}>3</p>
               {thirdButton}
            </div>
         </div>
         <div className={classes.imageUploadRules}>
            <div className={classes.rullsTextContent}>
               <p className={classes.publication}>
                  Публикации с качественными фото получают больше откликов!
               </p>
               <h1 className={classes.imagesMustBe}>Фотографии должны быть:</h1>
               <ul className={classes.ulrules}>
                  <li className={classes.liRuls}>
                     Фон должен быть нейтральным, без теней, рисунков,
                     посторонних объектов или засветов
                  </li>
                  <li className={classes.midleLiFoto}>
                     Фото обязательно должно быть цветным
                  </li>
                  <li className={classes.lastLiFoto}>Фото</li>
               </ul>
            </div>
         </div>
      </section>
   )
}

export default UploadImageCart
