import React from "react";
import dynamic from 'next/dynamic'


const  NonSsrWrapper = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
}

export default dynamic(() => Promise.resolve(NonSsrWrapper), {
    ssr: false
})
