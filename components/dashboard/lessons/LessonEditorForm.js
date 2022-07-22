import React, { useState } from 'react'
import Editor from '@components/shared/editor/Editor'
import InputDashForm from '@components/shared/form/InputDashForm'
import Link from 'next/link'

function LessonEditorForm({ formulario }) {
  const [editor, setEditor] = useState('')

  return (
    <form className="row" onSubmit={formulario.handleSubmit}>
      <div className="col-12 col-md-9 mt-3 mt-md-0">
        <InputDashForm
          required={true}
          type="text"
          name="title"
          value={formulario.values.title}
          onChange={formulario.handleChange}
          label="Lesson Title"
          error={formulario.errors.title}
          touched={formulario.touched.title}
        />
      </div>
      <div className=" col-12 col-md-3 mt-3 mt-md-0">
        <Link href={'/dashboard/courses/edit-course/'}>
          <a className="btn btn-create px-4 py-3 w-100">Course Settings</a>
        </Link>
      </div>
      <div className="col-12 mt-3">
        <Editor
          value={editor}
          onChange={(value) => setEditor(value)}
          className="editor-styles w-100 full"
        />
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

export default LessonEditorForm
