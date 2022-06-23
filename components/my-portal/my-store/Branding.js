import React, { useEffect, useState } from 'react'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getStorePortlDetails,
  updateStoreDetails,
} from '@api/channel-store.api'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useStoreMedia from '@hooks/my-store/useStoreMedia'
import Loader from '@pages/profile/loader'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'

function Branding({ user }) {
  const alert = useAlert()
  const [logo, setLogo] = useState('')
  const [banner, setBanner] = useState('')
  const [statusUpdate, setStatusUpdate] = useState(false)
  const brandingForm = useFormik({
    initialValues: {
      store_name: '',
      store_email: '',
      phone: '',
      shop_description: '',
    },
    onSubmit: async (values) => {
      setStatusUpdate(true)
      updateStoreDetails(user, {
        user_id: user.id,
        data: {
          ...values,
        },
      })
        .then(() => {
          alert.success('Store successfully updated', TIMEOUT)
        })
        .catch(() => {
          alert.error('Error updating the configuration', TIMEOUT)
        })
        .finally(() => {
          setStatusUpdate(false)
        })
    },
    validationSchema: Yup.object({
      store_name: Yup.string().required('Store name is required'),
      store_email: Yup.string().required('Store email is required'),
      phone: Yup.string().required('Store phone is required'),
      shop_description: Yup.string().required('Store description is required'),
    }),
  })

  const [resetVendorBanner, handleVendorBanner, isloadingBanner] =
    useStoreMedia(user, 'vendor_banner', 'banner', setBanner)

  const [resetVendorLogo, handleVendorLogo, isLoadingLogo] = useStoreMedia(
    user,
    'vendor_shop_logo',
    'logo',
    setLogo
  )

  useEffect(() => {
    if (!user?.id) return
    getStorePortlDetails(user)
      .then(({ data }) => {
        brandingForm.setFieldValue('store_name', data.vendor_shop_name || '')
        brandingForm.setFieldValue('phone', data.vendor_shop_phone || '')
        brandingForm.setFieldValue('store_email', data.vendor_shop_email || '')
        brandingForm.setFieldValue(
          'shop_description',
          data.vendor_description || ''
        )
        setLogo(data.vendor_shop_logo || '')
        setBanner(data.vendor_banner || '')
      })
      .catch(() => {})
  }, [user])

  return (
    <div className="branding">
      <div className="row">
        <div className="col-12 col-md-7 ">
          <div className="upload-contain d-flex flex-column justify-content-center align-items-center ">
            {!banner && (
              <div className="upload-image  border-moteado d-flex justify-content-center align-items-center pointer">
                {!isloadingBanner ? (
                  <>
                    <input
                      onChange={handleVendorBanner}
                      accept="image/*"
                      type="file"
                      name="vendor_banner"
                      className="upload-input-hidden pointer"
                    />
                    <div className="upload-image-info text-center pb-5 pb-md-0">
                      <span className="upload-contain-icon ">
                        <FontAwesomeIcon
                          className="upload-image-icon"
                          icon={faPlus}
                        />
                      </span>
                      <p className="upload-cover-info">Upload cover image</p>
                      <span className="upload-info">
                        10 mb max, png or jpeg
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="loading-upload">
                    <Loader color="primary" />
                  </div>
                )}
              </div>
            )}

            {banner && (
              <div
                style={{
                  backgroundImage: `url(${banner})`,
                }}
                className="upload-image  border-moteado d-flex justify-content-center align-items-center solid"
              >
                <button
                  onClick={resetVendorBanner}
                  className="btn btn-clean-media banner"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}

            <div className="d-flex w-100 ">
              <div className="avatar-upload-contain text-center position-relative">
                {logo && (
                  <>
                    <button
                      onClick={resetVendorLogo}
                      className="btn btn-clean-media logo"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <div className="avatar-upload">
                      <div
                        style={{
                          backgroundImage: `url(${logo})`,
                        }}
                        className="avatar-contain-img ratio ratio-1x1 solid"
                      ></div>
                    </div>
                  </>
                )}
                {!logo && (
                  <div className="avatar-upload pointer">
                    {!isLoadingLogo ? (
                      <>
                        <input
                          onChange={handleVendorLogo}
                          accept="image/*"
                          type="file"
                          name="vendor_banner"
                          className="upload-input-hidden z-index-2 pointer"
                        />
                        <div className="avatar-contain-img ratio ratio-1x1"></div>
                        <span className="avatar-contain-icon">
                          <FontAwesomeIcon
                            className="upload-image-icon"
                            icon={faPlus}
                          />
                        </span>
                      </>
                    ) : (
                      <div className="avatar-contain-img ratio ratio-1x1">
                        <div className="loading-upload h-100 d-flex align-items-center w-100 justify-content-center">
                          <Loader color="primary" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="pl-3">
                  <p className="mb-0 mt-2">Brand Logo</p>
                  <span className="upload-info">10 mb max, png or jpeg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={brandingForm.handleSubmit}>
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
            <div className="input-search input-default border-radius-35 w-100 w-md-50  mb-3">
              <label className="w-100 w-md-50 upload-info mb-0" htmlFor="name">
                <div className="d-flex justify-content-between">
                  <span>
                    Store Name<span className="text-red">*</span>
                  </span>
                  <span className="invalid-feedback d-inline-block w-auto m-0">
                    {brandingForm.errors.store_name}
                  </span>
                </div>
                <input
                  className="bg-transparent py-0 text-white border-0 w-100"
                  type="name"
                  name="store_name"
                  value={brandingForm.values.store_name}
                  onChange={brandingForm.handleChange}
                />
              </label>
            </div>
            <div className="input-search mr-0  border-radius-35 w-100 w-md-50 pb-0 mb-3">
              <label className="w-100 w-md-50 mb-0 upload-info" htmlFor="email">
                <div className="d-flex justify-content-between">
                  <span>
                    Store Email<span className="text-red">*</span>
                  </span>
                  <span className="invalid-feedback d-inline-block w-auto m-0">
                    {brandingForm.errors.store_email}
                  </span>
                </div>
                <input
                  className="bg-transparent py-0 text-white border-0 w-100"
                  type="email"
                  name="store_email"
                  value={brandingForm.values.store_email}
                  onChange={brandingForm.handleChange}
                />
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div>
                <div className="input-search border-radius-35 pb-0 mr-0">
                  <label className="w-100 mb-0 upload-info " htmlFor="phone ">
                    <div className="d-flex justify-content-between">
                      <span>
                        Store Phone<span className="text-red">*</span>
                      </span>
                      <span className="invalid-feedback d-inline-block w-auto m-0">
                        {brandingForm.errors.phone}
                      </span>
                    </div>
                    <input
                      className="bg-transparent border-0 text-white w-100 mr-0"
                      name="phone"
                      type="phone"
                      value={brandingForm.values.phone}
                      onChange={brandingForm.handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <div className="input-search border-radius-35 pb-0 mr-0">
              <label className="w-100 mb-0 upload-info " htmlFor="description ">
                <div className="d-flex justify-content-between">
                  <span>
                    Description<span className="text-red">*</span>
                  </span>
                  <span className="invalid-feedback d-inline-block w-auto m-0">
                    {brandingForm.errors.shop_description}
                  </span>
                </div>
                <textarea
                  className="bg-transparent border-0 text-white w-100 mr-0"
                  cols="30"
                  rows="5"
                  name="shop_description"
                  value={brandingForm.values.shop_description}
                  onChange={brandingForm.handleChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="d-flex mt-3 justify-content-center justify-content-md-end">
          <button className="btn btn-create px-5" type="submit">
            {!statusUpdate ? 'Save' : 'Updating'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Branding
