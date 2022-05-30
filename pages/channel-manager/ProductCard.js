import React, { useState, useEffect, useContext } from "react";
import AllProductList from "./ProductList";
import { getChannelProduct, deleteProduct } from "../../pages/api/channel.api";
import { UserContext } from "../../context/UserContext";
import { ChannelContext } from "../../context/ChannelContext";
import InfinitScroll from "react-infinite-scroll-component";
import { v4 as uuidv5 } from "uuid";
import { Spinner } from "reactstrap";
import {
  LoaderContainer,
  LoadingBtn,
} from "../../components/livefeed/livefeed.style";
import axios from "axios";
import LiveFeedCard from "../../components/livefeed/LiveFeedCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function ProductCard({ productList }) {
  const channel=useContext(ChannelContext)
  const { user } = useContext(UserContext);
  const [productResult, setProductResults] = useState();
  const [count, setCount] = useState(productList?.length);
  const [result, setResult] = useState([]);
  const [loader, setLoader] = useState(true);
  const [size, setSize] = useState(1);
  const [loadData, setLoadData] = useState(true);
  const [initialData, setInitialData] = useState(true);
  const [apiCall, setApiCall] = useState(true);
  const [spin, setSpin] = useState(false);
  const [closeModal, setCloseModal] = useState(true);
  const [products,setProducts]=useState([])
  const [quantity,setQuantity]=useState({})
  async function getActivity(page = 1) {
    await axios(process.env.bossApi + "/activity/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      params: {
        per_page: 20,
        page: page,
        user_id: user?.id,
      },
    }).then((res) => {
      setInitialData(true);
      setResult((data) => [...result, ...res.data]);
      setLoadData(false);
      if (res.data?.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    });
  }

  const loadMore = () => {
    setSize(size + 1);
    getActivity(size + 1);
  };

  const handleDelete = (childData) => {
    const actId = childData;
    axios(process.env.bossApi + `/activity/${actId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setResult(result.filter((item) => item.id !== actId));
  };

  const handlerSubmit = (e) => {
    setApiCall(true);
    e.preventDefault();
    if (contentHtml === "<p></p>\n" && !file?.length) {
      alert.error("Please add content to post.", TIMEOUT);
      return;
    }
    setPostLoad(true);
    if (file?.length) sendFiles();
    else createActivity(null);
  };

  useEffect(() => {
    if (user) {
      getActivity();
    }
  }, [user]);

  function ProductRecords() {
    getChannelProduct(user).then((res) => {
      setProductResults(res.data);
    });
  }

  useEffect(() => {
    if (user) {
      ProductRecords();
    }
  }, [user]);

  function parentDelete(childData) {
    setSpin(true);
    setCloseModal(false);
    deleteProduct(user, childData)
      .then((res) => {
        setProductResults(
          productResult.filter((item) => item.id !== childData)
        );
        setCount(count - 1);
        setCloseModal(true);
        setSpin(false);
      })
      .catch(() => console.log("error"));
  }

const addCart=(productItem)=>{
  let index=channel?.data?.findIndex(el=>el.id===productItem.id)
  
if(index>=0){
  setProducts([...products])
  channel.setData([...channel.data])
}else{
  setProducts([...products, {...productItem,quantity:1}])
  channel.setData([...channel.data, {...productItem,quantity:1}])
}
}



// useEffect(()=>{
//   localStorage.setItem('channelPriceData',JSON.stringify(products))}, [products])


  
  return (
    <>
      <div className="item-body-content">
        <div className="show-results">
          <img
            src="https://data.portl.live/wp-content/uploads/2021/03/video-icon.png"
            alt="icon"
          />
          {count >= 1 && `Showing all  ${count} results`}
        </div>

        <div className="products-panel">
          <ul>
            {productResult &&
              productResult.map((productItem) => {
                
                return (
                  <>
                    <AllProductList
                      productItem={productItem}
                      productResult={productResult}
                      parentDelete={parentDelete}
                      spin={spin}
                      setSpin={setSpin}
                      addCart={addCart}
                      //deleteModal={deleteModal}
                      //setDeleteModal={setDeleteModal}
                      id={productItem.id}
                      closeModal={closeModal}
                    />
                  </>
                );
              })}
          </ul>
        </div>
        <div className="latest-activity-panel">
          <div className="main-tag">
            <img
              src="https://data.portl.live/wp-content/uploads/2021/03/video-icon.png"
              alt="icon"
            />
            Latest Activity
          </div>
          <div className="activity-tag">
            {loadData === true ? (
              <p css={LoaderContainer}>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                Loading your updates. Please wait.
              </p>
            ) : null}
            {!loadData ? (
              <div className="d-flex flex-column flex-fill w-100">
                <InfinitScroll
                  dataLength={result.length}
                  next={() => loadMore()}
                  hasMore={true}
                  loader={
                    loader === true ? (
                      <LoadingBtn>
                        Loading ...{" "}
                        <Spinner
                          style={{ width: "1.2rem", height: "1.2rem" }}
                          color="primary"
                        />
                      </LoadingBtn>
                    ) : (
                      <p style={{ textAlign: "center" }}>No more records</p>
                    )
                  }
                >
                  {result.length
                    ? result.map((act) => (
                        <LiveFeedCard
                          key={`${act.id}-${uuidv5()}`}
                          activity={act}
                          parentCallback={handleDelete}
                          activityList={result}
                          setActivityList={setResult}
                          apiCall={apiCall}
                        />
                      ))
                    : ""}
                  {result && !result.length && (
                    <p style={{ textAlign: "center" }}>No records found</p>
                  )}
                </InfinitScroll>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
