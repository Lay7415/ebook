import React, { forwardRef } from 'react'
import './GenresSelect.css'

const GenresSelect = forwardRef((props, ref) => {
   const {
      className,
      initialstate,
      label,
      id,
      data,
      onChangeGenreValue,
      defaultValue,
      ...rest
   } = props

   const options = data
      ? data.map((item) => (
           <option key={item.id} id={item.id}>
              {item.genreName}
           </option>
        ))
      : ''

   const onChangeSelectValue = (e) => {
      const index = e.target.selectedIndex
      const el = e.target.childNodes[index]
      const option = el.getAttribute('id')
      onChangeGenreValue(option)
   }

   return (
      <div className="customBox">
         <label id={props.id} className="customSelect">
            {label} <span className="redStar">*</span>
         </label>
         <select
            {...rest}
            ref={ref}
            name="customSearch"
            className={`selectted ${className}`}
            required
            defaultValue={defaultValue || ''}
            onChange={onChangeSelectValue}
         >
            <option className="option" value="" disabled hidden>
               {initialstate}
            </option>
            {options}
         </select>
      </div>
   )
})

export default GenresSelect
