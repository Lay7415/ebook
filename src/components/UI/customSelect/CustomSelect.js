import React, { forwardRef } from 'react'
import './CustomSelect.css'

const CustomSelect = forwardRef((props, ref) => {
   const {
      getOptionLabel,
      getOptionValue,
      className,
      initialstate,
      label,
      id,
      data,
      onChangeLanguagesValue,
      defaultValue,
      ...rest
   } = props

   const onChangeLanguageValue = (e) => {
      onChangeLanguagesValue(e.target.value)
   }

   const options = data
      ? data.map((item, index) => (
           <option
              key={getOptionValue ? getOptionValue(item) : index}
              id={getOptionValue ? getOptionValue(item) : index}
              className="languageOption"
           >
              {item}
           </option>
        ))
      : ''

   return (
      <div className="customBox">
         <label id={props.id} className="customSelect">
            {label} <span className="redStar">*</span>
         </label>
         <select
            onChange={onChangeLanguageValue}
            ref={ref}
            {...rest}
            name="customSearch"
            className={`selectted ${className}`}
            required
            defaultValue={defaultValue || ''}
         >
            <option className="option" value="" disabled hidden>
               {initialstate}
            </option>
            {options}
         </select>
      </div>
   )
})

export default CustomSelect
