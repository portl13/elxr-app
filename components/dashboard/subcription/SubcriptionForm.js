import React from "react";
import Editor from "@components/shared/editor/Editor";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashCurrency from "@components/shared/form/InputDashCurrency";
import InputDashCheck from '@components/shared/form/InputDashCheck'
import { css } from '@emotion/core'

function SubcriptionForm({ form, setPrice, openVideo }) {
  return (
    <form className="row" onSubmit={form.handleSubmit}>
      <div className="col-12 mt-5 mb-4">
        <InputDashForm
          label="Product Title"
          name="name"
          value={form.values.name}
          onChange={form.handleChange}
          error={form.errors.name}
          touched={form.touched.name}
          type="text"
          required={true}
        />
      </div>
      <div className="col-12 mb-4">
        <InputDashCurrency
          label="Monthly Price ($)"
          name="subscription_price"
          value={form.values.subscription_price}
          onChange={setPrice}
          errors={form.errors.subscription_price}
          touched={form.touched.subscription_price}
          required={true}
        />
      </div>
      <div className="col-12 mb-4">
        <Editor
          className="editor-styles"
          onChange={(value) => form.setFieldValue("description", value)}
          value={form.values.description}
        />
        {form.touched.description && form.errors.description && (
          <div className="invalid-feedback d-block">
            {form.errors.description}
          </div>
        )}
      </div>
      <div className="col mt-4">
        <InputDashForm
          label="video preview url"
          name="video_preview"
          value={form.values.video_preview}
          onChange={form.handleChange}
          error={form.errors.video_preview}
          touched={form.touched.video_preview}
          type="text"
        />
        <span className="d-block my-3 pl-4">Or Upload a Video</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            openVideo(true);
          }}
          className="btn btn-create ml-3"
        >
          Upload Video
        </button>
      </div>
      <div
          css={css`
            display: grid;
            grid-template-columns: 50px 1fr;
            & .custom-control-label::before {
              width: 2.25rem;
              height: 2.25rem;
            }
            & .custom-control-label::after {
              width: 2.25rem;
              height: 2.25rem;
            }
          `}
          className="col-12 mt-5"
        >
          <InputDashCheck
            name={'show_subscription'}
            label={''}
            value={form.values.show_subscription}
            onChange={form.handleChange}
            className="mr-0"
          />
          <div className="text-left">
            <h5 className="m-0">Activate my Subscrption Button</h5>
            <span>
              You can do this later under your Manage Subscription Tab
            </span>
          </div>
        </div>
      <div className="col-12">
        <div className="d-flex justify-content-center justify-content-md-end mb-3 mt-5">
          <button type="submit" className="btn btn-create px-5">
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default SubcriptionForm;
