import InputDashForm from '@components/shared/form/InputDashForm'
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { createEventsFecth } from '@request/dashboard'
import 'rc-time-picker/assets/index.css'

import { UserContext } from '@context/UserContext'
import Editor from '@components/shared/editor/Editor'
import { useAlert } from 'react-alert'
import { TIMEOUT } from '@utils/constant'
import { useContext } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXRay } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import axios from "axios";

const bossApi = process.env.bossApi + '/invites'
const baseUrl = process.env.apiV2
const urlCategory = `${baseUrl}/channel-event/categories`

export const SendInvites = ({ curntUserId }) => {
  const { user } = useContext(UserContext)
  const alert = useAlert()
  const token = user?.token
  const router = useRouter()
  const [addInvite, setAddInvite] = useState([{ id: 0 }])

  const sentInvitesForm = useFormik({
    initialValues: {
      fields: [
        {
          name: '',
          email_id: '',
        },
      ],
      email_subject: `An invitation from ${user?.displayName} to join PORTL`,
      email_content: `You have been invited by  ${user?.displayName} to join the PORTL community.`,
    },
    onSubmit: async (values) => createSendInvites(values),
    validationSchema: Yup.object({
      email_subject: Yup.string().required('Description is required'),
    }),
  })

  const handleSubmit = async () => {
    await sentInvitesForm.submitForm()
  }

  const createSendInvites = async (values) => {
    const {data} = await axios.post(bossApi, values,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    console.log({data})
  }

  const add = () => {
    const users = [
      ...sentInvitesForm.values.fields,
      {
        name: '',
        email_id: '',
      },
    ]
    sentInvitesForm.setFieldValue('fields', users)
  }

  const deleteInvite = (id) => {
    if (id === 0) return
    const newEmail = sentInvitesForm.values.fields.filter(
      (_, index) => index !== id
    )
    sentInvitesForm.setFieldValue('fields', newEmail)
  }

  return (
    <>
      <h2>Send Invites</h2>
      <p>
        Invite non-members to create an account. They will receive an email with
        a link to register.
      </p>

      <div className="row">
        {sentInvitesForm.values.fields.map((item, index) => {
          return (
            <div className="col-12 " key={index}>
              <div className="row">
                <div className="col-12 col-md-6 mt-4 mb-1">
                  <InputDashForm
                    label="Recipient Name"
                    name={`fields[${index}].name`}
                    type={'text'}
                    value={sentInvitesForm.values.fields[index].name}
                    onChange={sentInvitesForm.handleChange}
                    required={true}
                  />
                </div>
                <div className="col-12 col-md-6  pl-0  mt-4 mb-1 d-flex">
                  <InputDashForm
                    label="Recipient Email"
                    name={`fields[${index}].email_id`}
                    type={'email'}
                    value={sentInvitesForm.values.fields[index].email_id}
                    onChange={sentInvitesForm.handleChange}
                    required={true}
                  />
                  <div className="d-flex justify-content-center align-items-center">
                    {index !== 0 ?<span
                        className="pointer color-font p-0 ml-2"
                        onClick={() => deleteInvite(index)}
                    >
                      <FontAwesomeIcon
                          className="icon-setting"
                          icon={faTimesCircle}
                      />
                    </span> : null}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="col-12 d-flex justify-content-end">
          <span className="color-font pointer p-0" onClick={() => add()}>
            <FontAwesomeIcon className="icon-setting" icon={faPlus} />
          </span>
        </div>

        <div className="col-12  mt-4">
          <p>Customize the text of the invitation subject.</p>
          <InputDashForm
            label="Description"
            name="email_subject"
            type={'textarea'}
            value={sentInvitesForm.values.email_subject}
            onChange={sentInvitesForm.handleChange}
            required={true}
            error={sentInvitesForm.errors.email_subject}
            touched={sentInvitesForm.touched.email_subject}
          />
        </div>

        <div className="col-12  mt-4">
          <p>
            Customize the text of the invitation email. A link to register will
            be sent with the email.
          </p>
          <Editor
            className="editor-styles"
            onChange={(value) => sentInvitesForm.setFieldValue('email_content', value)}
            value={sentInvitesForm.values.email_content}
          />
          {sentInvitesForm.touched.email_content && sentInvitesForm.touched.email_content && (
            <div className="invalid-feedback d-block">
              {sentInvitesForm.errors.email_content}
            </div>
          )}
        </div>

        <div className="py-3 d-flex justify-content-center  mt-3 w-100">
          <button
            type="submit"
            onClick={() => handleSubmit('publish')}
            className="btn btn-create px-5"
          >
            Send Invites
          </button>
        </div>
      </div>
    </>
  )
}

 
