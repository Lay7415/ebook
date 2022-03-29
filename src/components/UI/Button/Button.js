import React from 'react'
import './Button.css'

const STYLES = [
   'primary',
   'secondary',
   'tertiary',
   'load',
   'contained',
   'select',
   'light',
   'redirectActiveButton',
   'redirectButton',
   'deleteProfile',
   'tabSwitcher',
   'btnActive',
   'variantBecomeToSeller',
   'btnActive',
   'aboutMoreBtn',
   'goBack',
   'profile',
   'add',
   'create',
   'cancel',
]

const Button = ({ className, onClick, disabled, children, variant }) => {
   const checkButtonStyle = STYLES.includes(variant) ? variant : STYLES[0]

   return (
      <button
         className={`btn ${className} ${checkButtonStyle}`}
         onClick={onClick}
         disabled={disabled}
         type="button"
      >
         {children}
      </button>
   )
}

export default Button
