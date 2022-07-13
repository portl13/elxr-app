import InputDashForm from "@components/shared/form/InputDashForm";
import React from "react";

function LessonEditorForm({ formulario }) {
  return (
    <form className="row" onSubmit={formulario.handleSubmit}>
      <div className="col-12 col-md-9 mt-3 mt-md-0 pl-0">
        <InputDashForm
          required={true}
          type="text"
          name="title"
          value={formulario.values.title}
          onChange={formulario.handleChange}
          label="Lesson Title"
          error={formulario.errors.title}
          touched={formulario.touched.title}
        />
      </div>
      <div className=" col-12 col-md-3 mt-3 mt-md-0 ">
        <div className="d-flex justify-content-md-center ">
          <button  className="btn btn-create px-4 py-3">
            Course Settings
          </button>
        </div>
      </div>

      <div className="col-12 mt-3 mr-0 input-default px-3 px-md-5">
        <div className="d-flex justify-content-center">
          <h4>Fundamentals of Social studies</h4>
        </div>

        <div className="text-justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
            repellendus molestias laborum cupiditate, eveniet harum odio eaque
            consequuntur facere cum deleniti quam. Reiciendis blanditiis
            corporis rem ipsam exercitationem at pariatur. Lorem ipsum, dolor
            sit amet consectetur adipisicing elit. Eveniet ipsa nihil sint
            sapiente perferendis pariatur, nemo, est tempora ipsum enim expedita
            veritatis sequi alias facilis blanditiis, similique animi impedit
            recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsum, deleniti exercitationem, distinctio id.
          </p>


            <span>7 Concepts of social studies are:</span>

          <ul className="mt-3">
            <li>tate, eveniet
            consequuntur facer</li>
            <li>xercitationem at</li>
            <li>iatur, nemo, est tempora ip</li>
            <li>sam exercitationem at pariatur. Lorem ipsum, dolor
            sit amet</li>
            <li> cum deleniti quam. Reiciendis blanditi</li>
            <li>iti quam. Reiciendis blanditiis</li>
            <li>tatis sequi alias facilis blanditii</li>
            <li>acere cum deleniti quam. Reic</li>
            <li>is, similique animi impedit
            recusanda</li>
          </ul>
        </div>
      </div>

      <div className="col-12 mt-4">
        <div className="d-flex justify-content-end ">
            <div className="pr-3">
                <button className="btn btn-border-primary-2 px-4  py-3">
                    Save as Draft
                </button>
            </div>
            <div>
                <button type="submit" className="btn btn-create py-3 px-5">
                    Publish
                </button>
            </div>
        </div>
      </div>
    </form>
  );
}

export default LessonEditorForm;
