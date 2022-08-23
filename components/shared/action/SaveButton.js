import React, { useContext, useEffect, useState } from 'react'
import SaveIcon from '@icons/SaveIcon'
import { UserContext } from '@context/UserContext'
import axios from 'axios'

const url = `${process.env.apiV2}/saved/`

function SaveButton({ value, type }) {
  const { user } = useContext(UserContext)
  const [isSaved, setIsSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const save = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        `${url}`,
        {
          value,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setIsSaved(true)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const checkSaved = async () => {
    try {
      const { data } = await axios.get(
        `${url}${value}?type=${type}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (data?.message === 'saved') {
        setIsSaved(true)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (!user) return
    checkSaved()
  }, [user])

  return (
    <button onClick={save} className="btn btn-detail-action">
      <span>{isSaved ? 'Saved' : 'Save'}</span>
      <span className="btn-detail-icon">
        {!isLoading && <SaveIcon />}
        {isLoading && (
          <div class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </span>
    </button>
  )
}

export default SaveButton
