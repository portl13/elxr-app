import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import InputDashForm from '@components/shared/form/InputDashForm'
import { getStorePortlDetails } from '@api/channel-store.api'
import { UserContext } from '@context/UserContext'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import axios from 'axios'

const url = `${process.env.baseUrl}`

function Social() {
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const token = user?.token

  const formik = useFormik({
    initialValues: {
      facebook: '',
      youtube: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      snapchat: '',
    },
    onSubmit: async (values) => {
      setLoading(true)
      try {
        await axios.post(
          `${url}/wp-json/portl/v1/channel/social/`,
          {
            user_id: user.id,
            data: values,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        alert.success('Social Media Updated', TIMEOUT)
      } catch (error) {
        alert.error('Something went wrong', TIMEOUT)
      } finally {
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    if (!user?.id) return
    getStorePortlDetails(user)
      .then(({ data }) => {
        const { social } = data
        const socialValue = {}

        social.forEach((item) => {
          socialValue[item.name] = item.url
        })

        formik.setValues(socialValue)
      })
      .catch(() => {})
  }, [user])

  return (
    <div className="social position-relative">
      <form onSubmit={formik.handleSubmit} className="row">
        <div className="col-12 mb-4">
          <InputDashForm
            label="Facebook"
            name="facebook"
            type="text"
            placeholder="https://www.facebook.com/your-page"
            value={formik.values.facebook}
            onChange={formik.handleChange}
            error={formik.errors.facebook}
            touched={formik.touched.facebook}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Youtube"
            name="youtube"
            type="text"
            placeholder="https://www.youtube.com/channel/your-channel"
            value={formik.values.youtube}
            onChange={formik.handleChange}
            error={formik.errors.youtube}
            touched={formik.touched.youtube}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Instagram"
            name="instagram"
            type="text"
            placeholder="https://www.instagram.com/your-page"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            error={formik.errors.instagram}
            touched={formik.touched.instagram}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Twitter"
            name="twitter"
            type="text"
            placeholder="https://www.twitter.com/your-page"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            error={formik.errors.twitter}
            touched={formik.touched.twitter}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="TikTok"
            name="tiktok"
            type="text"
            placeholder="https://www.tiktok.com/your-page"
            value={formik.values.tiktok}
            onChange={formik.handleChange}
            error={formik.errors.tiktok}
            touched={formik.touched.tiktok}
          />
        </div>
        <div className="col-12 mb-4">
          <InputDashForm
            label="Snapchat"
            name="snapchat"
            type="text"
            placeholder="https://www.snapchat.com/your-page"
            value={formik.values.snapchat}
            onChange={formik.handleChange}
            error={formik.errors.snapchat}
            touched={formik.touched.snapchat}
          />
        </div>
        <div className="d-flex mt-3 justify-content-center justify-content-md-end w-100 col-12">
          <button className="btn btn-create px-5" type="submit">
            {!loading ? 'Save' : 'Updating'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Social
