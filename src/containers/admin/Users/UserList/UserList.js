import classes from './UserList.module.css'
import UserItem from './UserItem/UserItem'

const UserList = ({ userlist, sendRequestDeleteClient }) => {
   return (
      <div>
         <ol className={classes.list}>
            {userlist &&
               userlist !== [] &&
               userlist.map((user) => {
                  return (
                     <UserItem
                        sendRequestDeleteClient={sendRequestDeleteClient}
                        firstName={user.name}
                        email={user.email}
                        id={user.clientId}
                        key={user.clientId}
                     />
                  )
               })}
         </ol>
      </div>
   )
}

export default UserList
