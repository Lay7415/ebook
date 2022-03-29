import React, { forwardRef } from 'react'
import './Input.css'

const Input = forwardRef((props, ref) => {
   const { className, label, id, hasError, ...rest } = props
   return (
      <div className={`input ${className} `}>
         <label htmlFor={id}>
            {label}
            {label && <span className="redStar">*</span>}
         </label>
         <input
            id={id}
            ref={ref}
            {...rest}
            className={hasError ? 'hasError' : ''}
         />
      </div>
   )
})

export default Input
