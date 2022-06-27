import React from 'react'
import { TIMEOUT } from '@utils/constant'
import { useAlert } from 'react-alert'
import { uploadProductImage } from '@request/dashboard'

const url = `${process.env.apiURl}/product/image/`

function useProductMedia(user, setMedia) {
  const [loading, setLoading] = React.useState(false)
  const alert = useAlert()
  const reset = () => {
    setMedia('')
  }
  const handlerUploadImage = (e) => {
    if (e.target.files.length >= 1) {
      uploadImage(e.target.files[0])
    }
  }
  const uploadImage = async (file) => {
    setLoading(true)
    try {
      const formData = new FormData()

      formData.append('image', file)

      const data = await uploadProductImage(url, user?.token, formData)

      setMedia(data)

      alert.success('Image successfully uploaded!', TIMEOUT)
    } catch (error) {
      alert.error('Error uploading image', TIMEOUT)
    } finally {
      setLoading(false)
    }
  }
  return [reset, handlerUploadImage, loading]
}

export default useProductMedia
