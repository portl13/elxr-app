import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
function WebDetail(props) {
  const { categories, setStreamForm, streamForm } = props

  const handleChange = (e) => {
    setStreamForm({
      ...streamForm,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div className="create-stream-process">
        <ul>
          <li className="active">
            Details
            <span></span>
          </li>
          <li>
            Customization
            <span></span>
          </li>
          <li>
            Visibility
            <span></span>
          </li>
        </ul>
      </div>
      <div className="details-data-section">
        <h2>Details</h2>
        <div className="description-section">
          <span>Title (required)</span>
          <textarea
            value={streamForm.title}
            name="title"
            onChange={(e) => handleChange(e)}
            placeholder="Add a title that describes your stream (type @ to mention a channel)"
          ></textarea>
        </div>
        <div className="description-section">
          <span>Description</span>
          <textarea
            value={streamForm.description}
            name="description"
            onChange={(e) => handleChange(e)}
            rows={5}
            placeholder="Tell viewers more about your stream (type @ to mention a channel)"
          ></textarea>
        </div>
        <div className="category-section">
          <span>Category</span>
          <label>
            Add your stream to a category so viewers can find it more easily
          </label>
          <select
            value={streamForm.category}
            name="category"
            onChange={(e) => handleChange(e)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="category-section">
          <span>Thumbnail</span>
          <label>
            Select or upload a picture that represents your stream. A good
            thumbnail stands out and draws viewers attention.{' '}
            <a href="">Learn more</a>
          </label>
          <div className="thumbnail-view">
            <FontAwesomeIcon icon={faImages} />
            <span>Upload thumbnails</span>
          </div>
        </div>
      </div>
    </>
  )
}
export default WebDetail
