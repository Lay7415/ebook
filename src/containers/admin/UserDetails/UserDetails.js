import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tabs, Tab, TabPanel } from '../../../components/UI/Tabs/Tabs'
import UserProfile from '../../../components/admin/UserProfile/UserProfile'
import BreadCrumbs from '../../../components/UI/BreadCrumbs/BreadCrumbs'
import HistoryOperation from '../../../components/HistoryOperation/HistoryOperation'
import classes from './UserDetails.module.css'
import { sendRequest } from '../../../utils/helpers'

const UserDetails = () => {
   const [activeTab, setActiveTab] = useState('Профиль')
   const [userById, setUserById] = useState('')
   const params = useParams()

   const getUserById = async () => {
      try {
         const userUrl = {
            url: `api/clients/getById/${params.userId}`,
         }
         const response = await sendRequest(userUrl)
         await setUserById(response)
      } catch (error) {
         console.log(error.message)
      }
   }

   useEffect(() => {
      getUserById()
   }, [])

   const handleChange = (value) => {
      setActiveTab(value)
   }

   return (
      <div className={classes.userDetailsContainerForContent}>
         <BreadCrumbs />
         <Tabs>
            <Tab
               changeTab={handleChange}
               isActive={activeTab}
               label="Профиль"
            />
            <Tab changeTab={handleChange} isActive={activeTab} label="Книги" />
         </Tabs>

         <TabPanel check="Профиль" value={activeTab}>
            <UserProfile userById={userById} />
         </TabPanel>
         <TabPanel check="Книги" value={activeTab}>
            <HistoryOperation />
         </TabPanel>
      </div>
   )
}

export default UserDetails
