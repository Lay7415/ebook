import { forwardRef } from 'react'
import classes from './AuthButton.module.css'

const AuthButton = forwardRef((props, ref) => {
   return (
      <button
         type="button"
         className={classes.authButton}
         {...props}
         ref={ref}
         disabled={props.disabled}
      >
         {props.children}
      </button>
   )
})

export default AuthButton
