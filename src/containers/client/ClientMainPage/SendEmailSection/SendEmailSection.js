import Button from '../../../../components/UI/Button/Button'
import classes from './SendEmailSection.module.css'

const SendEmailSection = () => {
   return (
      <div className={classes.sendEmailSectionContainer}>
         <div className={classes.content}>
            <h1 className={classes.title}>Подписаться на рассылку</h1>
            <div className={classes.sendEmailFieldContainer}>
               <input
                  className={classes.sendEmailField}
                  placeholder="  Напишите ваш E-mail"
                  type="text"
               />
               <Button>Отправить</Button>
            </div>
            <div className={classes.links}>
               <p>
                  <a className={classes.link} href="https://www.instagram.com/">
                     Instagram
                  </a>
               </p>
               <p>
                  <a className={classes.link} href="https://www.facebook.com/">
                     Facebook
                  </a>
               </p>
               <p>
                  <a className={classes.link} href="https://vk.com/">
                     Bконтакте
                  </a>
               </p>
            </div>
         </div>
      </div>
   )
}

export default SendEmailSection
