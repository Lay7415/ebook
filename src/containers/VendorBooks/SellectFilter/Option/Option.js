import classes from './Option.module.css'

const Option = ({ optionName, changeKeyName, optionWithLine }) => {
   const sendNewKeyName = () => {
      changeKeyName(optionName)
   }

   return (
      <div role="presentation" onClick={sendNewKeyName}>
         <p
            className={
               optionWithLine
                  ? classes.optionWithLine
                  : classes.optionWithoutLine
            }
         >
            {optionName}
         </p>
      </div>
   )
}

export default Option
