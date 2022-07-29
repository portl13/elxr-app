import React from 'react'
import { Spinner } from 'reactstrap'

export default function SpinnerLoader({
  width = '3.2rem',
  height = '3.2rem',
  color = 'primary',
  pd="p-5"
}) {
  return (
    <div className={`d-flex justify-content-center align-items-center  w-100 ${pd} `}>
      <Spinner style={{ width, height }} color={color} />
    </div>
  )
}
