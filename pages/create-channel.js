import React, { useRef, useState, useEffect, useContext } from 'react'
import Head from 'next/head'
import {
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from 'reactstrap'
import BlockUi, { containerBlockUi } from '@components/ui/blockui/BlockUi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Axios from 'axios'
import { UserContext } from '@context/UserContext'
import {useRouter} from 'next/router'
import LayoutAuth from '@components/layout/LayoutAuth'
import Header from '@components/layout/Header'
import { inputLabelStyle, BackLink } from '@components/ui/auth/auth.style'
import axios from 'axios'
const url = process.env.baseUrl

export default function CreateChanelDetailPage() {
  const router = useRouter()

  const isMounted = useRef(true)

  const { user, setUser } = useContext(UserContext)

  const [blocking, setBlocking] = useState(false)

  const [fail, setFail] = useState({
    status: false,
    message: '',
  })

  const source = Axios.CancelToken.source()

  const createChannel = async ({
    channel_description,
    social,
    channel_name,
  }) => {
    setBlocking(true)

    try {
      if (isMounted) {

        await axios.post('/api/create-channel',{
          user,
          dataStore:{
            store_name: channel_name,
            shop_description: channel_description,
            social,
          },
          channelID: user.id
        })

        user.roles.push("wcfm_vendor")

        setUser({ ...user })

        router.push('/channel-manager?tab=home&nav=store')

        setBlocking(false)
      }
    } catch (e) {
      if (isMounted) {
        if (Axios.isCancel(e)) {
          setBlocking(false)
        } else {
          if (e.response) {
            const { data } = e.response
            setFail({
              status: true,
              message: data.message,
            })
            setBlocking(false)
          }
          setBlocking(false)
        }
      }
    }
  }

  const channelForm = useFormik({
    initialValues: {
      channel_name: '',
      channel_description: '',
      social: {
        twitter: '',
        fb: '',
        instagram: '',
        youtube: '',
        linkedin: '',
        gplus: '',
        snapchat: '',
        pinterest: '',
      },
    },
    validationSchema: Yup.object({
      channel_name: Yup.string()
        .min(4, 'very short name')
        .required('Channel name is required'),
    }),
    onSubmit: (values) => createChannel(values),
  })

  useEffect(() => {
    return () => {
      isMounted.current = false
      source.cancel()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Add Channel Detail</title>
      </Head>
      <LayoutAuth image={true}>
        <Header actionButton={true} />
        <div className="form-section">
          <BackLink>
            <a href="/" className="back">
              {' '}
              Back{' '}
            </a>
          </BackLink>
          <Form css={[containerBlockUi]} onSubmit={channelForm.handleSubmit}>
            {blocking && <BlockUi color="#eb1e79" />}
            <header className="text-center">
              <h3 className="form-sub-title">Add</h3>
              <h1 className="form-title">Channel Details</h1>
            </header>
            <div className="inner-form">
              <FormGroup>
                <Label css={inputLabelStyle} for="channel_name">
                  Channel Name
                </Label>
                <Input
                  className="form-input"
                  id="channel_name"
                  name="channel_name"
                  type="text"
                  value={channelForm.values.channel_name}
                  onChange={channelForm.handleChange}
                />
                {channelForm.errors.channel_name &&
                channelForm.touched.channel_name ? (
                  <Alert className="mt-3" color="danger">
                    {channelForm.errors.channel_name}
                  </Alert>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label for="channel_description">Channel Description</Label>
                <Input
                  className="form-input"
                  id="channel_description"
                  name="channel_description"
                  type="textarea"
                  value={channelForm.values.channel_description}
                  onChange={channelForm.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="fb">Facebook Profile URL</Label>
                <Input
                  className="form-input"
                  id="fb"
                  name="social.fb"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.fb}
                />
              </FormGroup>
              <FormGroup>
                <Label for="twitter">Twitter Profile URL</Label>
                <Input
                  className="form-input"
                  id="twitter"
                  name="social.twitter"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.twitter}
                />
              </FormGroup>
              <FormGroup>
                <Label for="instagram">Instagram Profile URL</Label>
                <Input
                  className="form-input"
                  id="instagram"
                  name="social.instagram"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.instagram}
                />
              </FormGroup>
              <FormGroup>
                <Label for="linkedin">Twitch Profile URL</Label>
                <Input
                  className="form-input"
                  id="linkedin"
                  name="social.linkedin"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.linkedin}
                />
              </FormGroup>
              <FormGroup>
                <Label for="youtube">Youtube Profile URL</Label>
                <Input
                  className="form-input"
                  id="youtube"
                  name="social.youtube"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.youtube}
                />
              </FormGroup>
              <FormGroup>
                <Label for="gplus">Official Website</Label>
                <Input
                  className="form-input"
                  id="gplus"
                  name="social.gplus"
                  type="text"
                  onChange={channelForm.handleChange}
                  value={channelForm.values.social.gplus}
                />
              </FormGroup>
              <FormGroup className="mt-1 mb-5">
                <input
                  className="btn btn-primary submit-button"
                  value="Submit"
                  type="submit"
                />
              </FormGroup>
            </div>
          </Form>
        </div>
      </LayoutAuth>
    </>
  )
}
