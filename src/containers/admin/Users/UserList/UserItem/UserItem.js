import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { asyncUpdateBreadcrumb } from '../../../../../store/breadCrumbsSlice'
import { ROUTES } from '../../../../../utils/constants/constants'
import classes from './UserItem.module.css'
import DeleteButton from '../../../../../components/UI/DeleteButton/DeleteButton'
import ModalForDelete from '../../../../../components/UI/ModalForDelete/ModalForDelete'

const UserItem = (props) => {
   const { id, firstName, email, sendRequestDeleteClient } = props

   const breadcrumbs = [
      {
         route_name: 'Пользователи',
         route: ROUTES.USERS,
      },
      {
         route_name: firstName,
      },
   ]

   const [isShowModal, setIsShowModal] = useState(false)
   const dispatch = useDispatch()

   const onOpenHundler = () => {
      setIsShowModal((isShowModal) => !isShowModal)
   }

   const onCloseHundler = () => {
      setIsShowModal((isShowModal) => !isShowModal)
   }

   const onDeleteHundler = () => {
      sendRequestDeleteClient(id)
      setIsShowModal((isShowModal) => !isShowModal)
   }

   const sendBreadCrumbs = () => {
      dispatch(asyncUpdateBreadcrumb(breadcrumbs))
   }

   return (
      <div className={classes.containerLiFor}>
         <Link to={`${ROUTES.USERS}/${id}`}>
            <li
               role="presentation"
               className={classes.li}
               onClick={sendBreadCrumbs}
            >
               <p className={classes.mediumBox}>{firstName}</p>
               <p className={classes.mediumBox}>{email}</p>
            </li>
         </Link>
         <DeleteButton onClick={onOpenHundler} />
         {isShowModal && (
            <ModalForDelete
               fullName={firstName}
               id={id}
               onClose={onCloseHundler}
               onDelete={onDeleteHundler}
            />
         )}
      </div>
   )
}

export default UserItem
