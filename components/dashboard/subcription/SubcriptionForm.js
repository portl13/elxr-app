import React from 'react'
import Editor from '@components/shared/editor/Editor'
import InputDashForm from '@components/shared/form/InputDashForm'
import InputDashCurrency from '@components/shared/form/InputDashCurrency'

function SubcriptionForm({
  form,
  tag,
  tags,
  category,
  categories,
  handlerChangeCategory,
  handlerChangeTag,
  setPrice
}) {
  return (
    <form className="row" onSubmit={form.handleSubmit}>
      <div className="col-12 mt-5 mb-4">
        <InputDashForm
          label="Product Title"
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.errors.name}
          touched={form.touched.name}
          type="text"
          required={true}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <InputDashCurrency
          label="Monthly Price ($)"
          name="sale_price"
          value={form.values.sale_price}
          onChange={setPrice}
          error={form.errors.sale_price}
          touched={form.touched.sale_price}
          required={true}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <InputDashCurrency
          label="Annual Price ($)"
          name="subscription_price"
          value={form.values.subscription_price}
          onChange={setPrice}
          error={form.errors.subscription_price}
          touched={form.touched.subscription_price}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <InputDashForm
          label={'Category'}
          type="select"
          name="categories"
          onChange={handlerChangeCategory}
          error={form.errors.categories}
          touched={form.touched.categories}
          value={category}
          options={categories?.map((category) => ({
            value: category.id,
            label: category.name,
          }))}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <InputDashForm
          label={'Tags'}
          type="select"
          name="tags"
          onChange={handlerChangeTag}
          error={form.errors.tags}
          touched={form.touched.tags}
          value={tag}
          options={tags?.map((category) => ({
            id: category.id,
            value: category.slug,
            label: category.name,
          }))}
        />
      </div>
      <div className="col-12">
        <Editor
          className="editor-styles"
          onChange={(value) => form.setFieldValue('description', value)}
          value={form.values.description}
        />
        {form.touched.description && form.errors.description && (
          <div className="invalid-feedback d-block">
            {form.errors.description}
          </div>
        )}
        <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
          <button type="submit" className="btn btn-create px-5">
            Update
          </button>
        </div>
      </div>
    </form>
  )
}

export default SubcriptionForm
