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
  getProductCategories,
  getProductTags,
} from "@request/dashboard";
import BlockUi from "@components/ui/blockui/BlockUi";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import { updateSubscription } from "@api/channel.api";
import MediaLibraryVideo from "@components/MediaLibraryVideo/MediaLibraryVideo";

const meta_data = [
  {
    key: "_subscription_period",
    value: "month",
  },
  {
    key: "_subscription_period_interval",
    value: "1",
  },
  {
    key: "_subscription_length",
    value: "0",
  },
];

const url = `${process.env.woocomApi}/products`;

function Subcription() {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const token = user?.token;
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState(null);
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [productID, setProductID] = useState(null);
  const [unSubcription, setUnSubcription] = useState(true);

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

  const { data: subcription, mutate } = useSWRImmutable(
    token
      ? [`${url}?page=1&per_page=1&status=any&type=subscription`, token]
      : null,
    genericFetch
  );

  const submitForm = async (values) => {
    const data = {
      ...values,
      id: productID,
      regular_price: values.subscription_price,
      sale_price: values.subscription_price,
      meta_data: [
        ...meta_data,
        {
          key: "_video_preview",
          value: values.video_preview,
        },
        {
          key: "_subscription_price",
          value: values.subscription_price,
        },
      ],
    };

    try {
      setIsLoading(true);
      if (!unSubcription) {
        await updateSubscriptionProduct(user, data, productID);
      }
      if (unSubcription) {
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
    const res = await updateSubscription(user, data, productID);
    return res.data;
  };

  const createSubscriptionProduct = async (user, data) => {
    const res = await genericFetchPost(url, user?.token, data);
    return res.data;
  };

  const { data: categories } = useSWRImmutable(
    token ? [`/api/woocommerce/categories`, token] : null,
    getProductCategories
  );

  const { data: tags } = useSWRImmutable(
    token ? [`/api/woocommerce/tags`, token] : null,
    getProductTags
  );

  const selectMedia = (media) => {
    formik.setFieldValue("images", [{ id: media.id }]);
    setCover({ url: media.source_url });
  };

  const resetMedia = () => {
    formik.setFieldValue("images", []);
    setCover(null);
  };

  const handlerChangeCategory = (value) => {
    setCategory(value);
    formik.setFieldValue("categories", [{ id: String(value.value) }]);
  };
  const handlerChangeTag = (value) => {
    setTag(value);
    formik.setFieldValue("tags", [{ id: String(value.id) }]);
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
    if (subcription) {
      const noSubcription = subcription.length === 0;
      if (noSubcription) {
        return;
      }
      setUnSubcription(false);
      const subcriptionData = subcription[0];

      const isEmpty = Object.keys(subcriptionData).length === 0;
      if (isEmpty) {
        return;
      }

      setProductID(subcriptionData.id);
      formik.setFieldValue("name", subcriptionData.name);
      formik.setFieldValue("sale_price", subcriptionData.sale_price);
      formik.setFieldValue("description", subcriptionData.description);

      const _subscription_price = subcriptionData.meta_data.find(
        ({ key }) => key === "_subscription_price"
      );
      const _video_preview = subcriptionData.meta_data.find(
        ({ key }) => key === "_video_preview"
      );

      if (_video_preview) {
        formik.setFieldValue("video_preview", _video_preview.value);
      }

      if (_subscription_price) {
        formik.setFieldValue("subscription_price", _subscription_price.value);
      }

      const category = subcriptionData.categories.find(
        (cat) => cat.id === subcriptionData.categories[0].id
      );

      if (category) {
        setCategory({ value: category.id, label: category.name });
        formik.setFieldValue("categories", [{ id: category.id }]);
      }

      const image = subcriptionData.images[0];

      if (image) {
        setCover({ url: image.src });
        formik.setFieldValue("images", [{ src: image.src }]);
      }
      setIsLoading(false);
    }
  }, [subcription]);

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
          tag={tag}
          tags={tags ? tags : []}
          category={category}
          categories={categories ? categories : []}
          handlerChangeCategory={handlerChangeCategory}
          handlerChangeTag={handlerChangeTag}
          form={formik}
          token={token}
          setPrice={setPrice}
          openVideo={setOpen}
        />
      </div>

      {open ? <MediaLibraryVideo
          show={open}
          setShow={() => setOpen(!open)}
          selectMedia={selectVideo}
      /> : null}
    </>
  );
}

export default Subcription;
