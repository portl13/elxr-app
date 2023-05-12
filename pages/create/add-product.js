import React, { useContext, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "@context/UserContext";
import useSWRImmutable from "swr/immutable";
import { createProduct, getProductCategories } from "@request/dashboard";
import { useRouter } from "next/router";
import { TIMEOUT } from "@utils/constant";
import { useAlert } from "react-alert";
import InputDashForm from "@components/shared/form/InputDashForm";
import InputDashCurrency from "@components/shared/form/InputDashCurrency";
import Editor from "@components/shared/editor/Editor";
import ProductDownloadableFile from "@components/dashboard/product/ProductDownloadableFile";
import { v4 as uuidv5 } from "uuid";
import md5 from "md5";
import { uploadGeneralDownloable } from "@request/shared";
import BlockUi from "@components/ui/blockui/BlockUi";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import ProductIcon from "@icons/ProductIcon";
import MediaLibraryCover from "@components/shared/media/MediaLibraryCover";

const productUrl = process.env.apiURl + "/product";

function AddNewProduct() {
  const { user } = useContext(UserContext);
  const inputFile = useRef(null);
  const router = useRouter();
  const alert = useAlert();
  const [isSaving, setIsSaving] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [downloadableFiel, setDownloadableFiel] = useState([]);
  const [category, setCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const { token = null } = user?.token ? user : {};
  const [cover, setCover] = useState(null);

  const { data: categoriesData } = useSWRImmutable(
    token ? [`/api/woocommerce/categories`, token] : null,
    getProductCategories
  );

  const addProductForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      regular_price: "",
      sale_price: "",
      categories: [],
      virtual: true,
      downloadable: true,
      featured_image: "",
      status: "",
      downloadable_files: [],
    },
    onSubmit: (values) => createProductSubmit(values),
    validationSchema: Yup.object({
      name: Yup.string().required("Product Title is Required"),
      regular_price: Yup.string().required("Price is Required"),
      description: Yup.string().required("Description is Required"),
      categories: Yup.array().required("Category is Required"),
    }),
  });

  const createProductSubmit = async (values) => {
    setIsSaving(true);
    try {
      const pro = await createProduct(productUrl, token, values);
      console.log({pro})
      setIsSaving(false);
      await router.push("/manage/products");
    } catch (error) {
      setIsSaving(false);
      alert.error(error.message, TIMEOUT);
    }
  };

  const handlerChangeCategory = (value) => {
    setCategory(value);
    addProductForm.setFieldValue("categories", [String(value.value)]);
  };

  const handleSubmit = async (status) => {
    await addProductForm.setFieldValue("status", status);
    await addProductForm.submitForm();
  };
  useEffect(() => {
    if (productImage) {
      addProductForm.setFieldValue("featured_image", { id: productImage.id });
    }
  }, [productImage]);

  const setPrice = (value, field) => {
    if (typeof value === "string") {
      addProductForm.setFieldValue(field, value);
      return;
    }
    addProductForm.setFieldValue(field, 0);
  };
  
  const removeDownloadableFile = (id) => {
    setDownloadableFiel(downloadableFiel.filter((item, i) => item.id !== id));
  };

  const uploadFileDownloadable = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", md5(uuidv5()));

    return await uploadGeneralDownloable(token, formData);
  };

  const onHandleChangeDownloadableFile = (e, file) => {
    const data = downloadableFiel.map((item) => {
      if (item.id === file.id) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });

    setDownloadableFiel(data);
    addProductForm.setFieldValue("downloadable_files", data);
  };

  const handleUploadFile = async (e) => {
    try {
      setLoadingFile(true);
      let fileUpload = "";
      if (e.target.files.length >= 1) {
        fileUpload = await uploadFileDownloadable(e.target.files[0]);
      }
      const data = [...downloadableFiel, fileUpload];
      setDownloadableFiel(data);
      await addProductForm.setFieldValue("downloadable_files", data);
    } catch (error) {
      alert.error(error.message, TIMEOUT);
    } finally {
      setLoadingFile(false);
    }
  };

  const selectMedia = (media) => {
    addProductForm.setFieldValue("featured_image", { id: media.id });
    setCover({ url: media.source_url });
  };

  const resetMedia = () => {
    addProductForm.setFieldValue("featured_image", "");
    setCover(null);
  };

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Add New Product"}>
      <div className="position-relative">
        {isSaving && <BlockUi color="var(--primary-color)" />}
        <div className="container px-3 px-md-5 pt-5">
          <BackButton />

          <div className="container container-80">
            <div className="py-5">
              <ListNavItem
                data={{
                  title: "Add new Product",
                  type: "heading",
                  icon: <ProductIcon />,
                }}
              />
            </div>

            <div className="row">
              <div className="col-12 col-md-5">
                <MediaLibraryCover
                  selectMedia={selectMedia}
                  cover={cover}
                  reset={resetMedia}
                  text="Upload Cover Image"
                  className="ratio ratio-16x9"
                  token={token}
                />
              </div>
              <div className="col-12">
                <div className="row" >
                  <div className="col-12 mt-5 mb-3">
                    <InputDashForm
                      label="Product Title"
                      name="name"
                      value={addProductForm.values.name}
                      onChange={addProductForm.handleChange}
                      error={addProductForm.errors.name}
                      touched={addProductForm.touched.name}
                      type="text"
                      required={true}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <InputDashCurrency
                      label="Price ($)"
                      name="regular_price"
                      value={addProductForm.values.regular_price}
                      onChange={setPrice}
                      error={addProductForm.errors.regular_price}
                      touched={addProductForm.touched.regular_price}
                      required={true}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-4">
                    <InputDashForm
                      label={"Category"}
                      type="select"
                      name="categories"
                      value={category}
                      onChange={handlerChangeCategory}
                      error={addProductForm.errors.categories}
                      touched={addProductForm.touched.categories}
                      options={categoriesData?.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                    />
                  </div>
                  <div className="col-12">
                    <Editor
                      className="editor-styles"
                      onChange={(value) =>
                        addProductForm.setFieldValue("description", value)
                      }
                      value={addProductForm.values.description}
                    />
                    {addProductForm.touched.description &&
                      addProductForm.errors.description && (
                        <div className="invalid-feedback d-block">
                          {addProductForm.errors.description}
                        </div>
                      )}
                  </div>
                </div>

                <div className="my-4">
                  <h4>Downloadable files</h4>
                </div>
                <div>
                  {downloadableFiel.map((file) => (
                    <ProductDownloadableFile
                      key={file.id}
                      file={file}
                      remove={removeDownloadableFile}
                      onChange={onHandleChangeDownloadableFile}
                    />
                  ))}
                </div>
                <input
                  onChange={handleUploadFile}
                  ref={inputFile}
                  type="file"
                  name="file"
                  className="d-none"
                />
                <div className="mt-1 d-flex justify-content-start">
                  <button
                    onClick={() => inputFile.current.click()}
                    className="btn btn-create px-3 mr-2 mb-3"
                  >
                    {!loadingFile ? (
                      "Add File"
                    ) : (
                      <div>
                        uploading files
                        <span
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                          className="ml-2 spinner-border text-light"
                        ></span>
                      </div>
                    )}
                  </button>
                </div>
                <div className="w-100 d-flex justify-content-center justify-content-md-end">
                  <button
                    onClick={() => router.back()}
                    className={"btn btn-outline-primary b-radius-25"}
                  >
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
                    className={"btn btn-primary b-radius-25 btn-elxr"}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default AddNewProduct;
