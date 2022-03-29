import classes from './BlackWrapper.module.css'

const BlackWrapper = ({ onClick, className, size, children }) => {
   return (
      <div
         role="presentation"
         onClick={onClick}
         className={`${classes.BlackWrapper} ${className}`}
         style={size}
      >
         {children}
      </div>
   )
}
export default BlackWrapper
