import React from 'react'
import CreateCommunityLayout from '@components/dashboard/community/CreateCommunityLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const baseUrl= process.env.bossApi

function BasicDetailsPage() {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      types: ''
    },
    onSubmit: (values) => console.log(values),
    validationSchema: Yup.object({
      nombre: Yup.string().required('Nombre es requerido'),
    }),
  })

  return (
    <CreateCommunityLayout>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-4 pl-0">
            <ul className="pl-0">
              <li className="list-unstyled position-relative decoration">
                <i className="mr-2">
                  {' '}
                  <FontAwesomeIcon
                    className="icon-setting text-primary"
                    icon={faCircle}
                  />{' '}
                </i>
                <span className="font-weight-bold">Basic Details</span>
              </li>
              <li className="list-unstyled position-relative decoration mt-5">
                <i className="mr-2">
                  {' '}
                  <FontAwesomeIcon
                    className="icon-setting"
                    icon={faCircle}
                  />{' '}
                </i>
                <span>Privacy Settings</span>
              </li>
              <li className="list-unstyled position-relative decoration mt-5">
                <i className="mr-2">
                  {' '}
                  <FontAwesomeIcon
                    className="icon-setting"
                    icon={faCircle}
                  />{' '}
                </i>
                <span>Invite</span>
              </li>
              <li className="list-unstyled  mt-5">
                <i className="mr-2">
                  {' '}
                  <FontAwesomeIcon
                    className="icon-setting"
                    icon={faCircle}
                  />{' '}
                </i>
                <span>Meet</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-8">
            <form onSubmit={formik.handleSubmit}>
              
            </form>
          </div>
        </div>
      </div>
    </CreateCommunityLayout>
  )
}

export default BasicDetailsPage
