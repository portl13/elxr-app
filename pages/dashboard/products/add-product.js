import React, { useContext, useState, useEffect, useRef } from 'react'
import Meta from '@components/layout/Meta'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UserContext } from '@context/UserContext'
import useSWRImmutable from 'swr/immutable'
import {
  createProduct,
  getProductCategories,
  getProductTags,
} from '@request/dashboard'
import Select from 'react-select'
import useProductMedia from '@hooks/product/useProductMedia'
import Loader from '@pages/profile/loader'
import { useRouter } from 'next/router'
import { TIMEOUT } from '@utils/constant'
import { useAlert } from 'react-alert'
import InputDashForm from '@components/shared/form/InputDashForm'
import InputDashCurrency from '@components/shared/form/InputDashCurrency'
import Editor from '@components/shared/editor/Editor'
import ProductDownloadableFile from '@components/dashboard/product/ProductDownloadableFile'
import { v4 as uuidv5 } from 'uuid'
import md5 from 'md5'
import { uploadGeneralDownloable } from '@request/shared'
import BlockUi from '@components/ui/blockui/BlockUi'

const productUrl = process.env.apiURl + '/product'

function AddNewProduct() {
  const { user } = useContext(UserContext)
  const inputFile = useRef(null)
  const router = useRouter()
  const alert = useAlert()
  const [isSaving, setIsSaving] = useState(false)
  const [loadingFile, setLoadingFile] = useState(false)
  const [category, setCategory] = useState('')
  const [downloadableFiel, setDownloadableFiel] = useState([])
  const [tag, setTag] = useState('')
  const [productImage, setProductImage] = useState(null)
  const { token = null } = user?.token ? user : {}

  const { data: categoriesData } = useSWRImmutable(
    token ? [`/api/woocommerce/categories`, token] : null,
    getProductCategories
  )

  const { data: tagsData } = useSWRImmutable(
    token ? [`/api/woocommerce/tags`, token] : null,
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
      downloadable_files: [],
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

  const removeDownloadableFile = (id) => {
    setDownloadableFiel(downloadableFiel.filter((item, i) => item.id !== id))
  }

  const uploadFileDownloadable = async (file) => {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('name', md5(uuidv5()))

    const data = await uploadGeneralDownloable(token, formData)
    return data
  }

  const onHandleChangeDownloadableFile = (e, file) => {
    const data = downloadableFiel.map((item) => {
      if (item.id === file.id) {
        return { ...item, [e.target.name]: e.target.value }
      }
      return item
    })

    setDownloadableFiel(data)
    addProductForm.setFieldValue('downloadable_files', data)
  }

  const handleUploadFile = async (e) => {
    try {
      setLoadingFile(true)
      let fileUpload = ''
      if (e.target.files.length >= 1) {
        fileUpload = await uploadFileDownloadable(e.target.files[0])
      }
      const data = [...downloadableFiel, fileUpload]
      setDownloadableFiel(data)
      addProductForm.setFieldValue('downloadable_files', data)
    } catch (error) {
      alert.error(error.message, TIMEOUT)
    } finally {
      setLoadingFile(false)
    }
  }

  return (
    <>
      <Meta />
      <Head>
        <title>ADD NEW PRODUCT</title>
      </Head>
      <div className="modal-full-scream position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
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

                  <form className="row" onSubmit={addProductForm.handleSubmit}>
                    <div className="col-12 mt-5 mb-3">
                      <InputDashForm
                        label="Product Title"
                        name="name"
                        value={addProductForm.values.name}
                        onChange={addProductForm.handleChange}
                        error={addProductForm.errors.name}
                        touched={addProductForm.touched.name}
                        type="text"
                        required={true}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <InputDashCurrency
                        label="Price ($)"
                        name="regular_price"
                        value={addProductForm.values.regular_price}
                        onChange={setPrice}
                        error={addProductForm.errors.regular_price}
                        touched={addProductForm.touched.regular_price}
                        required={true}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <InputDashCurrency
                        label="Sales Price ($)"
                        name="sale_price"
                        value={addProductForm.values.sale_price}
                        onChange={setPrice}
                        error={addProductForm.errors.sale_price}
                        touched={addProductForm.touched.sale_price}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-4">
                      <InputDashForm
                        label={'Category'}
                        type="select"
                        name="categories"
                        value={category}
                        onChange={handlerChangeCategory}
                        error={addProductForm.errors.categories}
                        touched={addProductForm.touched.categories}
                        options={categoriesData?.map((category) => ({
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
                        value={tag}
                        onChange={handlerChangeTag}
                        error={addProductForm.errors.tags}
                        touched={addProductForm.touched.tags}
                        options={tagsData?.map((category) => ({
                          value: category.slug,
                          label: category.name,
                        }))}
                      />
                    </div>
                    <div className="col-12">
                      <Editor
                        className="editor-styles"
                        onChange={(value) =>
                          addProductForm.setFieldValue('description', value)
                        }
                        value={addProductForm.values.description}
                      />
                      {addProductForm.touched.description &&
                        addProductForm.errors.description && (
                          <div className="invalid-feedback d-block">
                            {addProductForm.errors.description}
                          </div>
                        )}
                    </div>
                  </form>

                  <div className="my-4">
                    <h4>Downloadable files</h4>
                  </div>
                  <div>
                    {downloadableFiel.map((file) => (
                      <ProductDownloadableFile
                        key={file.id}
                        file={file}
                        remove={removeDownloadableFile}
                        onChange={onHandleChangeDownloadableFile}
                      />
                    ))}
                  </div>
                  <input
                    onChange={handleUploadFile}
                    ref={inputFile}
                    type="file"
                    name="file"
                    className="d-none"
                  />
                  <div className="mt-1 d-flex justify-content-start">
                    <button
                      onClick={() => inputFile.current.click()}
                      className="btn btn-create px-3 mr-2"
                    >
                      {!loadingFile ? (
                        'Add File'
                      ) : (
                        <div>
                          uploading files
                          <span
                            style={{
                              width: '15px',
                              height: '15px',
                            }}
                            className="ml-2 spinner-border text-light"
                          ></span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
                    <div>
                      <button
                        onClick={saveDraft}
                        className="btn btn-create  px-3 mr-2"
                      >
                        Save as Draft
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={saveProduct}
                        className="btn btn-create px-5"
                      >
                        Publish
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
