import React, { useContext, useState, useEffect } from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faArrowUp,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserContext } from '@context/UserContext'
import useSWRImmutable from 'swr/immutable'
import { createProduct, getProductCategories, getProductTags } from '@request/dashboard'
import Select from 'react-select'
import useProductMedia from '@hooks/product/useProductMedia'
import Loader from '@pages/profile/loader'
import CurrencyInput from 'react-currency-input-field'
import { useRouter } from 'next/router'
import { TIMEOUT } from '@utils/constant'
import { useAlert } from 'react-alert'

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white !important',
    fontColor: 'white',
    padding: 0,
    borderColor: state.isFocused ? 'white' : '',
    boxShadow: 'none',
    '&:hover': {
      borderColor: state.isFocused ? 'white' : '',
    },
  }),
  input: (base) => ({
    ...base,
    padding: 0,
    color: '#fff',
  }),
  singleValue: (provided, state) => {
    const color = '#fff'
    const transition = 'opacity 300ms'
    const padding = 0

    return { ...provided, color, transition, padding }
  },
  menu: (base) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white',
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: 'black',
    border: 'none',
    color: 'white',
    padding: 0,
  }),
  option: (base, state) => ({
    ...base,
    background: state.isSelected ? 'var(--primary-color)' : 'var(--bg)',
    '&:hover': {
      background: 'grey',
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: 'none',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    marginTop: -25,
    marginRight: -25,
  }),
}

const wooUrl = process.env.woocomApi
const productUrl = process.env.apiURl + '/product'

function AddNewProduct() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const alert = useAlert()
  const [isSaving, setIsSaving] = useState(false)
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [productImage, setProductImage] = useState(null)
  const { token = null } = user?.token ? user : {}

  const { data: categoriesData } = useSWRImmutable(
    token ? [`${wooUrl}/products/categories`, token] : null,
    getProductCategories
  )

  const { data: tagsData } = useSWRImmutable(
    token ? [`${wooUrl}/products/tags`, token] : null,
    getProductTags
  )

  const addProductForm = useFormik({
    initialValues: {
      name: '',
      description: '',
      regular_price: '',
      sale_price: '',
      categories: [],
      tags: [],
      virtual: true,
      downloadable: true,
      featured_image: '',
      status: '',
    },
    onSubmit: (values) => createProductSubmit(values),
    validationSchema: Yup.object({
      name: Yup.string().required('Product Title is Required'),
      regular_price: Yup.string().required('Price is Required'),
      description: Yup.string().required('Description is Required'),
      categories: Yup.array().required('Category is Required'),
      tags: Yup.array().required('Tags is Required'),
    }),
  })

  const createProductSubmit = async (values) => {
    setIsSaving(true)
    try {
      await createProduct(productUrl, token, values)
      setIsSaving(false)
      router.push('/dashboard/products')
    } catch (error) {
      setIsSaving(false)
      alert.error(error.message, TIMEOUT)
    }
  }

  const [reset, handleUpload, loading] = useProductMedia(user, setProductImage)

  const handlerChangeCategory = (value) => {
    setCategory(value)
    addProductForm.setFieldValue('categories', [String(value.value)])
  }
  const handlerChangeTag = (value) => {
    setTag(value)
    addProductForm.setFieldValue('tags', [String(value.value)])
  }

  useEffect(() => {
    if (productImage) {
      addProductForm.setFieldValue('featured_image', { id: productImage.id })
    }
  }, [productImage])

  const setPrice = (value, field) => {
    if (!value) return
    addProductForm.setFieldValue(field, value)
  }

  const saveDraft = () => {
    addProductForm.setFieldValue('status', 'draft')
    addProductForm.submitForm()
  }

  const saveProduct = () => {
    addProductForm.submitForm()
  }

  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW PRODUCT</title>
      </Head>
      <div className="modal-full-scream">
        <div className="container px-3 px-md-5 pt-5">
          <div className="d-flex align-items-center">
            <Link href={'/dashboard/products'}>
              <a className="text-white">
                <span className="contain-icon">
                  <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
                </span>
                <span className="back">Back</span>
              </a>
            </Link>
          </div>
          <div className="container container-80">
            <div className="row">
              <div className="col-12">
                <div className="contain-title">
                  <h1 className="create-communities-title">ADD NEW PRODUCT</h1>
                </div>
                <div>
                  <div className="upload-image w-100 w-md-50 border-moteado d-flex justify-content-center align-items-center mb-3">
                    {!productImage && (
                      <div className="upload-image position-relative d-flex justify-content-center align-items-center pointer">
                        {!loading ? (
                          <>
                            <input
                              onChange={handleUpload}
                              accept="image/*"
                              type="file"
                              name="featured_image"
                              className="upload-input-hidden pointer"
                            />
                            <div className="upload-image-info text-center pb-5 pb-md-0">
                              <span className="upload-contain-icon ">
                                <FontAwesomeIcon
                                  className="upload-image-icon"
                                  icon={faPlus}
                                />
                              </span>
                              <p className="upload-cover-info">
                                Upload Product Image
                              </p>
                              <span className="upload-info">
                                10 mb max, png or jpeg
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="loading-upload">
                            <Loader color="primary" />
                          </div>
                        )}
                      </div>
                    )}

                    {productImage && (
                      <div
                        style={{
                          backgroundImage: `url(${productImage.url})`,
                        }}
                        className="upload-image  position-relative  d-flex justify-content-center align-items-center solid"
                      >
                        <button
                          onClick={reset}
                          className="btn btn-clean-media banner"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    )}
                  </div>

                  <form onSubmit={addProductForm.handleSubmit}>
                    <div className="mt-5 mb-3">
                      <div className="input-search mr-0 border-radius-35 pb-0">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="name "
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Product Title
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.name}
                            </span>
                          </div>
                          <input
                            className="bg-transparent border-0 text-white w-100 mr-0"
                            name="name"
                            type="text"
                            value={addProductForm.values.name}
                            onChange={addProductForm.handleChange}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                      <div className="input-search border-radius-35 w-100 w-md-50 pb-0  mb-3">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="number"
                        >
                          {' '}
                          <div className="d-flex justify-content-between">
                            <span>
                              Price($)
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.regular_price}
                            </span>
                          </div>
                          <CurrencyInput
                            prefix="$"
                            className="bg-transparent py-0 text-white border-0 w-100"
                            decimalsLimit={2}
                            name="regular_price"
                            value={addProductForm.values.regular_price}
                            onValueChange={setPrice}
                          />
                        </label>
                      </div>
                      <div className="input-search mr-0  border-radius-35 w-100 w-md-50 pb-0 mb-3">
                        <label
                          className="w-100 mb-0 upload-info"
                          htmlFor="number"
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Sale Price($)
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.sale_price}
                            </span>
                          </div>
                          <CurrencyInput
                            prefix="$"
                            className="bg-transparent py-0 text-white border-0 w-100"
                            decimalsLimit={2}
                            name="sale_price"
                            value={addProductForm.values.sale_price}
                            onValueChange={setPrice}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-column flex-md-row justify-content-between">
                      <div className="input-search  pb-0 border-radius-35 w-100  mb-3">
                        <label
                          className="w-100 mb-0 py-0  upload-info"
                          htmlFor="typo"
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Category
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.categories}
                            </span>
                          </div>
                          <Select
                            onChange={handlerChangeCategory}
                            styles={customStyles}
                            options={categoriesData?.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))}
                            value={category}
                            className="bg-transparent border-0 text-white w-100 mr-0"
                          />
                        </label>
                      </div>
                      <div className="input-search mr-0 pb-0 border-radius-35 w-100  mb-3">
                        <label
                          className="w-100 mb-0 py-0 upload-info"
                          htmlFor="typo"
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Tags
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.tags}
                            </span>
                          </div>
                          <Select
                            onChange={handlerChangeTag}
                            styles={customStyles}
                            options={tagsData?.map((category) => ({
                              value: category.id,
                              label: category.name,
                            }))}
                            value={tag}
                            className="bg-transparent border-0 text-white w-100 mr-0"
                          />
                        </label>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="input-search border-radius-35 pb-0 mr-0">
                        <label
                          className="w-100 mb-0 upload-info "
                          htmlFor="description"
                        >
                          <div className="d-flex justify-content-between">
                            <span>
                              Description
                              <span className="text-red">*</span>
                            </span>
                            <span className="invalid-feedback d-inline-block w-auto m-0">
                              {addProductForm.errors.description}
                            </span>
                          </div>
                          <textarea
                            className="bg-transparent border-0 text-white w-100 mr-0"
                            name="description"
                            cols="30"
                            rows="5"
                            value={addProductForm.values.description}
                            onChange={addProductForm.handleChange}
                          />
                        </label>
                      </div>
                    </div>
                  </form>
                  <div className="mt-3 mb-3">
                    <h4>File Details</h4>
                  </div>
                  <div className="mt-1 ">
                    <div className="input-search border-radius-35 pb-0 mr-0">
                      <label
                        className="w-100 mb-0 upload-info "
                        htmlFor="description "
                      >
                        File Name<span className="text-red">*</span>
                        <input
                          className="bg-transparent border-0 text-white w-100 mr-0"
                          name="description"
                        />
                      </label>
                    </div>
                    <div className="file-size  position-relative w-md-50">
                      <div className="input-search  w-100 mt-3 mr-0 border-radius-35 ">
                        <label className="w-100  upload-info" htmlFor="number">
                          <input
                            className="bg-transparent py-0 text-white border-0 w-100"
                            type="name"
                            placeholder="File size max 10 mb"
                          />
                        </label>
                      </div>
                      <div className="btn-contain">
                        <span className="contain-upload-icon">
                          <FontAwesomeIcon
                            className="btn-upload-icon"
                            icon={faArrowUp}
                          />
                        </span>
                        <button className="btn btn-create">Upload</button>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
                    <div>
                      <button
                        onClick={saveDraft}
                        className="btn btn-create btn-black px-3 mr-2"
                      >
                        {isSaving ? 'Saving' : 'Save as Draft'}
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={saveProduct}
                        className="btn btn-create px-5"
                      >
                        {isSaving ? 'Saving' : 'Publish'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddNewProduct
