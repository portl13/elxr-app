import React from 'react'
import moment from 'moment'

function WalletList({ result }) {
  return (
    <>
      {result?.length === 0 && (
        <div className="main-content">
          <div className="no-transaction">No transactions found</div>
        </div>
      )}
      {result &&
        result.map((d) => (
          <div className="main-content">
            <div className="left-content">
              {d.details}
              <span>{moment(d.date).format('MMMM DD, YYYY')}</span>
            </div>
            <div
              className={
                d.type === 'debit'
                  ? 'right-content red-text'
                  : 'right-content green-text'
              }
            >
              {d.type === 'debit' ? '-' : '+'}${parseFloat(d.amount)}
            </div>
          </div>
        ))}
    </>
  )
}
export default WalletList
