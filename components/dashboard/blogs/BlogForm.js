import Editor from "@components/shared/editor/Editor";
import InputDashTags from "@components/shared/form/InpushDashTags";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import React from "react";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";
import { useRouter } from "next/router";

function BlogForm({
  formik,
  tags,
  setTags,
  category,
  setCategoryValue,
  categories,
  handleContent,
  handleSubmit,
  updated = false,
  handlerSelectChannel
}) {
  const router = useRouter();

  return (
    <>
      <div className="row mt-4 pb-4">
        <div className="col-12 col-md-6 mb-4">
          <InputDashForm
            required={true}
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            label="Blog Title"
            error={formik.errors.title}
            touched={formik.touched.title}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <InputSelectChannel
            label="Channel"
            name="channel_id"
            placeholder="Select Channel..."
            required={true}
            error={formik.errors.channel_id}
            touched={formik.touched.channel_id}
            onChange={handlerSelectChannel}
            value={formik.values.channel_id}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <InputDashForm
            required={true}
            type="select"
            name="category"
            value={category}
            onChange={setCategoryValue}
            label="Category"
            error={formik.errors.category}
            touched={formik.touched.category}
            options={categories}
          />
        </div>
        <div className="col-12 col-md-6 mb-4">
          <InputDashTags value={tags} setValue={setTags} />
        </div>
        <div className="col-12  mb-4">
          <Editor
            className="editor-styles w-100 full"
            value={formik.values.content}
            onChange={handleContent}
          />
          {formik.errors.content && formik.touched.content && (
            <div className="invalid-feedback d-block col font-size-18 mt-2">
              {formik.errors.content}
            </div>
          )}
        </div>
        <div className="col-12 mt-4">
          <h3>Blog Content</h3>
          <div className="d-flex mt-3">
            <InputDashRadio
              values={[
                {
                  value: "open",
                  label: "Open",
                },
                {
                  value: "subscribers",
                  label: "Subscribers Only",
                },
              ]}
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
      <div className="col-12 my-4">
         <div className="w-100 d-flex justify-content-end">
          <button onClick={() => router.back()} className={"btn btn-outline-primary b-radius-25"}> 
            Cancel
          </button>
          <button
            onClick={() => handleSubmit("draft")}
            className={"btn btn-theme b-radius-25"}
          >
            Save as Draft
          </button>
          <button
            onClick={() => handleSubmit("publish")}
            className={"btn btn-primary b-radius-25"}
          >
            
              {updated ? "Update" : "Publish"}
          </button>
        </div>
      </div>
    </>
  );
}

export default BlogForm;
