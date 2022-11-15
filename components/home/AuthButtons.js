import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthButtons = ({ classNameContainer = "" }) => {
  const router = useRouter();

  return (
    <span className={`d-md-flex ${classNameContainer}`}>
      <div className="d-flex align-items-center">
        <Link
          href={`/login${
            router.asPath === "/" ? "" : "?next=" + router.asPath
          } `}
        >
          <a className="btn btn-auth px-2 px-md-4 br-25">Sign In</a>
        </Link>
        <Link href="/signup">
          <a className="btn btn-auth-outline px-2 px-md-4  br-25">Sign Up</a>
        </Link>
      </div>
    </span>
  );
};

export default AuthButtons;
