import React from 'react'
import classes from './Tabs.module.css'
import Button from '../Button/Button'

export const Tab = ({ label, changeTab, isActive }) => {
   const onTabSelect = () => {
      changeTab(label)
   }

   return (
      <Button
         variant={isActive === label ? 'btnActive' : 'tabSwitcher'}
         className={classes.tab}
         onClick={onTabSelect}
      >
         {label}
      </Button>
   )
}

export const Tabs = ({ children }) => {
   return <div className={classes.tabs}>{children}</div>
}

export const TabPanel = ({ children, check, value }) => {
   return <div>{check === value ? children : ''}</div>
}
