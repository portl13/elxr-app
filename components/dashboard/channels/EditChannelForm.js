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
import { createChannelFecth, getChannelById } from '@request/dashboard'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import useSWR from 'swr'
import { TIMEOUT } from '@utils/constant'
import MediaLibraryCover from '@components/shared/media/MediaLibraryCover'
import MediaLibraryAvatar from '@components/shared/media/MediaLibraryAvatar'
const url = process.env.apiV2

function EditChannelForm({ loading, setLoading, id }) {
  const router = useRouter()
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [cover, setCover] = useState()
  const [logo, setLogo] = useState()

  const { data: channel, mutate } = useSWR(
    token ? [`${url}/channels/${id}`, token] : null,
    getChannelById
  )

  const createChannel = useFormik({
    initialValues: {
      channel_name: '',
      channel_description: '',
      channel_category: '',
      channel_logo: '',
      channel_cover: '',
      channel_type: 'open',
    },
    onSubmit: async (values) => updateChannelSubmit(values),
    validationSchema: Yup.object({
      channel_name: Yup.string().required('Channel name is required'),
      channel_description: Yup.string().required(
        'Channel description is required'
      ),
    }),
  })

  const updateChannelSubmit = async (values) => {
    setLoading(true)
    try {
      await createChannelFecth(`${url}/channels/${id}`, token, values)
      await mutate(values)
      router.push(`/dashboard/channels`)
      alert.success('Channel updated successfully', TIMEOUT)
      setLoading(false)
    } catch (error) {
      alert.error(error.message, TIMEOUT)
      setLoading(false)
    }
  }

  const selectLogo = (media) => {
    setLogo({ url: media.source_url })
    createChannel.setFieldValue('channel_logo', media.id)
  }

  const selectCover = (media) => {
    setCover({ url: media.source_url })
    createChannel.setFieldValue('channel_cover', media.id)
  }

  const removeLogo = () => {
    setLogo(null)
    createChannel.setFieldValue('channel_logo', '')
  }

  const removeCover = () => {
    setCover(null)
    createChannel.setFieldValue('channel_cover', '')
  }

  useEffect(() => {
    if (channel) {
      createChannel.setFieldValue('channel_name', channel.channel_name)
      createChannel.setFieldValue(
        'channel_description',
        channel.channel_description
      )
      createChannel.setFieldValue('channel_privacy', channel.channel_privacy)
      createChannel.setFieldValue('channel_price', channel.channel_price)
      createChannel.setFieldValue('channel_type', channel.channel_type)

      if (channel?.channel_logo?.full !== '')
        setCover({ url: channel?.channel_cover?.full })
      if (channel?.channel_logo !== '') setLogo({ url: channel?.channel_logo })
    }
  }, [channel])

  return (
    <div className="mt-5">
      <div className="upload-contain d-flex flex-column justify-content-center align-items-center">
        <MediaLibraryCover
          token={token}
          cover={cover}
          reset={removeCover}
          selectMedia={selectCover}
          text="Upload Channel Cover"
        />

        <MediaLibraryAvatar
          token={token}
          logo={logo}
          url={logo?.url}
          reset={removeLogo}
          selectMedia={selectLogo}
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
              touched={createChannel.touched.channel_name}
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
            {createChannel.errors.channel_description &&
              createChannel.touched.channel_description && (
                <div className="invalid-feedback d-block">
                  {createChannel.errors.channel_description}
                </div>
              )}
          </div>

          <div className="col-12 px-0 mt-4">
            <div>
              <h4>Visibility Settings</h4>
            </div>
            <div className="d-flex">
              <div className="my-4 d-flex col-12 px-0">
                <InputDashRadio
                  values={[
                    {
                      value: 'open',
                      label: 'Open',
                    },
                    {
                      value: 'subscribers',
                      label: 'Subscribers Only',
                    },
                  ]}
                  name={'channel_type'}
                  value={createChannel.values.channel_type}
                  onChange={createChannel.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
          <button type="submit" className="btn btn-create px-5">
            {loading ? 'Saving' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditChannelForm
