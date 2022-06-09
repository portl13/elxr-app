import React, { useState, useEffect } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { Button, Alert, Spinner, Input } from 'reactstrap'
import Link from 'next/link'
import { removeSpecailChar } from '@utils/constant'
import { updateProduct } from '@api/channel.api'
import {
  getProdCategories,
  getProdTags,
} from '@api/channel-store.api'
import UploadDownloadable from './UploadDownloadable'
import TextEditor from './TextEditor'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import UploadImage from './UploadImage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons'
import { wcfmAddPanel } from '@components/my-account/wcfmAddPanel.style'
const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#1b1b1b !important',
    color: 'white !important',
    border: '1px solid white',
    fontColor: 'white !important',
    boxShadow: 'none',
    borderColor: state.isFocused ? 'white' : '',
    '&:hover': {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? 'white' : '',
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),
  input: (base) => ({
    ...base,
    color: 'white !important',
  }),
  menu: (base) => ({
    ...base,
    background: 'black !important',
    border: 'none',
    color: 'white !important',
    // override border radius to match the box
    borderRadius: 0,
    // kill the gap
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    background: 'black !important',
    border: 'none',
    color: 'white !important',
    // kill the white space on first and last option
    padding: 0,
  }),
  option: (base) => ({
    ...base,
    background: 'black !important',
    color: 'white !important',
    '&:hover': {
      // Overwrittes the different states of border
      background: 'grey !important',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'white !important',
  }),
}
function EditProductUi({
  handleRedirect,
  product,
  user,
  hideProduct,
  setHide,
}) {

  const [editorLong, setEditorLong] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(product.description))
    )
  )

  const [editorShort, setEditorShort] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(product.short_description)
      )
    )
  )

  const [productTitle, setProductTitle] = useState(product.name)
  const [fileTypeName, setFileTypename] = useState()
  const [view, setView] = useState(null)
  const [success, setSuccess] = useState(false)
  const [spin, setSpin] = useState(false)
  const [successPublish, setSuccessPublish] = useState(false)
  const [spinPublish, setSpinPublish] = useState(false)
  const [categoriesList, setCategoriesList] = useState([])
  const [price, setPrice] = useState(product.regular_price)
  const [updateDetail, setUpdateDetail] = useState(false)

  const [categories, setSelCategory] = useState(
    product.categories.map((item) => {
      return {
        value: item.id,
        label: item.name,
      }
    })
  )

  const [tags, setTags] = useState([])

  const [short_description, setShortDescription] = useState('')

  const [description, setLongDescription] = useState('')

  const [download_limit, setDownloadLimit] = useState(product.download_limit)
  
  const [fileName, setFileName] = useState()
  const [index, setIndex] = useState()
  const [download_expiry, setDownloadExpiry] = useState(product.download_expiry)
  const [sale_price, setSalePrice] = useState(product.sale_price)
  const [subPrice, setSubscribePrice] = useState()
  const [uploadImage, setUploadImage] = useState(false)
  const [imageSpinner, setImageSpinner] = useState(false)
  const [image, setImage] = useState(product.images.map((d) => d.src)[0])
  const [subPeriod, setSubPeriod] = useState('day')
  const [subPeriodInterval, setSubPeriodInterval] = useState(1)
  const [suSignUpFee, setSubscribeFee] = useState()
  const [subTrialPeriod, setSubscribeTrail] = useState('day')
  const [subTrialLength, setSubscribeTrailLen] = useState(0)
  const [tagLength, setTagLength] = useState(0)
  const [subLength, setSubscribeLen] = useState()
  const [showDownload, setShowDownload] = useState(false)
  const [downloadList, setDownloadList] = useState(
    product.downloads ? [...product.downloads] : []
  )
  const [tagSelected, setTagSelected] = useState(
    product.tags.map((d) => {
      return {
        value: d.id,
        label: d.name,
      }
    })
  )

  const [msg, setMsg] = useState(false)
  const getProdDetails = () => {
    getProdCategories(user)
      .then((res) => {
        setCategoriesList(res.data)
      })
      .catch(() => {})
  }

  const getInputTags = () => {
    if (!tags.length)
      getProdTags(user)
        .then((res) => {
          setTags(res.data)
          setTagLength(res.data.length)
        })
        .catch(() => {})
  }

  useEffect(() => {
    if (user?.id) getProdDetails()
  }, [user])

  useEffect(() => {
    let obj = product.meta_data.find((o) => o.key === '_wcfm_product_views')
    if (obj !== undefined) {
      setView(obj.value)
    } else {
      setView('0')
    }
  }, [product.id])

  function updateView() {
    const formData = {
      meta_data: [
        {
          key: '_wcfm_product_views',
          value: parseInt(view) + 1,
        },
      ],
    }
    updateProduct(user, formData, product.id)
      .then((res) => {})
      .catch(() => console.log('error'))
  }

  function updateFormData(data, value, key) {
    return (data.meta_data = [...data.meta_data, { key, value }])
  }

  function handleSubmit(value) {
    value === 'draft' && setSpin(true)
    value === 'publish' && setSpinPublish(true)
    const formData = {
      name: productTitle,
      type: product.type,
      status: value,
      price: price,
      description: description,
      short_description: short_description,
      // download_limit: parseInt(download_limit),
      // download_expiry: parseInt(download_expiry),

      download_limit: download_limit ? parseInt(download_limit) : -1,
      download_expiry: download_expiry ? parseInt(download_expiry) : -1,
      downloadable: product.downloadable,
      downloads: fileTypeName?.map((e) => {
        return e
      }),

      images: [
        {
          src: image,
        },
      ],

      sale_price: sale_price,
      categories: categories.map((e) => {
        return { id: e.value }
      }),
      meta_data: [],
      regular_price: price,
    }
    formData['tags'] = tagSelected.map((e) => {
      let obj = {
        name: e.label,
        slug: e.label,
      }
      if (typeof e.value === 'number') obj['id'] = e.value
      return obj
    })
    if (subPeriod) updateFormData(formData, subPeriod, '_subscription_period')
    if (subLength) updateFormData(formData, subLength, '_subscription_length')
    if (subPeriodInterval)
      updateFormData(
        formData,
        subPeriodInterval,
        '_subscription_period_interval'
      )
    if (suSignUpFee)
      updateFormData(formData, suSignUpFee, '_subscription_sign_up_fee')

    if (subTrialPeriod)
      updateFormData(formData, subTrialPeriod, '_subscription_trial_period')
    if (subTrialLength)
      updateFormData(formData, subTrialLength, '_subscription_trial_length')
    if (subPrice) updateFormData(formData, subPrice, '_subscription_price')
    if (product.type === 'subscription') {
      formData['regular_price'] = subPrice
    }

    updateProduct(user, formData, product.id)
      .then((res) => {
        value === 'draft' && emptyDraft()
        value === 'publish' && emptyPublish()
      })
      .catch(() => console.log('error'))
  }

  function emptyDraft() {
    setSpin(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), [1500])
  }

  function emptyPublish() {
    setSpinPublish(false)
    setSuccessPublish(true)
    setTimeout(() => setSuccessPublish(false), [1500])
  }

  function priceValue(e) {
    const exp = /^\d*\.?\d{0,2}$/
    if (e.target.value === '' || exp.test(e.target.value)) {
      setPrice(e.target.value)
    }
  }

  function salePrice(e) {
    const exp = /^\d*\.?\d{0,2}$/
    if (e.target.value === '' || exp.test(e.target.value)) {
      setSalePrice(e.target.value)
    }
  }

  function signUp(e) {
    const exp = /^\d*\.?\d{0,2}$/
    if (e.target.value === '' || exp.test(e.target.value)) {
      setSubscribeFee(e.target.value)
    }
  }

  function subFee(e) {
    const exp = /^\d*\.?\d{0,2}$/
    if (e.target.value === '' || exp.test(e.target.value)) {
      setSubscribePrice(e.target.value)
    }
  }

  function freeTrail(e) {
    const exp = /^[0-9]*$/
    if (e.target.value === '' || exp.test(e.target.value)) {
      setSubscribeTrailLen(e.target.value)
    }
  }

  useEffect(() => {
    setShortDescription(product.short_description)
    setLongDescription(product.description)
    let obj = product.meta_data.find(
      (o) => o.key === '_subscription_sign_up_fee'
    )
    if (obj !== undefined) {
      setSubscribeFee(obj.value)
    } else {
      setSubscribeFee()
    }
    let trail = product.meta_data.find(
      (o) => o.key === '_subscription_trial_length'
    )
    if (trail !== undefined) {
      setSubscribeTrailLen(trail.value)
    } else {
      setSubscribeTrailLen(0)
    }
    let trailLength = product.meta_data.find(
      (o) => o.key === '_subscription_trial_period'
    )
    if (trailLength !== undefined) {
      setSubscribeTrail(trailLength.value)
    } else {
      setSubscribeTrail('day')
    }
    let suPrice = product.meta_data.find((o) => o.key === '_subscription_price')
    if (suPrice !== undefined) {
      setSubscribePrice(suPrice.value)
    } else {
      setSubscribePrice()
    }
    let subPer = product.meta_data.find((o) => o.key === '_subscription_period')
    if (subPer !== undefined) {
      setSubPeriod(subPer.value)
    } else {
      setSubPeriod('day')
    }
    let subPerInter = product.meta_data.find(
      (o) => o.key === '_subscription_period_interval'
    )
    if (subPerInter !== undefined) {
      setSubPeriodInterval(subPerInter.value)
    } else {
      setSubPeriodInterval(1)
    }
    let sublen = product.meta_data.find((o) => o.key === '_subscription_length')
    if (sublen !== undefined) {
      setSubscribeLen(sublen.value)
    } else {
      setSubscribeLen()
    }
  }, [product.id])

  const getText = (e, value) => {
    let text = value + 's'
    if (e === 0) text = 'Never expires'
    if (e === 1) text = value
    return text
  }

  useEffect(() => setTimeout(() => setImageSpinner(false), [2500]), [image])

  const handleInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...downloadList]
    list[index][name] = value
    setFileTypename(list)
  }
  // handle click event of the Add button
  const handleAddClick = () => {
    setDownloadList([...downloadList, { name: '', file: '' }])
  }
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...downloadList]
    list.splice(index, 1)
    setDownloadList(list)
    const dataList = [...downloadList]
    dataList.splice(index, 1)
    setFileTypename(dataList)
  }

  function mergeData() {
    setDownloadList(downloadList)
  }

  function getImageUrl(childData) {
    var data = downloadList.map((d) => d)[index]
    data.file = childData
  }
  
  return (
    <section css={wcfmAddPanel}>
      <div className="wcfm-tabWrap mtop30">
        <div className="wcfm_add_panel">
          <div className="wcfm_general_fields">
            <div className="wcfm-col-12">
              <input
                type="text"
                placeholder="Product Title"
                value={productTitle}
                onChange={(e) => {
                  setProductTitle(e.target.value)
                  setMsg(false)
                }}
                maxLength="100"
              />
            </div>
            {product.type === 'simple' && (
              <div className="wcfm-col-12">
                <div className="wcfm-col-6">
                  <div className="text-tag">Price($)</div>
                  <div className="input-tag">
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => priceValue(e)}
                      maxLength="10"
                    />
                  </div>
                </div>
                <div className="wcfm-col-6">
                  <div className="text-tag">Sale Price($)</div>
                  <div className="input-tag">
                    <input
                      type="text"
                      value={sale_price}
                      onChange={(e) => salePrice(e)}
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
            )}
            {product.type === 'subscription' && (
              <>
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">For Subscribers Only</div>
                    <div className="checkbox-wrapper">
                      <div className="custom-checkbox checkbox-panel">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <label className="custom-control-label"></label>
                        <em>All</em>
                      </div>
                      <div className="custom-checkbox checkbox-panel">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <label className="custom-control-label"></label>
                        <em>Live Stream</em>
                      </div>
                      <div className="custom-checkbox checkbox-panel">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <label className="custom-control-label"></label>
                        <em>Chat</em>
                      </div>
                      <div className="custom-checkbox checkbox-panel">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <label className="custom-control-label"></label>
                        <em>Social Feed</em>
                      </div>
                      <div className="custom-checkbox checkbox-panel">
                        <input
                          className="custom-control-input"
                          type="checkbox"
                        />
                        <label className="custom-control-label"></label>
                        <em>Archives</em>
                      </div>
                    </div>
                  </div>
                </div> 
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">Sign-up fee ($)</div>
                    <div className="input-tag">
                      <input
                        type="text"
                        value={suSignUpFee}
                        onChange={(e) => signUp(e)}
                        maxLength="10"
                      />
                    </div>
                  </div>
                </div>
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">Free Trial</div>
                    <div className="input-tag input-row">
                      <span className='input-box'>
                        <input
                          type="text"
                          value={subTrialLength}
                          onChange={(e) => freeTrail(e)}
                          maxLength="2"
                        />
                      </span>
                      <div className="select-box">
                        <Input
                          type="select"
                          value={subTrialPeriod}
                          onChange={(e) => setSubscribeTrail(e.target.value)}
                        >
                          <option value="day">day</option>
                          <option value="week">week</option>
                          <option value="month">month</option>
                          <option value="year">year</option>
                        </Input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">Subscription price ($)</div>
                    <div className="input-tag input-row">
                      <div className="input-box">
                        <input
                          type="text"
                          value={subPrice}
                          onChange={(e) => subFee(e)}
                          maxLength="10"
                        />
                      </div>
                      <div className="select-box">
                        <Input
                          type="select"
                          value={subPeriodInterval}
                          onChange={(e) => setSubPeriodInterval(e.target.value)}
                        >
                          <option value="1">every</option>
                          <option value="2">every 2nd</option>
                          <option value="3">every 3rd</option>
                          <option value="4">every 4th</option>
                          <option value="5">every 5th</option>
                          <option value="6">every 6th</option>
                        </Input>
                      </div>
                      <div className="select-box">
                        <Input
                          type="select"
                          value={subPeriod}
                          onChange={(e) => {
                            setSubPeriod(e.target.value)
                            setSubscribeLen(0)
                          }}
                        >
                          <option value="day">day</option>
                          <option value="week">week</option>
                          <option value="month">month</option>
                          <option value="year">year</option>
                        </Input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">Expire after</div>
                    <div className="input-tag">
                      <select
                        defaultValue={subLength}
                        value={subLength}
                        onChange={(e) => setSubscribeLen(e.target.value)}
                      >
                        {[
                          ...Array(
                            subPeriod === 'day'
                              ? 91
                              : subPeriod === 'week'
                              ? 53
                              : subPeriod === 'month'
                              ? 25
                              : 6
                          ).keys(),
                        ].map((e) => (
                          <option key={e} value={e}>{`${e !== 0 ? e : ''} ${getText(
                            e,
                            subPeriod
                          )}`}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="wcfm-col-12">
                  <div className="wcfm-col-full">
                    <div className="text-tag">Sale Price($)</div>
                    <div className="input-tag">
                      <input
                        type="text"
                        value={sale_price}
                        onChange={(e) => salePrice(e)}
                        maxLength="10"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="wcfm-col-12">
              <div className="wcfm-col-full">
                <div className="text-tag">Categories</div>
                <div className="input-tag">
                  <Select
                    isMulti
                    styles={customStyles}
                    onChange={setSelCategory}
                    options={categoriesList.map((e) => {
                      return { value: e.id, label: e.name }
                    })}
                    placeholder="Select Categories"
                    defaultValue={() => {
                      if (categories.find((d) => d.label !== 'Uncategorized')) {
                        return categories
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="wcfm-col-12">
              <div className="wcfm-col-full">
                <div className="text-tag">Tags</div>
                <div className="input-tag">
                  <CreatableSelect
                    isMulti
                    styles={customStyles}
                    onChange={setTagSelected}
                    options={tags.map((e) => {
                      return { value: e.id, label: e.name }
                    })}
                    defaultValue={tagSelected}
                  />
                  <span
                    className="input-tag-select"
                    onClick={() => getInputTags()}
                  >
                    {!tagLength
                      ? 'Choose from the most used tags'
                      : `${tagLength} tags found`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="wcfm_gallery_fields">
            <div className="product-feature-upload">
              <img
                src={
                  image === undefined
                    ? 'https://data.portl.live/wp-content/uploads/woocommerce-placeholder-150x150.png'
                    : image
                }
                alt="image"
                // onClick={() => setUploadImage(true)}
              />

              <div
                className="edit-avatar-icon"
                onClick={() => setUploadImage(true)}
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  //onClick={(e) =>

                  // }
                />
                <div className="tooltip-panel">
                  Change Product Photo<em></em>
                </div>
              </div>

              {imageSpinner && (
                <Spinner
                  className="spinner"
                  style={{ width: '1.2rem', height: '1.2rem' }}
                  color="primary"
                />
              )}
              {image !==
                'https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png' && (
                <Button
                  className="cancel-btn"
                  onClick={() =>
                    setImage(
                      'https://data.portl.live/wp-content/plugins/wc-frontend-manager/includes/libs/upload/images/Placeholder.png'
                    )
                  }
                >
                  +
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="wcfm-descp-panel">
          <div className="head-tag">Short Description</div>
          <div className="content-panel">
            <TextEditor
              editorState={editorShort}
              setEditorState={setEditorShort}
              setContentHtml={setShortDescription}
            />
          </div>
        </div>
        <div className="wcfm-descp-panel">
          <div className="head-tag">Description</div>
          <div className="content-panel">
            <TextEditor
              editorState={editorLong}
              setEditorState={setEditorLong}
              setContentHtml={setLongDescription}
            />
          </div>
        </div>
      </div>
      {!hideProduct && (
        <div className="wcfm-tabWrap">
          <div className="wfcm-download-panel">
            <div className="file-tag">Files</div>
            {downloadList.map((item, i) => {
              return (
                <div className="name-panel">
                  <div className="col-file-12">
                    <div className="label-tag">
                      Name<span>*</span>
                    </div>
                    <div className="input-tag">
                      <input
                        name="name"
                        value={item.name}
                        onChange={(e) => handleInputChange(e, i)}
                      />
                    </div>
                  </div>
                  <div className="col-file-12">
                    <div className="label-tag">
                      File<span>*</span>
                    </div>
                    <div className="input-tag">
                      <input
                        className="upload-input"
                        name="file"
                        value={item.file}
                      />

                      <button
                        onClick={() => {
                          setShowDownload(true)
                          setFileName(item.name)
                          setIndex(i)
                        }}
                      >
                        upload
                      </button>
                    </div>
                  </div>
                  <div className="btn-box">
                    {downloadList.length - 1 === i && (
                      <button onClick={handleAddClick} className="plus-icon">
                        +
                      </button>
                    )}
                    {downloadList.length !== 1 && (
                      <button
                        className="cross-icon"
                        onClick={() => handleRemoveClick(i)}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="col-file-12">
              <div className="label-tag">Download Limit</div>
              <div className="input-tag">
                <input
                  type="text"
                  value={download_limit === -1 ? 'Unlimited' : download_limit}
                  placeholder="Unlimited"
                  onChange={(e) => setDownloadLimit(e.target.value)}
                  // onChange={(e) => {
                  //   const exp = /^[0-9]*$/;
                  //   if (e.target.value === "" || exp.test(e.target.value)) {
                  //     setDownloadLimit(e.target.value);
                  //   }
                  // }}
                />
              </div>
            </div>
            <div className="col-file-12">
              <div className="label-tag">Download Expiry</div>
              <div className="input-tag">
                <input
                  type="text"
                  value={download_expiry === -1 ? 'Never' : download_expiry}
                  placeholder="Never"
                  onChange={(e) => setDownloadExpiry(e.target.value)}
                  // onChange={(e) => {
                  //   const exp = /^[0-9]*$/;
                  //   if (e.target.value === "" || exp.test(e.target.value)) {
                  //     setDownloadExpiry(e.target.value);
                  //   }
                  // }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="wcfm-button-panel">
        {!hideProduct && (
          <Link
            href={`/products/${removeSpecailChar(product.name)}/${product.id}`}
          >
            <Button onClick={() => updateView()}>View</Button>
          </Link>
        )}
        {!hideProduct && (
          <Button
            onClick={() => {
              productTitle === '' ? setMsg(true) : handleSubmit('draft')
            }}
          >
            {spin && <Spinner style={{ width: '1.2rem', height: '1.2rem' }} />}
            {''}Draft
          </Button>
        )}
        {hideProduct && (
          <Button
            onClick={() => {
              setUpdateDetail(true)
              setTimeout(() => setUpdateDetail(false), [1500])
            }}
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={() => {
            productTitle === '' ? setMsg(true) : handleSubmit('publish')
          }}
        >
          {spinPublish && (
            <Spinner style={{ width: '1.2rem', height: '1.2rem' }} />
          )}
          {''}
          {hideProduct ? 'update' : 'submit'}
        </Button>
      </div>
      {updateDetail && (
        <Alert color="danger" className="alert-tag">
          Subscription details not updated.
        </Alert>
      )}
      {success && (
        <Alert color="success" className="alert-tag">
          Product update as draft successfully.
        </Alert>
      )}
      {successPublish && !hideProduct && (
        <Alert color="success" className="alert-tag">
          Product update as publish successfully.
        </Alert>
      )}

      {successPublish && hideProduct && (
        <Alert color="success">Subscription details update successfully.</Alert>
      )}
      {msg && <Alert color="danger">Product name cannot be blank.</Alert>}
      {uploadImage && (
        <UploadImage
          show={uploadImage}
          setUploadImage={setUploadImage}
          user={user}
          setPicture={setImage}
          setImageSpinner={setImageSpinner}
          value="Product"
        />
      )}
      {showDownload && (
        <UploadDownloadable
          show={showDownload}
          setShowDownload={setShowDownload}
          user={user}
          name={fileName}
          mergeData={mergeData}
          getImageUrl={getImageUrl}
        />
      )}
    </section>
  )
}
export default EditProductUi
