import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";
import { UserContext } from "@context/UserContext";
import SubcriptionForm from "./SubcriptionForm";
import useSWRImmutable from "swr/immutable";
import {
  genericFetch,
  genericFetchPost,
  genericFetchPut,
  getProductCategories,
  getProductTags,
} from "@request/dashboard";
import BlockUi from "@components/ui/blockui/BlockUi";
import { useAlert } from "react-alert";
import { defaultData, TIMEOUT } from "@utils/constant";
import { updateSubscription } from "@api/channel.api";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";

const url = `${process.env.woocomApi}/products`;

const productUrl = process.env.apiURl + "/product";

function Subscription() {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const token = user?.token;
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productID, setProductID] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      subscription_price: 0,
      description: "",
      type: "subscription",
      virtual: true,
      images: [],
      video_preview: "",
    },
    onSubmit: async (values) => submitForm(values),
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      subscription_price: Yup.string().required("Price is required"),
      description: Yup.string().required("Description is required"),
    }),
  });

  const { data: subscription, mutate } = useSWRImmutable(
    token
      ? [`${url}?page=1&per_page=1&status=any&type=subscription`, token]
      : null,
    genericFetch
  );

  const submitForm = async (values) => {
    const data = {
      ...defaultData,
      ...values,
      regular_price: values.subscription_price,
      sale_price: values.subscription_price,
      meta_data: [
        ...defaultData.meta_data,
        {
          key: "_video_preview",
          value: values.video_preview,
        },
      ],
    };

    if (productID) {
      data.id = productID;
    }

    try {
      setIsLoading(true);
      if (productID) {
        await genericFetchPut(productUrl, data, token);
      }
      if (!productID) {
        await createSubscriptionProduct(user, data);
      }
      await mutate();
      alert.success("Subscription Updated", TIMEOUT);
    } catch (error) {
      alert.error(error.message, TIMEOUT);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscriptionProduct = async (user, data, productID) => {
    const params = {
      ...defaultData,
      ...data,
      id: productID,
    };
    const res = await updateSubscription(user, params);
    return res.data;
  };

  const createSubscriptionProduct = async (user, data) => {
    const res = await genericFetchPost(productUrl, user?.token, data);
    return res.data;
  };

  const selectMedia = (media) => {
    formik.setFieldValue("images", [{ id: media.id }]);
    setCover({ url: media.source_url });
  };

  const resetMedia = () => {
    formik.setFieldValue("images", []);
    setCover(null);
  };

  const setPrice = (value, field) => {
    if (typeof value === "string") {
      formik.setFieldValue(field, value);
      return;
    }
    formik.setFieldValue(field, 0);
  };

  const selectVideo = (media) => {
    formik.setFieldValue("video_preview", media.uid);
  };

  useEffect(() => {
    if (subscription) {
      const noSubscription = subscription.length === 0;
      if (noSubscription) {
        return;
      }

      const subscriptionData = subscription[0];

      const isEmpty = Object.keys(subscriptionData).length === 0;
      if (isEmpty) {
        return;
      }

      setProductID(subscriptionData.id);

      formik.setFieldValue("name", subscriptionData.name);
      formik.setFieldValue("sale_price", subscriptionData.sale_price);
      formik.setFieldValue("description", subscriptionData.description);

      const _video_preview = subscriptionData.meta_data.find(
        ({ key }) => key === "_video_preview"
      );

      if (_video_preview) {
        formik.setFieldValue("video_preview", _video_preview.value);
      }

      formik.setFieldValue("subscription_price", subscriptionData.sale_price || 0);

      const image = subscriptionData.images[0];

      if (image) {
        setCover({ url: image.src });
        formik.setFieldValue("images", [{ id: image.id }]);
      }
      setIsLoading(false);
    }
  }, [subscription]);

  return (
    <>
      <div className="container container-80 mb-4 pb-4 position-relative">
        {isLoading && <BlockUi color={"var(--primary-color)"} />}
        <h3 className="display-3 mb-5">Subscription</h3>
        <div className="row">
          <div className="col-12 col-md-6">
            <MediaLibraryCover
              selectMedia={selectMedia}
              cover={cover}
              className="ratio ratio-16x9"
              reset={resetMedia}
              text="Upload Cover Image"
              token={token}
            />
          </div>
        </div>
        <SubcriptionForm
          form={formik}
          setPrice={setPrice}
          openVideo={setOpen}
        />
      </div>

      {open ? (
        <MediaLibraryVideo
          show={open}
          setShow={() => setOpen(!open)}
          selectMedia={selectVideo}
        />
      ) : null}
    </>
  );
}

export default Subscription;
