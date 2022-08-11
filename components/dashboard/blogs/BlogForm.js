import Editor from '@components/shared/editor/Editor'
import InputDashTags from '@components/shared/form/InpushDashTags'
import InputDashForm from '@components/shared/form/InputDashForm'
import InputDashRadio from '@components/shared/form/InputDashRadio'
import React from 'react'

function BlogForm({
  formik,
  tags,
  setTags,
  category,
  setCategoryValue,
  categories,
  handleContent,
  handleSubmit,
  updated = false,
}) {
  return (
    <>
      <form className="row mt-4 pb-4" onSubmit={formik.handleSubmit}>
        <div className="col-12 mb-4">
          <InputDashForm
            required={true}
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            label="Course Title"
            error={formik.errors.title}
            touched={formik.touched.title}
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
            error={formik.errors.category}
            touched={formik.touched.category}
            options={categories}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
        <InputDashTags value={tags} setValue={setTags} />
        </div>
        <div className="col-12  mb-4">
          <Editor
            className="editor-styles w-100 full"
            value={formik.values.content}
            onChange={handleContent}
          />
          {formik.errors.content && formik.touched.content && (
            <div className="invalid-feedback d-block col font-size-18 mt-2">
              {formik.errors.content}
            </div>
          )}
        </div>
        <div className="col-12 mt-4">
          <h3>Blog Content</h3>
          <div className="d-flex mt-3">
            <InputDashRadio
              values={[
                {
                  value: 'open',
                  label: 'Open',
                },
                {
                  value: 'subscribers',
                  label: 'Subscribers',
                },
              ]}
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </form>
      <div className="col-12 my-4">
        <div className="d-flex justify-content-end">
          <div onClick={() => handleSubmit('draft')} className="mr-3">
            <button className="btn btn-border-primary-2 py-3">
              Save as Draft
            </button>
          </div>
          <div className="mr-3">
            <button
              onClick={() => handleSubmit('publish')}
              type="submit"
              className="btn btn-create py-3"
            >
              {updated ? 'Updated' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogForm
