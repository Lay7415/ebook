import classes from './StartSection.module.css'

const StartSection = () => {
   return (
      <div className={classes.startSectionContiner}>
         <h2 className={classes.title}>Как начать продавать на eBook?</h2>
         <div className={classes.startSectionContent}>
            <div className={classes.cardBox}>
               <img
                  className={classes.cardImage}
                  src="https://media.contentapi.ea.com/content/dam/walrus/celebration-edition/swbf2-blog-image-ce-rise-of-skywalker-keyart.jpg.adapt.crop191x100.628p.jpg"
                  alt=""
               />
               <p className={classes.cardText}>
                  В целом, конечно, экономическая повестка сегодняшнего дня
                  прекрасно подходит для реализации переосмысления
                  внешнеэкономических политик.
               </p>
            </div>
            <div className={classes.cardBox}>
               <img
                  className={classes.cardImage}
                  src="https://media.contentapi.ea.com/content/dam/walrus/celebration-edition/swbf2-blog-image-ce-rise-of-skywalker-keyart.jpg.adapt.crop191x100.628p.jpg"
                  alt=""
               />
               <p className={classes.cardText}>
                  В целом, конечно, экономическая повестка сегодняшнего дня
                  прекрасно подходит для реализации переосмысления
                  внешнеэкономических политик.
               </p>
            </div>
            <div className={classes.cardBox}>
               <img
                  className={classes.cardImage}
                  src="https://media.contentapi.ea.com/content/dam/walrus/celebration-edition/swbf2-blog-image-ce-rise-of-skywalker-keyart.jpg.adapt.crop191x100.628p.jpg"
                  alt=""
               />
               <p className={classes.cardText}>
                  В целом, конечно, экономическая повестка сегодняшнего дня
                  прекрасно подходит для реализации переосмысления
                  внешнеэкономических политик.
               </p>
            </div>
         </div>
      </div>
   )
}

export default StartSection
