import React, { useState, useEffect, useContext } from "react";
import {
  Button} from 'reactstrap';
import ProductCard from "./ProductCard";
import AboutCard from "./AboutCard";
import PolicyCard from "./PolicyCard";
import Follower from "./Follower";
import { getChannelProduct, getChannelPolicy, getChannelFollowers, getChannel } from "../../pages/api/channel.api";
import { UserContext } from "../../context/UserContext";

function ChannelProduct() {
  const { user } = useContext(UserContext);
  const [tab, setTab] = useState("products");
  const [productList, setProductResult] = useState();
  const [channelAbout, setAbout] = useState();
  const [channelPolicy, setChannelPolicy] = useState();
  const [channelFollowers, setFollowers] = useState();

  

const formData = {
  user_id: user?.id,
}

  function ProductDetails() {
    getChannelProduct(user).then((res) =>{
      setProductResult(res.data)      
    })
  }
  
  useEffect(() =>{
    if(user){
      ProductDetails()
    }
  }, [user])

  function ChannelAbout() {
    getChannel(user).then((res) =>{
      setAbout(res.data);
    })
  }

  useEffect(() =>{
    if(user){
      ChannelAbout()
    }
  }, [user])

function ChannelPolicy() {
  getChannelPolicy(user, formData).then((res) =>{
    setChannelPolicy(res.data);
  })
}

useEffect(() =>{
  if(user){
    ChannelPolicy()
  }
}, [user])

function ChannelFollowers() {
  getChannelFollowers(user).then((res) => {
    setFollowers(res.data.data)
  })
}

useEffect(() => {
  if (user) {
    ChannelFollowers()
  }
}, [user])

  return (
    <>
    <div className="itemBody">
            <div className="item-body-inner">
              <div className="SubNav">
                <ul>
                  <li className={tab === "products" && "active"}>
                    <Button
                      type="button"
                       onClick={()=>setTab("products")}
                    > {channelAbout?.store_tab_headings.products}</Button>
                  </li>
                  <li className={tab === "about" && "active"}>
                    <Button
                      type="button"
                      onClick={()=>setTab("about")}
                    >  {channelAbout?.store_tab_headings.about}</Button>
                  </li>
                  <li className={tab === "policies" && "active"}>
                    <Button
                      type="button"
                      onClick={()=>setTab("policies")}
                    >{channelAbout?.store_tab_headings.policies}</Button>
                  </li>
                  <li className={tab === "followers" && "active"}>
                    <Button
                      type="button"
                      onClick={()=>setTab("followers")}
                    > <span dangerouslySetInnerHTML={{__html:channelAbout?.store_tab_headings.followers}}></span> </Button>
                 
                  </li>
                </ul>
              </div>
              {(tab === "products" && productList) && <ProductCard productList={productList}/>}
              {(tab === "about" && channelAbout) && <AboutCard channelAbout={channelAbout}/>}
              {(tab === "policies" && channelPolicy) && <PolicyCard channelPolicy={channelPolicy}/>}
              {(tab === "followers" && channelFollowers) && <Follower channelFollowers={channelFollowers} />}

            </div>
          </div>
    </>
  );
}

export default ChannelProduct;