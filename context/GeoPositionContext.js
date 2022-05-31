import { createContext, useContext, useEffect, useState } from 'react'

export const GeoPositionContext = createContext()

const GeoPositionProvider = ({ children }) => {
  const [location, setLocation] = useState('')
  const [position, setPosition] = useState(null)

  const [errorPosition, setErrorPosition] = useState(null)

  const [date, setDate] = useState(Date.now())
  const errorMsg =
    'There was an unexpected error, make sure you have geolocation enabled'

  const addPosition = (position) => {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    })
  }

  const denegatePosition = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorPosition('Please enable Geolocation and reload the Browser.')
        break
      case error.POSITION_UNAVAILABLE:
        setErrorPosition(errorMsg)
        break
      case error.TIMEOUT:
        setErrorPosition(errorMsg)
        break
      case error.UNKNOWN_ERROR:
        setErrorPosition(errorMsg)
        break
      default:
        setErrorPosition('Please enable Geolocation and reload the Browser.')
        break
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(addPosition, denegatePosition)
    }
  }, [])

  return (
    <GeoPositionContext.Provider
      value={{
        position,
        setPosition,
        errorPosition,
        date,
        setDate,
        setLocation,
        location,
      }}
    >
      {children}
    </GeoPositionContext.Provider>
  )
}

export default GeoPositionProvider

export const usePositionMutation = () => {
  const { position, location } = useContext(GeoPositionContext)
  return { position, location }
}
