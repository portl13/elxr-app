import React from 'react'
import dynamic from 'next/dynamic'
import InputDashForm from '@components/shared/form/InputDashForm'

const Builder = dynamic(import('./builder/Builder'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})


function LessonBuilderForm({ formulario }) {
  return (
    <div >
      <div className="row">
        <div className="col-12 col-md-9 mt-3 mt-md-0">
          <InputDashForm
            required={true}
            type="text"
            name="title"
            value={formulario.values.title}
            onChange={formulario.handleChange}
            label="Course Title"
            error={formulario.errors.title}
            touched={formulario.touched.title}
          />
        </div>
        <div className=" col-12 col-md-3 mt-md-0 d-flex">
          <button className="w-100 btn btn-create px-4 py-3">
            Course Settings
          </button>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-12">
          <Builder />
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          <div className="d-flex justify-content-end ">
            <div className="pr-3">
              <button className="btn btn-border-primary-2 px-4  py-3">
                Save as Draft
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-create py-3 px-5">
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonBuilderForm
