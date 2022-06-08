import React, { useState, useEffect } from 'react'
import WalletList from '@components/my-wallet/WalletList'
import WalletTopup from '@pages/my-account/WalletTopup'
import WalletTransfer from '@pages/my-account/WalletTransfer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faListAlt,
  faList,
  faPlusCircle,
  faRandom,
  faBars,
} from '@fortawesome/free-solid-svg-icons'
import {
  getBalance,
  getTransaction,
  transferAmount,
} from '@api/my-account/wallet.api'
import { Spinner } from 'reactstrap'
import { myWalletStyle } from '@components/my-account/MyWallet.style'
import BottomSheet from '@components/my-portal/BottomSheetChannelMannager'
import { WALLET_SUB_NAV } from '@utils/constant'
import { useRouter } from 'next/router'

function Wallet({ user, handleRedirect, innerNav }) {
  const router = useRouter()
  const [status, setStatus] = useState(innerNav)
  const [balance, setBalance] = useState()
  const [transactions, setTransactions] = useState()
  const [load, setLoad] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getWalletBalance()
    getTransactionList()
  }, [])

  function getWalletBalance() {
    getBalance(user).then((res) => setBalance(res.data.data))
  }

  function getTransactionList() {
    getTransaction(user).then((res) => setTransactions(res.data.data))
  }

  function submit(userId, amount, note) {
    setLoad(true)
    const formData = {
      transfer_user_id: parseInt(userId),
      transfer_amount: parseFloat(amount),
      transfer_note: note,
    }
    transferAmount(user, formData).then((res) => {
      setLoad(false)
      setBalance()
      getWalletBalance()
      getTransactionList()
      setUserId('')
      setAmount('')
      setNote('')
      setSuccessMsg(true)
      setTimeout(() => setSuccessMsg(false), [1500])
    })
  
  }

  function walletNavigate(root, id = false) {
    setOpen(!open)
    if (id === "transactions" || id === "topup" || id === "transfer") {
      setStatus(id)
      router.push(`/my-account?tab=${root}&nav=${id}`)
    }
    if (id === "withdraw") {
      setStatus("withdrawal")
      router.push(`/my-account?tab=wallet-withdrawl&nav=${id}`)
    }
    if (id === "wallet-transaction") {
      setStatus('transact')
      router.push(`/my-account?tab=${id}`)
    }
  }

  return (
    <>
      <section css={myWalletStyle}>
        <h3 className="d-flex flex-row justify-content-between">
          <div>My Wallet</div>
          <span 
          onClick={()=>setOpen(!open)}
          className="wallet-button">
            <FontAwesomeIcon icon={faBars} />
          </span>
        </h3>
        <div className="my-wallet-panel mt-4">
          <div className="woo-wallet-sidebar">
            <ul>
              <li
                className={status === 'transactions' ? 'active' : ''}
                onClick={() => {
                  setStatus('transactions')
                  handleRedirect('my-wallet', 'transactions')
                }}
              >
                <span className="wallet-nav">My Wallet</span>
              </li>
              <li
                className={status === 'topup' ? 'active' : ''}
                onClick={() => {
                  setStatus('topup')
                  handleRedirect('my-wallet', 'topup')
                }}
              >
                <span className="wallet-nav">
                  <FontAwesomeIcon icon={faPlusCircle} /> 
                  Wallet topup
                </span>
              </li>
              <li
                className={status === 'transfer' ? 'active' : ''}
                onClick={() => {
                  setStatus('transfer')
                  handleRedirect('my-wallet', 'transfer')
                }}
              >
                <span className="wallet-nav">
                  <FontAwesomeIcon icon={faRandom} />
                  Wallet transfer
                </span>
              </li>
              <li
                className={status === 'transact' ? 'active' : ''}
                onClick={() => {
                  setStatus('transact')
                  handleRedirect('wallet-transaction')
                }}
              >
                <span className="wallet-nav">
                  <FontAwesomeIcon icon={faList} />
                  Transactions
                </span>
              </li>
              <li
                className={status === 'withdrawal' ? 'active' : ''}
                onClick={() => {
                  setStatus('withdrawal')
                  handleRedirect('wallet-withdrawl', 'withdraw')
                }}
              >
                <span className="wallet-nav">
                  <FontAwesomeIcon icon={faListAlt} />
                  Withdrawal
                </span>
              </li>
            </ul>
          </div>
          <div className="woo-wallet-content">
            <div className="main-heading">
              <span className="wallet-nav">Balance</span>
              {!balance && (
                <Spinner
                  style={{ width: '1.2rem', height: '1.2rem' }}
                  color="primary"
                />
              )}
              {balance && <span>$ {balance}</span>}
            </div>
            {status === 'transactions' && !transactions && (
              <Spinner
                style={{ width: '1.2rem', height: '1.2rem' }}
                color="primary"
              />
            )}
            {status === 'transactions' && transactions && (
              <WalletList result={transactions} />
            )}
            {status === 'topup' && <WalletTopup />}
            {status === 'transfer' && (
              <WalletTransfer
                load={load}
                submit={submit}
                successMsg={successMsg}
                user={user}
                balance={balance}
                amount={amount}
                setAmount={setAmount}
                note={note}
                setNote={setNote}
                userId={userId}
                setUserId={setUserId}
              />
            )}
          </div>
        </div>
      </section>
      <BottomSheet
        handleRedirect={walletNavigate}
        innerNav={status}
        open={open}
        setOpen={setOpen}
        title={'My Wallet'}
        routers={WALLET_SUB_NAV}
        type="my-wallet"
      />
    </>
  )
}
export default Wallet
