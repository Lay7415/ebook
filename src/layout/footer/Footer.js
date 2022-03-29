import React from 'react'
import classes from './Footer.module.css'

const Footer = () => {
   return (
      <footer className={classes.footer}>
         <div className={classes.info}>
            <div className={classes.logo}>
               <p>eBooK</p>
            </div>
            <div className={classes.first}>
               <p>Жанры</p>
               <p>Аудиокниги</p>
               <p>Электронные книги</p>
            </div>
            <div className={classes.second}>
               <p>Бестселлеры</p>
               <p>Промокоды</p>
               <p>Политика конфиденциальности</p>
            </div>
            <div className={classes.third}>
               <p className={classes.bold}>Свяжитесь с нами</p>
               <p>+996 707 123 456</p>
               <p>г. Бишкек ул. Исанова 45</p>
            </div>
         </div>
      </footer>
   )
}

export default Footer
