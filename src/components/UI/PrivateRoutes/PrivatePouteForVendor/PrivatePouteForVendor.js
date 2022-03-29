import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES, ROUTES } from '../../../../utils/constants/constants'

const PrivateRouteForVendor = ({ children }) => {
   const role = useSelector((state) => state.role.roleData)
   const navigate = useNavigate()

   if (role === null) {
      navigate(-1)
   }
   if (role !== ROLES.VENDOR) {
      navigate(ROUTES.NO_ACCESS)
   }

   return children
}
export default PrivateRouteForVendor
