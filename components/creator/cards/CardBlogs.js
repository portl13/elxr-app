import React from 'react'

function CardBlogs() {
  return (
    <div className="card-general">
      <div className="ratio ratio-16x9 bg-gray card-head cover-bg"></div>
      <div className="card-info">
        <div className=" d-flex justify-content-between mt-4">
          <span className="baged-white text-dark">Blog</span>
        </div>
        <h4 className="card-title my-1">Burger-Joint Cheeseburger</h4>
        <p className="m-0 font-size-12 line-clamp-2">
          Whit beef, pork, salmon, turkey and chiken burger recipes from...
        </p>
        <div className=" d-flex my-2">
          <span className="font-size-12 mr-1">Categoria:</span>
          <span className="font-size-12">Nutrition</span>
        </div>
        <div className=" d-flex flex-wrap">
          <span className="baged-gris mr-2 mb-1">Dj</span>
          <span className="baged-gris mr-2 mb-1">Musician</span>
          <span className="baged-gris mb-1">Music Events</span>
        </div>
      </div>
    </div>
  )
}

export default CardBlogs
