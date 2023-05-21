import React, { useState, useEffect, useContext } from "react"
import Head from "next/head"
import LayoutAuth from "@components/layout/LayoutAuth"
import Header from "@components/layout/Header"
import { BackLink } from "@components/ui/auth/auth.style"
import { Form } from "reactstrap"

import { useFormik } from "formik"
import * as Yup from "yup"
import { getProductDetails } from "@api/channel.api"
import { UserContext } from "@context/UserContext"
import Router, { useRouter } from "next/router"
import InputDashForm from "@components/shared/form/InputDashForm"
import InputDashCurrency from "@components/shared/form/InputDashCurrency"
import axios from "axios"
import { defaultData } from "@utils/constant"
import { genericFetchPut } from "@request/dashboard"
import { SignupCreatorText } from "@components/signup/SingUpStyle"
import { css } from "@emotion/core"
import InputDashCheck from "@components/shared/form/InputDashCheck"

const productUrl = process.env.apiURl + "/product"

function subscriptionSettings() {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const token = user?.token
  const [loading, setLoading] = useState(true)
  const [productID, setProductID] = useState(null)

  const form = useFormik({
    initialValues: {
      name: "",
      sale_price: "",
      description: "",
      show_subscription: false,
    },
    onSubmit: (values) => submitSubscription(values),
    validationSchema: Yup.object({
      name: Yup.string().required("Title is Required"),
      description: Yup.string().required("Short Description is Required"),
    }),
  })

  const getSubscription = (user) => {
    getProductDetails(user, {
      page: 1,
      per_page: 1,
      status: "any",
      type: "subscription",
    })
      .then(({ data }) => {
        if (data.length > 0) {
          let subscription = data[0]
          setProductID(subscription.id)
          form.setFieldValue("name", subscription.name)
          form.setFieldValue("sale_price", subscription.sale_price)
          form.setFieldValue("description", subscription.description)
        }
      })
      .catch(() => {
        console.log("error")
      })
      .finally(() => setLoading(false))
  }

  const submitSubscription = async (data) => {
    setLoading(true)
    const updateData = {
      ...defaultData,
      ...data,
      id: productID,
      regular_price: String(data.sale_price),
      sale_price: String(data.sale_price),
      product_type: "subscription",
    }

    try {
      await genericFetchPut(productUrl, updateData, token)
      await router.replace("/studio")
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return
    getSubscription(user)
  }, [user])

  const setPrice = (value, field) => {
    if (typeof value === "string") {
      form.setFieldValue(field, value)
      return
    }
    form.setFieldValue(field, 0)
  }

  return (
    <LayoutAuth image={true}>
      <Head>
        <title>Subscription Setting</title>
      </Head>
      <Header actionButton={false} />
      <SignupCreatorText className="mb-0 line-height-1 mt-4">
        Please fill in the Subscription Details for your Creator Page.
      </SignupCreatorText>
      <SignupCreatorText className="mb-0 line-height-1 mt-2">
        The Short Description let's your community no what special access and
        perk{" "}
      </SignupCreatorText>
      <SignupCreatorText className="mb-0 line-height-1 mt-2">
        {" "}
        are included when they purchase your Subscription.
      </SignupCreatorText>
      <div className="form-section m-auto ">
        <BackLink></BackLink>
        <div
          className="skip-button font-color"
          onClick={() => Router.push("/")}
        >
          Skip
        </div>
        <Form onSubmit={form.handleSubmit}>
          <div className="inner-form">
            <div className="mb-4 ">
              <InputDashForm
                name={"name"}
                type={"text"}
                label={"Title"}
                value={form.values.name}
                onChange={form.handleChange}
                required={true}
                error={form.errors.name}
                touched={form.touched.name}
              />
            </div>

            <div className="mb-4">
              <InputDashCurrency
                label="Monthly Price ($)"
                name="sale_price"
                value={form.values.sale_price}
                onChange={setPrice}
                errors={form.errors.sale_price}
                touched={form.touched.sale_price}
                required={true}
              />
            </div>

            <div className="mb-4">
              <InputDashForm
                name={"description"}
                type={"textarea"}
                label={"Short Description"}
                value={form.values.description}
                onChange={form.handleChange}
                required={true}
                error={form.errors.description}
                touched={form.touched.description}
              />
            </div>
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: 70px 1fr;
              margin-bottom: 10px;
              & .custom-control-label::before {
                width: 2.25rem;
                height: 2.25rem;
              }
              & .custom-control-label::after {
                width: 2.25rem;
                height: 2.25rem;
              }
            `}
          >
            <InputDashCheck
              name={"show_subscription"}
              label={""}
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
          <button disabled={loading} className="btn btn-primary" type="submit">
            {loading ? "Loading" : "Save"}
          </button>
        </Form>
      </div>
    </LayoutAuth>
  )
}

export default subscriptionSettings
