import React, { useContext, useState, useEffect } from 'react'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import WalletTransfer from '@components/walletTranfers/WalletTransfer'
import { getBalance, getTransaction, transferAmount } from '@api/my-account/wallet.api'
import { UserContext } from '@context/UserContext'

function PageTransfer() {
    const { user } = useContext(UserContext)
  const [balance, setBalance] = useState()
  const [load, setLoad] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    if(user){
        getWalletBalance()
    }
  }, [user])

  function getWalletBalance() {
    getBalance(user).then((res) => setBalance(res.data.data))
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
    <MainLayout sidebar={<SidebarWallet />}>
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
    </MainLayout>
  )
}

export default PageTransfer
