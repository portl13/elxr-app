import React from "react";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashTags from "@components/shared/form/InpushDashTags";
import Editor from "@components/shared/editor/Editor";
import InputDashRadio from "@components/shared/form/InputDashRadio";
import InputSelectChannel from "@components/shared/form/InputSelectChannel";

function ImageForm({
  form,
  tags,
  setTags,
  setCategoryValue,
  category,
  categories,
  handleContent,
  handlerSelectChannel,
}) {
  return (
    <>
      <div className={"mb-4 mt-5 w-100"}>
        <InputDashForm
          required={true}
          label={"Title"}
          type={"text"}
          name={"title"}
          value={form.values.title}
          onChange={form.handleChange}
          error={form.errors.title}
          touched={form.touched.title}
        />
      </div>
      <div className="mb-4 w-100">
        <InputSelectChannel
          label="Channel"
          name="channel_id"
          placeholder="Select Channel..."
          required={true}
          error={form.errors.channel_id}
          touched={form.touched.channel_id}
          value={form.values.channel_id}
          onChange={handlerSelectChannel}
        />
      </div>
      <div className="mb-4 w-100">
        <InputDashForm
          required={true}
          type="select"
          name="category"
          value={category}
          onChange={setCategoryValue}
          label="Category"
          error={form.errors.category}
          touched={form.touched.category}
          options={categories}
        />
      </div>
      <div className="mb-4 w-100">
        <InputDashTags value={tags} setValue={setTags} />
      </div>
      <div className="mb-4 w-100">
        <h4>Description</h4>
        <Editor
          className="editor-styles w-100 full"
          value={form.values.content}
          onChange={handleContent}
        />
        {form.errors.content && form.touched.content && (
          <div className="invalid-feedback d-block col font-size-18 mt-2">
            {form.errors.content}
          </div>
        )}
      </div>
      <div className="mb-4 w-100">
        <h3 className={"font-size-14"}>Visibility Settings</h3>
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
            value={form.values.type}
            onChange={form.handleChange}
          />
        </div>
      </div>
    </>
  );
}

export default ImageForm;
