import React, { useContext } from 'react';

import DatePicker from "react-datepicker";
import MultiSelect from 'react-multi-select-component';
import { subDays } from 'date-fns';

import CustomSelectItem, { customValueRenderer } from '../../ui/select/CustomSelectItem';
import FilterStyle from '../../ui/filters/FilterStyle';
import { FilterContext } from '../../../context/FilterContext';
import CustomDatePicker from '../../ui/inputs/CustomDatePicker';
import LocationInput from './LocationInput';

function RealEventFilter() {
  const {
    categoriesRealEvent,
    setCategoriesRealEvent,
    optionsRealEvent,
    startRealEvent,
    setStartRealEvent
  } = useContext(FilterContext)


  const onChangeHandler = (selected) => {

    if (selected.length > categoriesRealEvent.length) {
      const lastElement = selected.pop()
      selected.unshift(lastElement)
      setCategoriesRealEvent(selected)
    } else {
      setCategoriesRealEvent(selected)
    }

  }

  return (
    <FilterStyle className="mb-3">
      <div className="date-start ffff">
        <LocationInput />
      </div>

      <div className="date-end">
        <DatePicker
          selected={startRealEvent}
          onChange={date => setStartRealEvent(date)}
          customInput={<CustomDatePicker text="" />}
          minDate={subDays(new Date(), 1)}
          dateFormat="MMMM d, yyyy"
          withPortal
        />
      </div>
      <div className="multiselect">
        <MultiSelect
          options={optionsRealEvent}
          value={categoriesRealEvent}
          onChange={onChangeHandler}
          hasSelectAll={false}
          disableSearch={true}
          ItemRenderer={CustomSelectItem}
          overrideStrings={{
            "selectSomeItems": "Categories"
          }}
          ClearSelectedIcon={" "}
          valueRenderer={customValueRenderer}
        />
      </div>

    </FilterStyle>
  )
}

export default RealEventFilter
