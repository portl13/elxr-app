import React, { useEffect, useState } from 'react'
import { myWalletStyle } from '@components/my-account/MyWallet.style'
import { getBalance, getTransaction } from '@api/my-account/wallet.api'
import { Spinner } from 'reactstrap'
import WalletList from '@pages/my-account/WalletList'
import WalletTopup from '@pages/my-account/WalletTopup'
import WalletTransfer from '@pages/my-account/WalletTransfer'
import WalletTransactions from '@pages/my-account/WalletTransactions'
import WalletWithdrawl from '@pages/my-account/WalletWithdrawl'

function MyWalletTabs(props) {
  const { tab, user } = props
  const [balance, setBalance] = useState()
  const [transactions, setTransactions] = useState()
  const [load, setLoad] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [userId, setUserId] = useState('')

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
  return (
    <section css={myWalletStyle} className="w-100">
      <div className="main-container-tag bg-black bd-radius">
        <div className="wcfm-collapse bsdatasection w-100 my-wallet-panel">
          <div className="woo-wallet-content">
            <div className="d-flex justify-content-end pb-4">
              {!balance && (
                <Spinner
                  style={{ width: '1.2rem', height: '1.2rem' }}
                  color="primary"
                />
              )}
              {balance && (
                <>
                  <span className="d-inline mr-2">My Balance</span>
                  <span>$ {balance}</span>
                </>
              )}
            </div>

            {tab === 'transactions' && !transactions && (
              <Spinner
                style={{ width: '1.2rem', height: '1.2rem' }}
                color="primary"
              />
            )}
            {tab === 'transactions' && transactions && (
              <WalletList result={transactions} />
            )}
            {tab === 'topup' && <WalletTopup />}
            {tab === 'transfer' && (
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
            {tab === 'wallet-transaction' && <WalletTransactions />}
            {tab === 'wallet-withdrawl' && <WalletWithdrawl />}
          </div>
        </div>
      </div>
    </section>
  )
}
export default MyWalletTabs
