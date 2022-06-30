import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { EditorState } from "draft-js";
import {
  getStoreDetails,
  updatePolicies,
} from "@api/channel-store.api";

import { TIMEOUT } from "@utils/constant";
import { storeStyle } from "@components/my-account/StoreStyle.style";
import Loader from "@pages/profile/loader";
import TextEditor from "@components/my-portal/TextEditor";

function Store({ innerNav, user }) {
  const alert = useAlert();
  const [store, setStore] = useState({});
  const [loader, setLoader] = useState(true);
  const [policy_tab_title, setPolicyTabTitle] = useState("");
  const [cancellation_policy, setCancelPolicy] = useState("");
  const [refund_policy, setRefundPolicy] = useState("");
  const [shipping_policy, setShippingPolicy] = useState("");
  const [shipnPoliState, setShipnPoliState] = useState(() =>
    EditorState.createEmpty()
  );
  const [refundPoliState, setRefundPoliState] = useState(() =>
    EditorState.createEmpty()
  );
  const [returnPoliState, setReturnPoliState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (user.id) {
      getStoreDetails(user)
        .then((res) => {
          setStore(res.data);
          setLoader(false);
          setPolicyTabTitle(res.data.store_tab_headings.policies);
        })
        .catch(() => setLoader(false));
    }
  }, [user]);
  const updateStorePolicies = () => {
    const formData = {
      data: {
        cancellation_policy,
        refund_policy,
        shipping_policy,
        policy_tab_title,
      },
      user_id: user.id,
    };
    updatePolicies(user, formData)
      .then(() => {
        alert.success("Store policy updated successfully.", TIMEOUT);
      })
      .catch(() => {
        alert.error(
          "Please change any value from the define fields .",
          TIMEOUT
        );
      });
  };
  const { vendor_policies } = store;
  if (loader) {
    return (
      <div style={{ textAlign: "center" }}>
        <Loader color="primary" />
      </div>
    );
  }
  return (
    <section css={storeStyle }>
      <h2 className="store-title">Policies Setting</h2>
      <div className="store-panel">
        <label className="store-panel-label">Policy Tab Label</label>
        <input
          className="store-panel-input"
          type="text"
          value={policy_tab_title}
          onChange={(e) => setPolicyTabTitle(e.target.value)}
        />
      </div>
      <div className="wcfm-descp-panel">
        <label>{vendor_policies.shipping_policy_heading}</label>
        <div className="content-panel">
          <TextEditor
            editorState={shipnPoliState}
            setEditorState={setShipnPoliState}
            setContentHtml={setShippingPolicy}
            editorVal={vendor_policies.shipping_policy}
          />
        </div>
      </div>
      <div className="wcfm-descp-panel">
        <label>{vendor_policies.refund_policy_heading}</label>
        <div className="content-panel">
          <TextEditor
            editorState={refundPoliState}
            setEditorState={setRefundPoliState}
            setContentHtml={setRefundPolicy}
            editorVal={vendor_policies.refund_policy}
          />
        </div>
      </div>
      <div className="wcfm-descp-panel">
        <label>{vendor_policies.cancellation_policy_heading}</label>
        <div className="content-panel">
          <TextEditor
            editorState={returnPoliState}
            setEditorState={setReturnPoliState}
            setContentHtml={setCancelPolicy}
            editorVal={vendor_policies.cancellation_policy}
          />
        </div>
      </div>
      <div className="button-tab">
        <button onClick={() => updateStorePolicies()}>SAVE</button>
      </div>
    </section>
  );
}
export default Store;
