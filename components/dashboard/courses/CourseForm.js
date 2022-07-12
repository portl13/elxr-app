import InputDashCurrency from "@components/shared/form/InputDashCurrency";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import React from "react";

function CourseForm({ formCourse, setPrice }) {


  return (
    <form className="row mt-4" onSubmit={formCourse.handleSubmit}>
      <div className="col-12">
        <InputDashForm
          required={true}
          type="text"
          name="title"
          value={formCourse.values.title}
          onChange={formCourse.handleChange}
          label="Course Title"
          error={formCourse.errors.title}
          touched={formCourse.touched.title}
        />
      </div>
      <div className="col-12 col-md-6 mt-md-3">
        <InputDashCurrency
          required={true}
          name="price"
          value={formCourse.values.price}
          onChange={setPrice}
          label="Price ($)"
          error={formCourse.errors.price}
        />
      </div>
      <div className="col-12 col-md-6 mt-md-3">
        <InputDashCurrency
          required={true}
          name="subscriber_price"
          value={formCourse.values.subscriber_price}
          onChange={setPrice}
          label="Subscriber Price ($)"
          error={formCourse.errors.subscriber_price}
        />
      </div>
      <div className="col-12 col-md-6 mt-md-3">
        <InputDashForm
          required={true}
          type="select"
          name="category"
          value={formCourse.values.category}
          onChange={formCourse.handleChange}
          label="Category"
          error={formCourse.errors.category}
          touched={formCourse.touched.category}
          options={[]}
        />
      </div>
      <div className="col-12 col-md-6 mt-md-3">
        <InputDashForm
          required={true}
          type="select"
          name="tags"
          value={formCourse.values.tags}
          onChange={formCourse.handleChange}
          label="Tags"
          error={formCourse.errors.tags}
          touched={formCourse.touched.tags}
          options={[]}
        />
      </div>
      <div className="col-12  mt-md-3">
        <InputDashForm
          required={true}
          type="textarea"
          name="description"
          value={formCourse.values.description}
          onChange={formCourse.handleChange}
          label="Description"
          error={formCourse.errors.description}
          touched={formCourse.touched.description}
        />
      </div>
      <div className="col-12  mt-md-3">
        <InputDashForm
          required={true}
          type="textarea"
          name="short_description"
          value={formCourse.values.short_description}
          onChange={formCourse.handleChange}
          label="Short Description (To be diplayed on Course Grid)"
          error={formCourse.errors.short_description}
          touched={formCourse.touched.short_description}
        />
      </div>
      <div className="col-12 mt-4">
        <h3>Course Content</h3>
        <div className="d-flex mt-3">
          <InputDashRadio
            values={[
              {
                value: "always_isible",
                label: "Always Visible",
              },
              {
                value: "only_visible_to_enrollees",
                label: "Only Visible to Enrollees",
              },
            ]}
            name={"course_content"}
            value={formCourse.values.course_content}
            onChange={formCourse.handleChange}
          />
        </div>
      </div>
      <div className="col-12 mt-4">
        <h3>Course Progression</h3>
        <div className="d-flex  mt-3">
          <InputDashRadio
            values={[
              {
                value: "linear",
                label: "Linear",
              },
              {
                value: "FreeForm",
                label: "FreeForm",
              },
            ]}
            name={"course_progression"}
            value={formCourse.values.course_progression}
            onChange={formCourse.handleChange}
          />
        </div>
      </div>
      <div className="col-12 mt-4">
        <InputDashForm
          required={true}
          type="text"
          name="url"
          value={formCourse.values.url}
          onChange={formCourse.handleChange}
          label="Url"
          error={formCourse.errors.url}
          touched={formCourse.touched.url}
        />
      </div>
      <div className="col-12 my-4">
        <div className="d-flex justify-content-end">
          <div className="mr-3">
            <button className="btn btn-border-primary-2 py-3">Course Lesson Builder</button>
          </div>
          <div className="mr-3">
            <button className="btn btn-border-primary-2 py-3">Save as Draft</button>
          </div>
          <div className="mr-3">
            <button type="submits" className="btn btn-create py-3">Publish</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CourseForm;
