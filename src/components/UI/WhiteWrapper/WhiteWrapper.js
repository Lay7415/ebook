import classes from './WhiteWrapper.module.css'

const WhiteWrapper = ({ children, className, onClick }) => {
   return (
      <div
         role="presentation"
         onClick={onClick}
         className={`${classes.WhiteWrapper} ${className}`}
      >
         {children}
      </div>
   )
}
export default WhiteWrapper
