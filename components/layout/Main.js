import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import axios from 'axios'
import { MainStyle } from './MainStyle.style'
import { css } from '@emotion/core'
import { useRouter } from 'next/router'
import Header from '../home/Header'
import LeftMenu from '../home/LeftMenu'
import useSWR from 'swr'
import { MenuAndHeaderStyle } from './MenuAndHeaderStyle'



const Main = ({
  children,
  connections,
  notifications,
  myMonnections,
  menuMobile,
  leftMenu,
  noMenu,
}) => {
  const { user, setUser } = useContext(UserContext)
  const [auth, setAuth] = useState(false)
  const router = useRouter()
  const [data, setData] = useState()
  const [image, setImage] = useState()
  const [loader, setLoader] = useState(true)

  const profile = process.env.bossApi + '/members/' + user?.id

  const { data: userData } = useSWR(
    user ? [profile, user] : null,
    (url, user) =>
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })
        .then((res) => {
          return res.data
        })
  )

  useEffect(() => {
    if (!userData) return
    setData(userData)
  }, [userData])

  useEffect(() => {
    if (user) {
      setLoader(!user)
    }
  }, [user])

  useEffect(() => {
    if (!user) return
    setAuth(!auth)
  }, [user])

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth)
    }
  }, [user])

  return (
    <div css={[MainStyle, MenuAndHeaderStyle]}>
      <div className="main">
        <Header menuMobile={menuMobile} auth={auth} user={user} data={data} />
        <div className="content">
          <div className={`left-content ${noMenu ? 'no-menu' : ''}`}>
            {!leftMenu ? <LeftMenu /> : leftMenu}
          </div>
          <div className={`right-content ${noMenu ? 'no-menu' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
