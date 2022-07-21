import InputDashForm from '@components/shared/form/InputDashForm'
import React from 'react'

function LessonBuilderForm({formulario}) {
  return (
    <form className="row" onSubmit={formulario.handleSubmit}>
      <div className="col-12 col-md-9 mt-3 mt-md-0 pl-0">
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
      <div className=" col-12 col-md-3 my-3 mt-md-0 ">
        <div className="d-flex justify-content-md-center ">
          <button  className="btn btn-create px-4 py-3">
            Course Settings
          </button>
        </div>
      </div>
        <span >
            3 steps in this Course
        </span>
      <div className="col-12 mt-2 mr-0 input-default px-3 px-md-5">
        

          <ul className="mt-3">
            <li>tate, eveniet
            consequuntur facer</li>
            <li>xercitationem at</li>
            <li>iatur, nemo, est tempora ip</li>
           
          </ul>
        </div>
      

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
    </form>
  )
}

export default LessonBuilderForm