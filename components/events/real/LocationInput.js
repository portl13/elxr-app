import { FormGroup, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { useRequest } from 'ahooks';
import useIcon from '../../../hooks/useIcon'
import { faMapMarker, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';

import Axios from 'axios';
import { GeoPositionContext } from '../../../context/GeoPositionContext';

const getLocation = async (location) => {

  const { data } = await Axios.get(`/api/location?location=${location}`);

  return data;

}

const LocationInput = () => {
  const { iconElement: mark } = useIcon(faMapMarker)

  const { iconElement: spin } = useIcon(faSpinner, true)

  const { setPosition, location, setLocation } = useContext(GeoPositionContext)

  const [showOptions, setShowOptions] = useState(false)

  const { data, loading, run, mutate } = useRequest(getLocation, {
    debounceInterval: 800,
    manual: true,
  });

  const resetValue = (e) => {
    setShowOptions(true)
    setLocation("")
  }

  const onClickHandler = ({ geometry, formatted }) => {
    setLocation(formatted)
    setPosition(geometry)
    setShowOptions(false)
    mutate(null)
  }

  const onChangeHandler = (e) => {
    if (e.target.value.length > 3) run(e.target.value);
    setLocation(e.target.value)

  }

  return (
    <div className="filter-location">
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i>{mark}</i>
            </InputGroupText>
          </InputGroupAddon>
          <input
            onChange={(e) => onChangeHandler(e)}
            className="form-control"
            type="text"
            value={location}
            onClick={(e) => resetValue(e)}
            placeholder="Location" />
          <InputGroupAddon addonType="append">
            <InputGroupText>
              <i>
                {loading ? spin : ''}
              </i>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
      {(data && showOptions) && (
        <ul className="location-container">
          {data.map((location) => (
            <li
              className="location-item"
              key={location.geometry.lat}
              onClick={() => onClickHandler(location)}>{location.formatted}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LocationInput;
