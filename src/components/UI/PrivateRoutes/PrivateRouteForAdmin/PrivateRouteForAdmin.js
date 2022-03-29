import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ROUTES, ROLES } from '../../../../utils/constants/constants'

const PrivateRouteForAdmin = ({ children }) => {
   const role = useSelector((state) => state.role.roleData)
   const navigate = useNavigate()

   if (role === null) {
      navigate(-1)
   }
   if (role !== ROLES.ADMIN) {
      navigate(ROUTES.NO_ACCESS)
   }

   return children
}
export default PrivateRouteForAdmin
