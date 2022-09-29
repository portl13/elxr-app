import { getTransaction } from '@api/my-account/wallet.api'
import MainLayout from '@components/main/MainLayout'
import SidebarWallet from '@components/my-wallet/sidebar/SidebarWallet'
import React, { useState, useEffect, useContext } from 'react'
import WalletList from '@components/my-wallet/WalletList'
import { UserContext } from '@context/UserContext'
import Head from 'next/head'

function ResumenWalletPage() {
  const { user } = useContext(UserContext)
  const [transactions, setTransactions] = useState()

  function getTransactionList(user) {
    getTransaction(user).then((res) => setTransactions(res.data.data))
  }

  useEffect(() => {
    if (user) {
      getTransactionList(user)
    }
  }, [user])

  return (
    <>
      <Head>
        <title>My Wallet</title>
      </Head>
      <MainLayout sidebar={<SidebarWallet />}>
        <WalletList result={transactions} />
      </MainLayout>
    </>
  )
}

export default ResumenWalletPage
