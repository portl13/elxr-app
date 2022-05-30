import React from 'react';
import Link from 'next/link'

const AuthButtons = () => {
    return (
      <span className="d-none d-md-flex justify-content-end">
        <div className="d-flex align-items-center">
          <Link href="/login">
            <a className="btn btn-primary">Sign In</a>
          </Link>
          <Link href="/signup">
            <a className="btn btn-secundary">Sign Up</a>
          </Link>
        </div>
      </span>
    )
  }

export default AuthButtons