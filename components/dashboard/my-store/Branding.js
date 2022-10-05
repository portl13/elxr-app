import React, { useEffect, useState } from "react";
import {
  getStorePortlDetails,
  updateStoreDetails,
  updateStoreMedia,
} from "@api/channel-store.api";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import InputDashForm from "@components/shared/form/InputDashForm";
import Editor from "@components/shared/editor/Editor";
import { getCategories } from "@request/dashboard";
import useSWRImmutable from "swr/immutable";
import axios from "axios";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import MediaLibraryAvatar from "@components/shared/media/MediaLibraryAvatar";
import BlockUi from "@components/ui/blockui/BlockUi";
const wcfmApiURl1 = process.env.baseUrl + "/wp-json/portl/v1/";

const baseUrl = `${process.env.apiV2}/creator`;

function Branding({ user }) {
  const alert = useAlert();
  const token = user?.token;
  const [logo, setLogo] = useState({ url: "" });
  const [banner, setBanner] = useState("");
  const [statusUpdate, setStatusUpdate] = useState(true);
  const [category, setCategory] = useState([]);

  const brandingForm = useFormik({
    initialValues: {
      store_name: "",
      store_email: "",
      phone: "",
      shop_description: "",
      category: [],
    },
    onSubmit: async (values) => {
      setStatusUpdate(true);
      try {
        await updateStoreDetails(user, {
          user_id: user.id,
          data: {
            ...values,
          },
        });
        await updateCategory(values.category);
        if (logo && logo.id) {
          updateImages(
            {
              user_id: user.id,
              type: "gravatar",
              image: logo.id,
            },
            token
          ).then();
        }
        if (banner && banner.id) {
          updateImages(
            {
              user_id: user.id,
              type: "banner",
              image: banner.id,
            },
            token
          ).then();
        }
        alert.success("Store successfully updated", TIMEOUT);
      } catch (e) {
        alert.error("Error updating the configuration", TIMEOUT);
      } finally {
        setStatusUpdate(false);
      }
    },
    validationSchema: Yup.object({
      store_name: Yup.string().required("Creator name is required"),
      store_email: Yup.string().required("Creator email is required"),
      shop_description: Yup.string().required(
        "Creator description is required"
      ),
      category: Yup.array().required("Category is required"),
    }),
  });

  const updateCategory = async (category) => {
    await axios.post(
      `${baseUrl}/categories/${user.id}`,
      {
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const updateImages = async (data, token) => {
    try {
      await axios.post(`${wcfmApiURl1}channel/branding/media`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  // const [resetVendorBanner, handleVendorBanner, isloadingBanner] =
  //   useStoreMedia(user, 'vendor_banner', 'banner', setBanner)
  //
  // const [resetVendorLogo, handleVendorLogo, isLoadingLogo] = useStoreMedia(
  //   user,
  //   'vendor_shop_logo',
  //   'logo',
  //   setLogo
  // )

  useEffect(() => {
    if (!user?.id) return;
    getStorePortlDetails(user)
      .then(({ data }) => {
        brandingForm.setFieldValue("store_name", data.vendor_shop_name || "");
        brandingForm.setFieldValue("phone", data.vendor_shop_phone || "");
        brandingForm.setFieldValue("store_email", data.vendor_shop_email || "");
        brandingForm.setFieldValue(
          "shop_description",
          data.vendor_description || ""
        );
        setLogo({ url: data.vendor_shop_logo || "" });
        setBanner({ url: data.vendor_banner || "" });
        setStatusUpdate(false);
      })
      .catch(() => {});
  }, [user]);

  const { data: categories } = useSWRImmutable(
    token ? [`${baseUrl}/categories`, token] : null,
    getCategories
  );

  const { data: currentCategory } = useSWRImmutable(
    token ? [`${baseUrl}/categories/${user.id}`, token] : null,
    getCategories
  );

  const setCategoryValue = (value) => {
    setCategory(value);
    brandingForm.setFieldValue("category", [value.value]);
  };

  useEffect(() => {
    if (currentCategory) {
      setCategoryValue(currentCategory);
    }
  }, [currentCategory]);

  const selectMediaCover = (media) => {
    setBanner({ url: media.source_url, id: media.id });
  };
  const selectMediaLogo = (media) => {
    setLogo({ url: media.source_url, id: media.id });
  };

  const resetMediaCover = () => {
    setBanner("");
  };

  const resetMediaLogo = () => {
    setLogo("");
  };

  return (
    <div className="branding position-relative pb-5">
      {statusUpdate && <BlockUi color={"var(--primary-color)"} />}
      <div className="row">
        <div className="col-12 col-md-7 ">
          <MediaLibraryCover
            selectMedia={selectMediaCover}
            cover={banner}
            reset={resetMediaCover}
            text="Upload cover image"
            token={token}
            isAvatar={true}
          />
          <MediaLibraryAvatar
            selectMedia={selectMediaLogo}
            logo={logo}
            reset={resetMediaLogo}
            text={"Brand Logo"}
            token={token}
            url={logo?.url}
          />
        </div>
      </div>
      <form onSubmit={brandingForm.handleSubmit} className="row mt-4">
        <div className="col-12 col-md-6 mb-4">
          <InputDashForm
            name={"store_name"}
            type="text"
            label="Creator Name"
            required={true}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.store_name}
            touched={brandingForm.touched.store_name}
            error={brandingForm.errors.store_name}
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
            error={brandingForm.errors.category}
            touched={brandingForm.touched.category}
            options={categories}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <InputDashForm
            type={"email"}
            label={"Creator Email"}
            name={"store_email"}
            required={true}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.store_email}
            touched={brandingForm.touched.store_email}
            error={brandingForm.errors.store_email}
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <InputDashForm
            type={"text"}
            label={"Creator Phone"}
            name={"phone"}
            required={false}
            onChange={brandingForm.handleChange}
            value={brandingForm.values.phone}
            touched={brandingForm.touched.phone}
            error={brandingForm.errors.phone}
          />
        </div>

        <div className="col-12">
          <Editor
            className="editor-styles"
            onChange={(value) =>
              brandingForm.setFieldValue("shop_description", value)
            }
            value={brandingForm.values.shop_description}
          />
          {brandingForm.touched.shop_description && (
            <div className="invalid-feedback d-block">
              {brandingForm.errors.shop_description}
            </div>
          )}
        </div>

        <div className="d-flex mt-3 justify-content-center justify-content-md-end w-100">
          <button className="btn btn-create px-5" type="submit">
            {!statusUpdate ? "Save" : "Updating"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Branding;
