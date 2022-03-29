import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { GET_ALL_BOOKS_VENDOR } from '../../../utils/constants/urls'
import { sendRequest } from '../../../utils/helpers'
import VendorBooks from '../../VendorBooks/VendorBooks'

const VendorArea = () => {
   const [books, setBooks] = useState()
   const userRole = useSelector((state) => state.role.roleData)

   const getAllBooksVendor = async () => {
      const configRequest = { url: GET_ALL_BOOKS_VENDOR }
      const response = await sendRequest(configRequest)
      setBooks(response)
   }

   useEffect(() => {
      getAllBooksVendor()
   }, [])

   return (
      <div>
         <VendorBooks userRole={userRole} vendorBooks={books} />
      </div>
   )
}

export default VendorArea
