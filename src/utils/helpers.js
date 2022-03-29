export const saveToLocalStorage = (key, value) => {
   return localStorage.setItem(key, JSON.stringify(value))
}
export const getFromLocalStorage = (key) => {
   const json = localStorage.getItem(key)
   return JSON.parse(json)
}
export const deleteFromLocalStorage = (key) => {
   return localStorage.removeItem(key)
}

const DEFAULT_URL = 'http://3.123.114.41/'

const E_BOOK_USER_TOKEN = 'EbookUserToken'

export const sendRequest = async (requestConfig) => {
   const userInfo = getFromLocalStorage(E_BOOK_USER_TOKEN) || []
   const requestOptions = {
      method: requestConfig.method || 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${userInfo.token}`,
      },
   }

   if (requestConfig.method !== 'GET' && requestConfig.body) {
      requestOptions.body = JSON.stringify(requestConfig.body)
   }
   const response = await fetch(DEFAULT_URL + requestConfig.url, requestOptions)
   if (!response.ok) {
      throw new Error(response.message)
   }

   const contentType = response.headers.get('content-type')

   if (contentType.includes('text/plain')) {
      return response.text()
   }

   if (contentType.includes('application/json')) {
      return response.json()
   }

   return {}
}

export const sendFileToApi = async (requestConfig) => {
   const requestOptions = {
      method: requestConfig.method,
      body: requestConfig.body,
   }
   const response = await fetch(DEFAULT_URL + requestConfig.url, requestOptions)
   if (!response.ok) {
      throw new Error(response.message)
   }
   const result = await response.json()
   return result
}

export const getImageUrl = (id) => {
   const imageSrc = `http://3.123.114.41/static/download/${id}`
   return imageSrc
}

export const sendWithFormDataToApi = (requestOptions) => {
   const formData = new FormData()
   formData.append('file', requestOptions.file)
   const requestConfig = {
      method: 'POST',
      url: requestOptions.url,
      body: formData,
   }
   const response = sendFileToApi(requestConfig)
   return response
}
