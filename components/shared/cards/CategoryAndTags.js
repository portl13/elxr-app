import React from 'react'

function CategoryAndTags({
    category,
    tags,
}) {
  return (
    <>
      <div className=" d-flex my-2 text-grey">
        <span className="font-size-13 mr-1">Category:</span>
        <span className="font-size-13">{category}</span>
      </div>
      <div className=" d-flex flex-wrap">
        {tags.map((tag) => (
          <span key={tag.term_id} className="baged-gris mr-2 mb-1">
            {tag.label}
          </span>
        ))}
      </div>
    </>
  )
}

export default CategoryAndTags
