import { css } from '@emotion/core'
import React from 'react'
import Scrollbars from 'react-custom-scrollbars-2'

function CategoryAndTags({ category, tags }) {
  return (
    <>
      <div className=" d-flex my-2 text-grey">
        <span className="font-size-13 mr-1">Category:</span>
        <span className="font-size-13">{category}</span>
      </div>
      <div css={css`height:25px; overflow-x:auto;width:100%;`}>
        <Scrollbars universal>
          {tags.map((tag) => (
            <span key={tag.term_id} className="baged-gris mr-2 mb-1">
              {tag.label}
            </span>
          ))}
        </Scrollbars>
      </div>
    </>
  )
}

export default CategoryAndTags