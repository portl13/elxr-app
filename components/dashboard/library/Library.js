import React, { useState } from "react";
import LupaIcon from "@icons/LupaIcon";
import PlusIcon from "@icons/PlusIcon";
import LibraryAddModal from "./LibraryAddModal";


function Library() {
    const [open, setOpen] = useState(false)
  return (
    <>    
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <div>
          <h2 className="title-dashboard">Library Content</h2>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <form action="">
            <div className="input-search-contain">
              <span className="input-search-icon">
                <LupaIcon className="input-search-icon-svg" />
              </span>
              <input
                className="input-search"
                type="search"
                name=""
                placeholder="Search"
              />
            </div>
          </form>
          <div  className="btn-create-client">
            <span className="btn-contain-icon">
              <PlusIcon className="btn-create-icon" />
            </span>
            <button onClick={()=> setOpen(!open)} className="btn btn-create">Add New</button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start mt-4 mb-5">
        <div className="d-flex">
          <div className="p-1 ">
            <button className={`btn-transparent active`}>Branding</button>
          </div>
          <div className="p-1 ">
            <button className={`btn-transparent`}>Policy Settings</button>
          </div>
          <div className="p-1 ">
            <button className={`btn-transparent`}>Support</button>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 col-md-6 col-lg-3 mt-5">
          <article className="card-general">
            <div className="ratio ratio-16x9">
              {/* <img src="" alt="" /> */}
            </div>
            <div className="p-3">
              <div>
                <span className="badge badge-primary mb-1">Video</span>
              </div>
              <div>
                <h5 className="m-0 font-size-12 font-weight-bold">
                  Burger-Joint Cheeseburger
                </h5>
                <p className="m-0 font-size-12">
                  With beef, pork, salmon, turkey and chicken burger recipes
                  from...
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <LibraryAddModal open={open} setOpen={setOpen} />
    </>
  );
}

export default Library;
