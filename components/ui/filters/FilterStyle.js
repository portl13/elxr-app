import styled from '@emotion/styled'

const FilterStyle = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > *:not(.react-datepicker__tab-loop):not(.location-container) {
      margin-left: 10px;
      margin-right: 10px;
    }

    .date-start {
      width: calc(50% - 30px);
    }

    .date-end {
      width: calc(50% - 30px);
    }

    .date-end button {
      outline: 0;
      width: 100% !important;
    }

    .multiselect {
      width: calc(100% - 40px);
    }
  }

  @media (min-width: 1440px) {
    .date-start,
    .date-end,
    .multiselect {
      width: calc(100% / 3 - 45px);
    }
  }

  .input-group-append {
    border-left: none;
    border-radius: 0 0.25rem 0.25rem 0;
  }

  /**Filter Location */

  .filter-location {
    position: relative;
  }
  ul.location-container {
    list-style: none;
    padding-left: 0;
    position: absolute;
    background: var(--dark-color);
    border: 1px solid #eee;
    z-index: 1;
    width: 100%;
    border-radius: 0.25rem;
    top: 50px;
  }

  li.location-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.75rem;
  }

  span.btn-inner--icon {
    width: 20px;
    height: 20px;
    overflow: hidden;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__header {
    background-color: var(--dark-color);
    border-bottom: 1px solid #474d50;
  }

  .react-datepicker__month {
    background: var(--dark-color);
  }

  .react-datepicker {
    background-color: var(--dark-color);
    border: 1px solid #474d50;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range,
  .react-datepicker__day--keyboard-selected {
    background-color: var(--primary-color);
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    color: var(--typo);
  }

  .react-datepicker__day:hover {
    background-color: var(--primary-color);
  }

  .btn {
    background-color: var(--dark-color) !important;
    color: var(--typo);
    border: 1px solid var(--typo);
    &:active {
      background-color: var(--dark-color) !important;
      color: var(--typo) !important;
      border: 1px solid var(--typo) !important;
    }
  }

  .form-control {
    background-color: transparent;
    color: var(--typo);
    border: 1px solid var(--typo);
    border-radius: 0 !important;
  }
  .form-group {
    min-width: 145px;
  }
  .input-group-prepend {
    border-radius: 0.25rem;
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group-text {
    border: 1px solid var(--typo);
    background-color: transparent;
    border-left: none;
    svg {
      width: 12px;
    }
  }

  .multi-select {
    --rmsc-main: var(--typo) !important;
    --rmsc-hover: var(--dark-color);
    --rmsc-selected: var(--dark-color) !important;
    --rmsc-border: var(--typo) !important;
    --rmsc-gray: #aaa;
    --rmsc-bg: var(--dark-color) !important;
    --rmsc-p: 10px;
    --rmsc-radius: 25px;
    --rmsc-h: 38px;

    min-width: 300px;

    .dropdown-container {
      height: 47px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .filter-location {
    .input-group-prepend,
    .form-control,
    .input-group-append {
      height: 47px;
    }
  }
`
export default FilterStyle
