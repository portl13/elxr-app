import React from 'react'
import MainLayout from '@components/main/MainLayout'
import { SendInvites } from '@components/manage/email/SendInvites'
import BackButton from '@components/shared/button/BackButton'

function EmailPage() {
  return (
    <MainLayout title="send invitations">
      <div className="item-body-inner container container-80">
        <BackButton />
        <SendInvites />
      </div>
    </MainLayout>
  )
}

export default EmailPage
