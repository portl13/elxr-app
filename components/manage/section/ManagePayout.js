import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { genericFetch, genericFetchPost } from "@request/dashboard";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputDashForm from "@components/shared/form/InputDashForm";
import BlockUi from "@components/ui/blockui/BlockUi";
import { useAlert } from "react-alert";
import { TIMEOUT } from "@utils/constant";
import axios from "axios";

const url = `${process.env.apiURl}/channel/payment`;

function ManagePayout() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const token = user?.token;
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      user_id: "",
      method: "paypal",
      email: "",
    },
    onSubmit: (values) => savePaymentMethod(values),
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
    }),
  });

  const savePaymentMethod = async (values) => {
    setIsLoading(true);
    try {
      await genericFetchPost(url, token, values);
    } catch (e) {
      if (e.response.data.code === "channel_not_update") {
        alert.info("has not updated the email", TIMEOUT);
        return;
      }
      alert.error(e.message, TIMEOUT);
    } finally {
      setIsLoading(false);
    }
  };

  const { data } = useSWR(
    token ? [`${url}?user_id=${user.id}`, token] : null,
    genericFetch
  );

  useEffect(() => {
    if (user) {
      formik.setFieldValue("user_id", user.id);
    }
  }, [user]);

  useEffect(() => {
    if (data && data?.method === "paypal" && "paypal" in data) {
      formik.setFieldValue("email", data.paypal.email);
    }
  }, [data]);

  return (
    <div className={"container container-80 position-relative"}>
      {isLoading && <BlockUi color={"var(--primary-color)"} />}
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8">
          <h4 className="list-nav-item-title pl-0">Payout Method</h4>
        </div>
        <div className="col-12 col-md-8 mt-3">
          <h3>Paypal</h3>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <form
          className={"col-12 col-md-8  mt-3"}
          onSubmit={formik.handleSubmit}
        >
          <InputDashForm
            name={"email"}
            label={"Email Paypal "}
            required={true}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <div className="d-flex justify-content-end">
            <button className={"btn btn-create mt-3"}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagePayout;
