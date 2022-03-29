import styles from './WrapperOfForm.module.css'

const WrapperOfForms = ({ className, children }) => {
   return (
      <div className={`${styles.mainBlogOfPapperBook} ${className}`}>
         {children}
      </div>
   )
}

export default WrapperOfForms
