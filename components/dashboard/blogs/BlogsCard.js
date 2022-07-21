
import React, { useState } from 'react'
import BlogsDeleteModal from './BlogDeleteModal';
import BlogsAction from './BlogsAction'




function BlogsCard(props) {
    const { openDeleteModal, setOpenDeleteModal } = props;

  return (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
    <div className="card-general ">
      <div
        className="ratio ratio-16x9 bg-gray card-head cover-bg"
      ></div>
      <div className="card-info my-2 px-4">
        <div className=" d-flex justify-content-between align-items-center">
            <div>
                <span className='baged-white text-dark'>Blog</span>
            </div>
         <BlogsAction openDeleteModal={openDeleteModal}
              setOpenDeleteModal={setOpenDeleteModal}/>
        </div>
        <div>
          <h4 className="font-size-18 my-1">
            Burger-Joint Cheeseburger
            
          </h4>
          <p className="font-size-17">
            Whit beef, pork, salmon, turkey and chiken
            burger recipes from...
          </p>
          <div className=" d-flex my-3  ">
            <span className='font-size-14 mr-1'>Categoria:</span>
            <span className='font-size-14'>Nutrition</span>
          </div>
          <div className=" d-flex my-2">
          <span className='baged-gris mr-2'>Dj</span>
          <span className='baged-gris mr-2'>Musician</span>
          <span className='baged-gris'>Music Events</span>

          </div>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default BlogsCard