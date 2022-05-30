import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import Loader from '../../components/loader';

export default function Notifications({ handleUpdateSetting, tabData, setLoad }) {
  const [emailData, setEmailData] = useState([]);
  useEffect(() => {
    setEmailData(tabData);
  }, [tabData]);

  const handleValueChange = (value, index) => {
    let formData = [...emailData]
    formData[index].value = value
    setEmailData(formData);
  }

  const createFormData = () => {
    let str = ''
    emailData.forEach((e) => {
      if (e.name)
        str += `fields[${e.name}]=${e.value}&`
    })
    handleUpdateSetting(str)
  }
  return (
    <div className='flex' className='emailPanel'>
      <h2>Email Preferences</h2>
      <p style={{ color: 'grey' }}>
        Choose your email notification preferences.
      </p>
      <div className='feedDiv'>
        <div className='topDistance'>
          {emailData.map((data, index) => (
            <div>
              <div className='activityFeedDiv'>
                <div className='activityFeedText'>{data.headline}</div>
                {!data.name ? <><div className='activityChoose'>Yes</div>
                  <div className='activityChoose margin-zero'>No</div>
                </> : ""}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className='activityOptions'>{data.label}</div>
                {data.name ? <div className='radioButtonDiv'>
                  <input type='radio' style={{ marginRight: '45px' }}
                    checked={data.value === "yes"} onChange={() => handleValueChange("yes", index)}>
                    {data.options?.Yes}
                  </input>
                  <input type='radio' className='radioOption ' checked={data.value === "no"}
                    onChange={() => handleValueChange("no", index)}>
                    {data.options?.No}
                  </input>
                </div> : ""}
              </div>
            </div>
          )
            // )
          )}
        </div>
      </div>
      <div className='flex'>
        <Button
          className='saveChangesButton'
          color='primary'
          onClick={() => createFormData()}
        >
          Save Changes {setLoad ? <Loader /> : ''}
        </Button>
      </div>
    </div>
  );
}