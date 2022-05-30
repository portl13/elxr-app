import React, { useState, useEffect } from "react";
import { Button, Input, Alert } from "reactstrap";
import { useAlert } from "react-alert";
import { updateGroupSetting, getGroupSettings } from "../../api/group.api";
import Loader from "../../../components/loader";
import { TIMEOUT } from "../../../utils/constant";

const Setting = ({ fetchGroupDetals, id, user }) => {
  const alert = useAlert();
  const [groupSetting, setGroupSetting] = useState([]);
  const [setLoad, setLoader] = useState(true);
  const [spinLoad, setSpinLoader] = useState(false);
  const [groupSetDel, setGroupSetDet] = useState({});
  const [alertInfo, setAlertInfo] = useState(false);
  useEffect(() => {
    if (id) {
      setLoader(true);
      getGroupSettings(user, { id, nav: "group-settings" }, id)
        .then(({data:settings}) => {
          const values = { ...groupSetDel };
          settings.forEach((ele) => {
            values[ele.name] = ele.value;
          });
          setGroupSetDet(values);
          setLoader(false);
          setGroupSetting(settings);
        })
        .catch(() => setLoader(false));
    }
  }, [id]);
  const handleGroupSetting = (ele, name) => {
    const values = { ...groupSetDel };
    values[name] = ele;
    setGroupSetDet(values);
  };

  const updateDetails = () => {
    setSpinLoader(true);
    const formData = `
         fields[${groupSetting.map((d) => d.name)[0]}]=${
      Object.values(groupSetDel)[0]
    }&
         fields[${groupSetting.map((d) => d.name)[1]}]=${
      Object.values(groupSetDel)[1]
    }&
         fields[${groupSetting.map((d) => d.name)[2]}]=${
      Object.values(groupSetDel)[2]
    }&
         fields[${groupSetting.map((d) => d.name)[3]}]=${
      Object.values(groupSetDel)[3]
    }&
         fields[${groupSetting.map((d) => d.name)[4]}]=${
      Object.values(groupSetDel)[4]
    }&
         fields[${groupSetting.map((d) => d.name)[5]}]=${
      Object.values(groupSetDel)[5]
    }&
         fields[${groupSetting.map((d) => d.name)[6]}]=${
      Object.values(groupSetDel)[6]
    }
       `;
    updateGroupSetting(user, formData, id, "group-settings")
      .then(() => {
        fetchGroupDetals(id);
        setSpinLoader(false);
        setAlertInfo(true);
        setTimeout(() => setAlertInfo(false), [2000]);
      })
      .catch(() => {
        setSpinLoader(false);
        alert.error("Error occured while updating group setting", TIMEOUT);
      });
  };
  if (setLoad) return <Loader color="primary" />;
  return (
    <div className="main-wrapper manage-select-panel">
      <div className="item-body">
        {groupSetting.map((ele, index) => (
          <div key={ele.name}>
            <div className="main-heading group-header">{ele.label}</div>
            <div
              className={index === 5 || index === 6 ? "m-b35" : "bp-radio-wrap"}
            >
              {ele.description ? (
                <div className="question-panel">{ele.description}</div>
              ) : (
                ""
              )}
              {index === 5 || index === 6 ? (
                <Input
                  type="select"
                  className="custom-select-panel"
                  value={groupSetDel[ele.name]}
                  onChange={(e) => handleGroupSetting(e.target.value, ele.name)}
                >
                  {index === 5 && <option value="">Select Group Type</option>}
                  {ele.options.map((optn, i) => (
                    <option value={optn.value}>{optn.label}</option>
                  ))}
                </Input>
              ) : (
                ele.options.map((option, i) => (
                  <>
                    <div className="custom-radio">
                      <input
                        className="custom-control-input"
                        type="radio"
                        id={ele.name}
                        name={ele.name}
                        value={groupSetDel[ele.name]}
                        defaultChecked={ele.value === option.value}
                        onChange={() =>
                          handleGroupSetting(option.value, ele.name)
                        }
                      />
                      <label className="custom-control-label">
                        {option.label}
                      </label>
                    </div>
                    <div
                      dangerouslySetInnerHTML={{ __html: option.description }}
                    />
                  </>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
      <Button aria-expanded="false" onClick={() => updateDetails()}>
        Save Changes
        {spinLoad ? <Loader /> : ""}
      </Button>
      {alertInfo === true ? <Alert>Setting updated successfully</Alert> : null}
    </div>
  );
};
export default Setting;
