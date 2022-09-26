import React from 'react'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const style = css`
  display: grid;
  grid-template-columns: 1fr 1fr 50px;
  grid-gap: 10px;
  .btn-delete {
    padding: 10px;
    border-radius: 50%;
  }
  .icon-delete {
    width: 20px;
    height: 20px;
  }
`

function ProductDownloadableFile({ remove, file, onChange }) {
  

  return (
    <div css={style} className="mb-4">
      <div className="input-file-name">
        <input
          placeholder="File name"
          className="input-search"
          type="text"
          name="name"
          onChange={(e) => onChange(e, file)}
          value={file.name}
        />
      </div>
      <div className="input-file-url">
        <input
          placeholder="http://"
          className="input-search"
          type="text"
          name="file"
          value={file.file}
          readOnly
        />
      </div>
      <div className="input-close-button">
        <button
          onClick={() => remove(file.id)}
          className="btn btn-outline-danger btn-delete"
        >
          <FontAwesomeIcon className="icon-delete" icon={faTimes} />
        </button>
      </div>
    </div>
  )
}

export default ProductDownloadableFile
