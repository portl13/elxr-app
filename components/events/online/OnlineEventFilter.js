import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import { useContext, useState } from "react";

import FilterStyle from "../../ui/filters/FilterStyle";
import { FilterContext } from "../../../context/FilterContext";
import CustomSelectItem, { customValueRenderer } from "../../ui/select/CustomSelectItem";
import MultiSelect from "react-multi-select-component";
import CustomDatePicker from "../../ui/inputs/CustomDatePicker";

const OnlineEventFilter = () => {
    const {
        optionsOnlineEvent,
        categoriesOnlineEvent,
        setCategoriesOnlineEvent,
        setStartEvent,
        setEndEvent
    } = useContext(FilterContext);

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const onChangeHandler = (selected) => {
        if (selected.length > categoriesOnlineEvent.length) {
            const lastElement = selected.pop()
            selected.unshift(lastElement)
            setCategoriesOnlineEvent(selected)
        } else {
            setCategoriesOnlineEvent(selected)
        }

    }

    const onChangeStartDate = (date) => {
        setStartDate(date)
        setStartEvent(date)
    }
    const onChangeEndDate = (date) => {
        setEndDate(date)
        setEndEvent(date)
    }

    return (
        <FilterStyle className="mb-3">
            <div className="date-start">
                <DatePicker
                    selected={startDate}
                    onChange={date => onChangeStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    customInput={<CustomDatePicker text="Start:" />}
                    dateFormat="MMMM d, yyyy"
                    minDate={subDays(new Date(), 1)}
                    withPortal
                />
            </div>

            <div className="date-end">
                <DatePicker
                    selected={endDate}
                    onChange={date => onChangeEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    customInput={<CustomDatePicker text="End:" />}
                    dateFormat="MMMM d, yyyy"
                    withPortal
                />
            </div>

            <div className="multiselect">
                <MultiSelect
                    options={optionsOnlineEvent}
                    value={categoriesOnlineEvent}
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
    );
}

export default OnlineEventFilter;
