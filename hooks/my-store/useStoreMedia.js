import React from 'react'
import { TIMEOUT } from '@utils/constant'
import { updateStoreMedia } from '@api/channel-store.api'
import { useAlert } from 'react-alert'

function useStoreMedia(user,name, path, setMedia) {
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

      formData.append('user_id', user.id)

      const { data } = await updateStoreMedia(user, formData, path)

      setMedia(data.url)

      alert.success('Image successfully uploaded!', TIMEOUT)

    } catch (error) {

      alert.error('Error uploading image', TIMEOUT)
      
    } finally {
      setLoading(false)
    }
  }
  return [reset, handlerUploadImage, loading]
}

export default useStoreMedia
