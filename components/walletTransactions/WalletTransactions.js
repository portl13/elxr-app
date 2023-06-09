import React, { useEffect, useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { getBalance, getTransactionList } from '@api/my-account/wallet.api'
import { UserContext } from '@context/UserContext'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import { Spinner } from 'reactstrap'
import { wcfmStyle } from '@components/my-account/Wcfm.style'
import TransactionCard from '@components/my-wallet/TransactionCard'
import MyBalance from "@components/my-wallet/MyBalance";

function WalletTransactions() {
  const { user } = useContext(UserContext)
  const [balance, setBalance] = useState()
  const [transactions, setTransactions] = useState([])
  const [length, setLength] = useState(0)
  const [loader, setLoader] = useState(true)
  const [size, setSize] = useState(1)
  const [loadData, setLoadData] = useState(true)
  const [value, onChange] = useState(new Date())
  const [page, setPage] = useState(10)
  const [start_date, setStartDate] = useState(null)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    getWalletBalance()
    // getTransactionList();
  }, [])

  function getWalletBalance() {
    getBalance(user).then((res) => {
      setBalance(res.data.data)
    })
  }
  useEffect(() => {
    getTransactions()
  }, [start_date])

  const getTransactions = () => {
    const formData = {
      // page: page,
      // per_page: 20,
      date: start_date,
    }
    getTransactionList(user, formData)
      .then((res) => {
        setTransactions(res.data.data)
        setLoad(true)
        setLength(res.data.data.length)
        setLoadData(false)
        if (res.data.data.length === 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }
      })
      .catch((error) => {
        console.log('error', error)
        setLoader(false)
      })
  }
  function Clear() {
    setStartDate('')
  }
  const getDateValue = (e) => {
    var start = moment(e).format('YYYY-MM-DD')
    setStartDate(moment(start).format('YYYY-MM-DD'))
  }

  // const loadMore = () => {
  //   setSize(size + 1);
  //   getTransactionList(size + 1);
  // };

  return (
    <section css={wcfmStyle}>
      <div className="transactions-wrapper">
      <MyBalance />
        <div className="current-balance-panel mb-3">
          Current balance : ${balance}
          <FontAwesomeIcon  icon={faLongArrowAltLeft} />
        </div>
        <div className="search-panel ">
          <div className="entries-panel">
            Show
            <select className='border-0'>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
            entries
          </div>
          <div className="search-tag">
            <span>Search by date:</span>
            <span className="search-date ">
              <FontAwesomeIcon icon={faSearch} />
              <DatePicker
              className='rounded-pill'
                value={start_date}
                onChange={(date) => getDateValue(date)}
                isClearable
                placeholderText="yyyy-mm-dd"
                maxDate={moment().toDate()}
              />
            </span>
            {start_date ? <button onClick={() => Clear()}> +</button> : ''}
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
        {transactions &&
          transactions.map((item) => {
            return (
              <TransactionCard key={item.transaction_id} transactions={item} />
            )
          })}
        {!load && (
          <Spinner
            style={{ width: '1.2rem', height: '1.2rem' }}
            color="primary"
          />
        )}
        {transactions.length === 0 && (
          <span className="no-match-found"> No matching records found</span>
        )}
        {length === 1 ? (
          <p className="text-left viewing-ui">Showing {length} entries</p>
        ) : length > 1 ? (
          <p className="text-left viewing-ui">
            Showing 1 to {length} of {length} entries
          </p>
        ) : null}
      </div>
    </section>
  )
}
export default WalletTransactions
