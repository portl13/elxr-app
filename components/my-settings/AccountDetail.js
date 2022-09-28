import React, { useEffect, useState, useContext } from "react";
import { getAccountDetails } from "@api/account.api";
import { TIMEOUT } from "@utils/constant";
import { UserContext } from "@context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Router from "next/router";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  faCheck,
  faTimesCircle,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { addAccountDetails, updatePassword } from "@api/account.api";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Loader from "@components/loader";
import { woocommerceFieldsStyle } from "@components/my-account/WoocommerceFiels.style";
import { useFormik } from "formik";
import InputDashForm from "@components/shared/form/InputDashForm";
import BlockUi from "@components/ui/blockui/BlockUi";

function AccountDetail() {
  const { user } = useContext(UserContext);
  const alert = useAlert();
  const [showLoaders, setShowLoaders] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      display_name: "",
      email: "",
    },
    onSubmit: (values) => setUpdateValue(values),
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name required"),
      last_name: Yup.string().required("Last name required"),
      display_name: Yup.string().required("Display name required"),
      email: Yup.string().email().required("Email required"),
    }),
  });

  const formikPass = useFormik({
    initialValues: {
      password_current: "",
      password_1: "",
      password_2: "",
    },
    onSubmit: (values) => onSubmit(values),
    validationSchema: Yup.object({
      password_current: Yup.string().required("Current password ins required"),
      password_1: Yup.string().required("New password required"),
      password_2: Yup.string().oneOf(
        [Yup.ref("password_1")],
        "Passwords do not match"
      ),
    }),
  });

  function AccountDetails() {
    getAccountDetails(user).then((res) => {
      formik.setValues(res.data.data);
    });
  }

  useEffect(() => {
    AccountDetails();
  }, []);

  const setUpdateValue = (formData) => {
    setShowLoaders(true);
    addAccountDetails(user, formData).then((res) => {
      alert.success("Account details changed successfully.", TIMEOUT);
      //Router.push("/my-account?tab=dashboard");
      setShowLoaders(false);
    });
  };

  const onSubmit = async (formData) => {
    setShowLoaders(true);
    updatePassword(user, formData)
      .then((res) => {
        alert.success("Password changed successfully.", TIMEOUT);
        setShowLoaders(false);
        //Router.push("/my-account?tab=dashboard");
      })
      .catch((err) => {
        alert.error(err.response.data.message, TIMEOUT);
        setShowLoaders(false);
      });
  };
  return (
    <>
      <div className={"container container-80"}>
        {showLoaders && <BlockUi color="var(--primary-color)" />}
        <form onSubmit={formik.handleSubmit} className="row">
          <h3 className="list-nav-item-title pl-4 mb-4">Login Information</h3>
          <div className="col-12 mb-4">
            <InputDashForm
              value={formik.values.first_name}
              label={"First name"}
              required={true}
              error={formik.errors.first_name}
              touched={formik.touched.first_name}
              name={"first_name"}
              onChange={formik.handleChange}
              type={"text"}
            />
          </div>
          <div className="col-12 mb-4">
            <InputDashForm
              value={formik.values.last_name}
              label={"Last name"}
              required={true}
              error={formik.errors.last_name}
              touched={formik.touched.last_name}
              name={"last_name"}
              onChange={formik.handleChange}
              type={"text"}
            />
          </div>
          <div className="col-12 mb-4">
            <InputDashForm
              value={formik.values.display_name}
              label={"Display name"}
              required={true}
              error={formik.errors.display_name}
              touched={formik.touched.display_name}
              name={"display_name"}
              onChange={formik.handleChange}
              type={"text"}
            />
            <span className="text-tag mt-2 d-inline-block pl-3">
              This will be how your name will be displayed in the account
              section and in reviews
            </span>
          </div>
          <div className="col-12 mb-4">
            <InputDashForm
              value={formik.values.email}
              label={"Email address"}
              required={true}
              error={formik.errors.email}
              touched={formik.touched.email}
              name={"email"}
              onChange={formik.handleChange}
              type={"email"}
            />
          </div>
          <div className={"col-12 d-flex justify-content-end"}>
            <button type={"submit"} className={"btn btn-create px-5"}>Save Changes</button>
          </div>
        </form>
        <form onSubmit={formikPass.handleSubmit} className="row">
          <h3 className="list-nav-item-title pl-4 mb-4">Password change</h3>
          <div className="col-12 mb-4">
            <InputDashForm
              value={formikPass.values.password_current}
              label={"Current password (leave blank to leave unchanged)"}
              required={true}
              error={formikPass.errors.password_current}
              touched={formikPass.touched.password_current}
              name={"password_current"}
              onChange={formikPass.handleChange}
              type={"text"}
            />
          </div>{" "}
          <div className="col-12 mb-4">
            <InputDashForm
              value={formikPass.values.password_1}
              label={"New password (leave blank to leave unchanged)"}
              required={true}
              error={formikPass.errors.password_1}
              touched={formikPass.touched.password_1}
              name={"password_1"}
              onChange={formikPass.handleChange}
              type={"text"}
            />
          </div>{" "}
          <div className="col-12 mb-4">
            <InputDashForm
              value={formikPass.values.password_2}
              label={"Confirm new password"}
              required={true}
              error={formikPass.errors.password_2}
              touched={formikPass.touched.password_2}
              name={"password_2"}
              onChange={formikPass.handleChange}
              type={"text"}
            />
          </div>
          <div className={"col-12 d-flex justify-content-end"}>
            <button type={"submit"} className={"btn btn-create px-5"}>Change Password</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AccountDetail;
