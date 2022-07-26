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
import InputDashForm from '@components/shared/form/InputDashForm'
import Editor from '@components/shared/editor/Editor'

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
      <form onSubmit={brandingForm.handleSubmit} className="row">
        <div className="col-12 col-md-6 mb-3">
          <InputDashForm
            name={'store_name'}
            type="text"
            label="Store Name"
            required={true}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.store_name}
            touched={brandingForm.touched.store_name}
            error={brandingForm.errors.store_name}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <InputDashForm
            type={'email'}
            label={'Store Email'}
            name={'store_email'}
            required={true}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.store_email}
            touched={brandingForm.touched.store_email}
            error={brandingForm.errors.store_email}
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <InputDashForm
            type={'text'}
            label={'Store Phone'}
            name={'phone'}
            required={true}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.phone}
            touched={brandingForm.touched.phone}
            error={brandingForm.errors.phone}
          />
        </div>

        <div className="col-12">
          <Editor
            className="editor-styles"
            onChange={(value) =>
              brandingForm.setFieldValue('shop_description', value)
            }
            value={brandingForm.values.shop_description}
          />
          {brandingForm.touched.shop_description && (
            <div className="invalid-feedback d-block">
              {brandingForm.errors.shop_description}
            </div>
          )}
        </div>

        <div className="d-flex mt-3 justify-content-center justify-content-md-end w-100">
          <button className="btn btn-create px-5" type="submit">
            {!statusUpdate ? 'Save' : 'Updating'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Branding