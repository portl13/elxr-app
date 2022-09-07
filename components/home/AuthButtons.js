import React from 'react';
import Link from 'next/link'

const AuthButtons = () => {
    return (
      <span className="d-md-flex justify-content-end">
        <div className="d-flex align-items-center">
          <Link href="/login">
            <a className="btn btn-primary px-2 px-md-4 br-25">Sign In</a>
          </Link>
          <Link href="/signup">
            <a className="btn btn-secundary px-2 px-md-4  br-25">Sign Up</a>
          </Link>
        </div>
      </span>
    )
  }

export default AuthButtons