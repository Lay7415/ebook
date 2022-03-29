import classes from './HistoryOperationTitles.module.css'

const HistoryOperationTitles = (cleanHistory) => {
   return (
      <div className={classes.HistoryOperationTitles}>
         <p
            role="presentation"
            onClick={cleanHistory}
            className={classes.cleanHistory}
         >
            Очистить историю
         </p>
         <p className={classes.container}>Фото</p>
         <p className={classes.authorAndName}>Название/Автор</p>
         <p className={classes.container}>Количество</p>
         <p className={classes.container}>Цена</p>
         <p className={classes.dataRegistration}>Дата</p>
         <p>Состояние</p>
      </div>
   )
}

export default HistoryOperationTitles
