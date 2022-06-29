import React, { useContext, useState, useEffect } from 'react'
import InputDashForm from '@components/shared/form/InputDashForm'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputDashCurrency from '@components/shared/form/InputDashCurrency'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import Editor from '@components/shared/editor/Editor'
import { UserContext } from '@context/UserContext'
import useChannelMedia from '@hooks/channels/useChannelMedia'
import InputFileCover from '@components/shared/form/InputFileCover'
import InputFileAvatar from '@components/shared/form/InputFileAvatar'
import { createChannelFecth } from '@request/dashboard'
import { useRouter } from 'next/router'

function CreateChannelForm() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [cover, setCover] = useState()
  const [logo, setLogo] = useState()
  const [loading, setLoading] = useState(false)

  const createChannel = useFormik({
    initialValues: {
      channel_name: '',
      channel_description: '',
      channel_category: '',
      channel_logo: '',
      channel_cover: '',
      channel_privacy: 'public',
      channel_price: 0,
      channel_type: 'free',
    },
    onSubmit: async (values) => createChannelSubmit(values),
    validationSchema: Yup.object({
      channel_name: Yup.string().required('Channel name is required'),
      channel_description: Yup.string().required(
        'Channel description is required'
      ),
    }),
  })

  const createChannelSubmit = async (values) => {
    {
      try {
        await createChannelFecth('/api/channel', token, values)
        createChannel.resetForm()
        //router.push('/dashboard/channels')
      } catch (error) {
        console.log(
          '🚀 ~ file: CreateChannelForm.js ~ line 34 ~ onSubmit: ~ error',
          error
        )
      }
    }
  }

  const setPrice = (value, field) => {
    if (!value) return
    createChannel.setFieldValue(field, value)
  }

  const [resetCover, handlerUploadCover, isLoadingCover] = useChannelMedia(
    token,
    setCover
  )
  const [resetLogo, handlerUploadLogo, isLoadingLogo] = useChannelMedia(
    token,
    setLogo
  )

  useEffect(() => {
    if (logo) {
      createChannel.setFieldValue('channel_logo', logo.id)
    }
  }, [logo])

  useEffect(() => {
    if (cover) {
      createChannel.setFieldValue('channel_cover', cover.id)
    }
  }, [cover])

  return (
    <div className="mt-5">
      <div className="upload-contain d-flex flex-column justify-content-center align-items-center">
        <InputFileCover
          cover={cover}
          url={cover?.url}
          reset={resetCover}
          handlerUpload={handlerUploadCover}
          isLoading={isLoadingCover}
          text="Upload Channel Cover"
        />
        <InputFileAvatar
          logo={logo}
          url={logo?.url}
          reset={resetLogo}
          handlerUpload={handlerUploadLogo}
          isLoading={isLoadingLogo}
          text="Channel Logo"
        />
      </div>
      <form onSubmit={createChannel.handleSubmit}>
        <div className="row">
          <div className="mt-5 col-12 px-0">
            <InputDashForm
              required={true}
              type="text"
              name={'channel_name'}
              value={createChannel.values.channel_name}
              error={createChannel.errors.channel_name}
              onChange={createChannel.handleChange}
              label={'Channel Name'}
            />
          </div>
          <div className="mt-3  col-12 px-0">
            <Editor
              className="editor-styles"
              onChange={(value) =>
                createChannel.setFieldValue('channel_description', value)
              }
              value={createChannel.values.channel_description}
            />
            <div className="invalid-feedback d-block">
              {createChannel.errors.channel_description}
            </div>
          </div>
          <div className="my-4 d-flex col-12 px-0">
            <InputDashRadio
              values={[
                {
                  label: 'Free',
                  value: 'free',
                },
                {
                  label: 'Paid',
                  value: 'paid',
                },
              ]}
              name={'channel_type'}
              value={createChannel.values.channel_type}
              onChange={createChannel.handleChange}
            />
          </div>

          <div className="col-12 col-md-6 px-0">
            <InputDashCurrency
              name="channel_price"
              value={createChannel.values.channel_price}
              error={createChannel.errors.channel_price}
              onChange={setPrice}
              disabled={createChannel.values.channel_type === 'free'}
            />
          </div>

          <div className="col-12 px-0">
            <div>
              <h4>Privacy Settings</h4>
            </div>
            <div className="d-flex">
              <InputDashRadio
                values={[
                  {
                    label: 'Public',
                    value: 'public',
                  },
                  {
                    label: 'Private',
                    value: 'private',
                  },
                ]}
                name={'channel_privacy'}
                value={createChannel.values.channel_privacy}
                onChange={createChannel.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
          <button type="submit" className="btn btn-create px-5">
            {loading ? 'Saving' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateChannelForm
