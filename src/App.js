import './App.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncAutoUpdateBreadcrumb } from './store/breadCrumbsSlice'
import { asyncUpdateUserRole } from './store/userRoleSlice'
import AppRoutes from './routes/AppRoutes'

function App() {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(asyncUpdateUserRole())
      dispatch(asyncAutoUpdateBreadcrumb())
   }, [])

   return (
      <div className="App">
         <AppRoutes />
      </div>
   )
}

export default App
