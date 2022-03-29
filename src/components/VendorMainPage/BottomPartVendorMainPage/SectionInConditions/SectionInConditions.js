import classes from './SectionInConditions.module.css'

const SectionInConditions = () => {
   return (
      <div className={classes.sectionInConditions}>
         <h2 className={classes.title}>Условия</h2>
         <div className={classes.sectionInConditionsContent}>
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

export default SectionInConditions
