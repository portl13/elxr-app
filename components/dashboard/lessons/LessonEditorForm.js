import React, { useEffect, useState } from 'react'
import Editor from '@components/shared/editor/Editor'
import InputDashForm from '@components/shared/form/InputDashForm'
import EditorDraft from '@components/shared/editor/editor-draft/EditorDraft'
import { EditorState } from 'draft-js'
import Link from 'next/link'

function LessonEditorForm({
  formik,
  viewPreview,
  lesson,
  loading,
  isPreviewLoading,
}) {
  const [content, setContent] = useState('')
  const [editor, setEditor] = useState(() => {
    EditorState.createEmpty()
  })

  useEffect(() => {
    formik.setFieldValue('content', content)
  }, [content])

  return (
    <form className="row" onSubmit={formik.handleSubmit}>
      <div className="col-12 col-md-9 mt-3 mt-md-0">
        <InputDashForm
          required={true}
          type="text"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          label="Lesson Title"
          error={formik.errors.title}
          touched={formik.touched.title}
        />
      </div>
      <div className=" col-12 col-md-3 mt-3 mt-md-0">
        <button
          onClick={viewPreview}
          className="btn btn-create px-4 py-3 w-100"
        >
          Preview
          {isPreviewLoading && (
            <span className="spinner-border spinner-border-sm ml-2" />
          )}
        </button>
      </div>
      <div className="col-12 mt-3">
        <EditorDraft
          editorState={editor}
          setEditorState={setEditor}
          editorVal={lesson?.content.rendered || '<p></p>'}
          setContentHtml={setContent}
        />
      </div>
      <div className="col-12 mt-4">
        <div className="d-flex justify-content-end ">
          <div className="pr-3">
            {/* <button className="btn btn-border-primary-2 px-4  py-3">
              Save as Draft
            </button> */}
          </div>
          <div>
            <button type="submit" className="btn btn-create py-3 px-5">
              {loading ? 'Saving lesson' : 'Update Lesson'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default LessonEditorForm
