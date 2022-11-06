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
import {
  createChannelFecth,
  getCategories,
  getChannelById,
} from '@request/dashboard'
import { useRouter } from 'next/router'
import { useAlert } from 'react-alert'
import useSWR from 'swr'
import { TIMEOUT } from '@utils/constant'
import MediaLibraryCover from '@components/shared/media/MediaLibraryCover'
import MediaLibraryAvatar from '@components/shared/media/MediaLibraryAvatar'
import useSWRImmutable from 'swr/immutable'
import InputDashTags from '@components/shared/form/InpushDashTags'

const url = process.env.apiV2
const baseUrl = `${process.env.apiV2}/channels`
const urlCategory = `${baseUrl}/categories/`
const urlTags = `${baseUrl}/tags/`

function EditChannelForm({ loading, setLoading, id }) {
  const router = useRouter()
  const alert = useAlert()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [cover, setCover] = useState()
  const [logo, setLogo] = useState()

  const [category, setCategory] = useState()
  const [tags, setTags] = useState([])

  const { data: channel, mutate } = useSWR(
    token ? [`${url}/channels/${id}`, token] : null,
    getChannelById
  )

  const createChannel = useFormik({
    initialValues: {
      channel_name: '',
      channel_description: '',
      category: '',
      tags: [],
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
      category: Yup.string().required('Category is required'),
      channel_cover: !cover
        ? Yup.string().required('Channel Cover is required')
        : Yup.string(),
      channel_logo: !logo
        ? Yup.string().required('Channel Logo is required')
        : Yup.string(),
    }),
  })

  const updateChannelSubmit = async (values) => {
    setLoading(true)
    try {
      await createChannelFecth(`${url}/channels/${id}`, token, values)
      await mutate(values)
      await router.push(`/manage/channels`)
      alert.success('Channel updated successfully', TIMEOUT)
      setLoading(false)
    } catch (error) {
      alert.error(error.message, TIMEOUT)
      setLoading(false)
    }
  }

  const { data: categories } = useSWRImmutable(
    token ? [urlCategory, token] : null,
    getCategories
  )

  const setCategoryValue = (value) => {
    setCategory(value)
    createChannel.setFieldValue('category', value.value)
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

      createChannel.setFieldValue('channel_type', channel.channel_type)

      if (channel?.channel_logo?.full !== '')
        setCover({ url: channel?.channel_cover?.full })
      if (channel?.channel_logo !== '') setLogo({ url: channel?.channel_logo })

      if (channel.category_id) {
        setCategory({ value: channel.category_id, label: channel.category })
        createChannel.setFieldValue('category', channel.category_id)
      }

      if (channel.tags) {
        const newTags = channel.tags.map(({ value, label }) => ({
          value,
          label,
        }))
        setTags(newTags)
        createChannel.setFieldValue('tags', newTags)
      }

      setLoading(false)
    }
  }, [channel])

  useEffect(() => {
    if (tags) {
      const newTags = tags.map((tag) => tag.value)
      createChannel.setFieldValue('tags', newTags)
    }
  }, [tags])

  return (
    <div className="mt-5">
      <div className="upload-contain d-flex flex-column justify-content-center align-items-center">
        <MediaLibraryCover
          token={token}
          cover={cover}
          reset={removeCover}
          selectMedia={selectCover}
          text="Upload Channel Cover"
          error={
            createChannel.errors.channel_cover &&
            createChannel.touched.channel_cover
              ? createChannel.errors.channel_cover
              : null
          }
        />

        <MediaLibraryAvatar
          token={token}
          logo={logo}
          url={logo?.url}
          reset={removeLogo}
          selectMedia={selectLogo}
          text="Channel Logo"
          error={
            createChannel.errors.channel_logo &&
            createChannel.touched.channel_logo
              ? createChannel.errors.channel_logo
              : null
          }
        />
      </div>
      <form onSubmit={createChannel.handleSubmit}>
        <div className="row">
          <div className="mt-5 col-12 mb-4">
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
          <div className="col-12 col-md-6 mb-4">
            <InputDashForm
              required={true}
              type="select"
              name="category"
              value={category}
              onChange={setCategoryValue}
              label="Category"
              placeholder={'Select Category'}
              error={createChannel.errors.category}
              touched={createChannel.touched.category}
              options={categories || []}
            />
          </div>
          <div className="col-12 col-md-6 mb-4">
            <InputDashTags value={tags} setValue={setTags} />
          </div>
          <div className="mt-3  col-12">
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

          <div className="col-12 mt-4">
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
            {loading ? 'Saving' : 'Edit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditChannelForm
