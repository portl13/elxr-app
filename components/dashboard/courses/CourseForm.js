import InputDashCurrency from "@components/shared/form/InputDashCurrency";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import React from "react";

function CourseForm({ formCourse, setPrice }) {
  return (
    <form className="row mt-4 pb-4" onSubmit={formCourse.handleSubmit}>
      <div className="col-12 mb-4">
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
      <div className="col-12 col-md-6 mb-4">
        <InputDashCurrency
          required={true}
          name="price"
          value={formCourse.values.price}
          onChange={setPrice}
          label="Price ($)"
          error={formCourse.errors.price}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
        <InputDashCurrency
          required={true}
          name="subscriber_price"
          value={formCourse.values.subscriber_price}
          onChange={setPrice}
          label="Subscriber Price ($)"
          error={formCourse.errors.subscriber_price}
        />
      </div>
      <div className="col-12 col-md-6 mb-4">
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
      <div className="col-12 col-md-6 mb-4">
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
      <div className="col-12  mb-4">
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
      <div className="col-12  mb-4">
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
                value: false,
                label: "Always Visible",
              },
              {
                value: true,
                label: "Only Visible to Enrollees",
              },
            ]}
            name={"disable_content_table"}
            value={formCourse.values.disable_content_table}
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
                value: false,
                label: "Linear",
              },
              {
                value: true,
                label: "FreeForm",
              },
            ]}
            name={"progression_disabled"}
            value={formCourse.values.progression_disabled}
            onChange={formCourse.handleChange}
          />
        </div>
      </div>
      <div className="col-12 mt-4">
        <InputDashForm
          required={true}
          type="text"
          name="course_video"
          value={formCourse.values.course_video}
          onChange={formCourse.handleChange}
          label="Url"
          error={formCourse.errors.course_video}
          touched={formCourse.touched.course_video}
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
            <button type="submit" className="btn btn-create py-3">Publish</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CourseForm;
