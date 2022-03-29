import React, { forwardRef } from 'react'
import './UpdateInput.css'

const UpdateInput = forwardRef((props, ref) => {
   const { className, label, id, ...rest } = props
   return (
      <div className={`input ${className} `}>
         <label htmlFor={id}>{label}</label>
         <input id={id} ref={ref} {...rest} />
      </div>
   )
})

export default UpdateInput
