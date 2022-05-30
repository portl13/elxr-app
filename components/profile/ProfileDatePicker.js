import React from 'react';
import { midleInputStyle } from '../ui/auth/auth.style';
import DatePicker from "react-datepicker";
import { useField, useFormikContext } from 'formik';

const ProfileDatePicker = ({ ...props }) => {

  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <DatePicker
      css={midleInputStyle}
      placeholder="Date of Birth"
      className="form-control"
      type="text"
      placeholderText="Date of Birth"
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={val => {
        setFieldValue(field.name, val);
      }}
      peekNextMonth
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="MMMM d, yyyy"
      withPortal
    />
  );
}

export default ProfileDatePicker;
