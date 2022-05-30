import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBraille, faClock, faLongArrowAltLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getBalance, getTransactionList } from "../api/my-account/wallet.api";
import { UserContext } from "../../context/UserContext";
import moment from "moment";
import DatePicker from "react-datepicker";
import InfinitScroll from "react-infinite-scroll-component";
import { Spinner } from "reactstrap";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";
import TransactionCard from "./TransactionCard";
import { LoaderContainer } from "../../components/livefeed/livefeed.style";



function WalletTransactions() {
  const alert = useAlert();
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState([]);
  const [length, setLength] = useState(0);
  const [loader, setLoader] = useState(true);
  const [size, setSize] = useState(1);
  const [loadData, setLoadData] = useState(true);
  const [value, onChange] = useState(new Date());
  const [page, setPage] = useState(10);
  const [start_date, setStartDate] = useState(null);
  const [load, setLoad] = useState(false);

  

  useEffect(() => {
    getWalletBalance();
    // getTransactionList();
  }, []);

  function getWalletBalance() {
    getBalance(user).then((res) => {
      setBalance(res.data.data);

    })
  }
  useEffect(() => {
    getTransactions()
  }, [start_date])


  const getTransactions = () => {
    const formData = {
      // page: page,
      // per_page: 20,
      date: start_date

    }
    getTransactionList(user, formData).then((res) => {
      setTransactions(res.data.data)
      setLoad(true);
      setLength(res.data.data.length);
      setLoadData(false);
      if (res.data.data.length === 0) {
        setLoader(false);
      } else {
        setLoader(true);
      }
    })
      .catch((error) => {
        console.log("error", error);
        setLoader(false)
      });
  }
  function Clear() {
    setStartDate("");
  }
  const getDateValue = (e) => {
    var start = moment(e).format("YYYY-MM-DD");
    setStartDate(moment(start).format("YYYY-MM-DD"));
  }


  // const loadMore = () => {
  //   setSize(size + 1);
  //   getTransactionList(size + 1);
  // };

  return (
    <>
      <div className="transactions-wrapper">
        <div className="current-balance-panel">
          Current balance : ${balance}
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </div>
        <div className="search-panel">
          <div className="entries-panel">
            Show
            <select>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>

            entries
          </div>
          <div className="search-tag">
            Search by date:
            <FontAwesomeIcon icon={faSearch} />
            <DatePicker
              value={start_date}
              onChange={(date) => getDateValue(date)}
              isClearable
              placeholderText="yyyy-mm-dd"
              maxDate={moment().toDate()}
            />
           {start_date ? 
           ( 
           <button onClick={() => Clear()} > +</button>
           ): ''}
          </div>
        </div>

        <div className="wcfm-datatable">
          <div className="row-head">
            <div className="credit-col-1">ID</div>
            <div className="credit-col-2">Credit</div>
            <div className="credit-col-3">Debit</div>
            <div className="credit-col-4">Details</div>
            <div className="credit-col-5">Date</div>
          </div>
        </div>
        {/* {loadData === false ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            Loading Transaction List. Please wait.
          </p>
        ) : null}
        {length === 0 && loadData ? (
          <p css={LoaderContainer}>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            No Results.{" "}
          </p>
        ) : null} */}
        {transactions && transactions.map((item) => {
          return (
            <TransactionCard transactions={item} />
          )
        })

        }
        {!load && (
          <Spinner
            style={{ width: "1.2rem", height: "1.2rem" }}
            color="primary"
          />
        )}
        {transactions.length === 0 && (
          <span className="no-match-found"> No matching records found</span>
        )

        }
        {length === 1 ? (
          <p className="text-left viewing-ui">Showing {length} entries</p>
        ) : length > 1 ? (
          <p className="text-left viewing-ui">
            Showing 1 to {length} of {length} entries
          </p>
        ) : null}
      </div>
    </>
  );
}
export default WalletTransactions;
