import { forwardRef } from 'react'
import './CustomCheckbox.css'

const CustomCheckbox = forwardRef((props, ref) => {
   const onChangeCheckbox = (e) => {
      props.onChangeCheckBoxValue(e.target.checked)
   }
   return (
      <div className={`customCheckboxContainer ${props.className}`}>
         <label className={`container ${props.className}`}>
            {props.label}
            <input type="checkbox" ref={ref} onChange={onChangeCheckbox} />
            <span className={`checkmark ${props.className}`} />
         </label>
      </div>
   )
})

export default CustomCheckbox
