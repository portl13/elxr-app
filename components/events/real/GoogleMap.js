import React from "react";
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { MapWrapper } from "./map.styles"

const API_KEY = "AIzaSyCwYpDxBUNoEIenWbEf-ye7p5XCYMJ84BM"
const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%'
}

export const MapContainer = (props) => {
    const { name, location } = props;
    return (

        <MapWrapper>
            {!name ? "" : <Map google={props.google}
                containerStyle={containerStyle}
                initialCenter={{
                    lat: location.latitude,
                    lng: location.longitude
                }}
                zoom={16}>
                <Marker
                    title={name}
                    name={name}
                    position={{ lat: location.latitude, lng: location.longitude }} />
            </Map>}
        </MapWrapper>
    );
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)
