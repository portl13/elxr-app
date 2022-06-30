import React from 'react'

function ChannelCardVideo() {
  return (
    <div className="col-12 col-md-6 col-lg-3 mt-5">
      <article className="card-general">
        <div className="ratio ratio-16x9">{/* <img src="" alt="" /> */}</div>
        <div className="p-3">
          <div>
            <span className="badge badge-primary mb-1">Video</span>
          </div>
          <div>
            <h5 className="m-0 font-size-12 font-weight-bold">
              Burger-Joint Cheeseburger
            </h5>
            <p className="m-0 font-size-12">
              With beef, pork, salmon, turkey and chicken burger recipes from...
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default ChannelCardVideo
