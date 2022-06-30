import React from 'react'
import { Spinner } from 'reactstrap'

export default function SpinnerLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center p-5 w-100">
      <Spinner style={{ width: '3.2rem', height: '3.2rem' }} color="primary" />
    </div>
  )
}
