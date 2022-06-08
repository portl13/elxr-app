import React from 'react'
import moment from 'moment'

function TransactionCard({ transactions }) {
  return (
    <section>
      <div className="wcfm-datatable">
        <div className="d-flex flex-column flex-fill w-100">
          <div className="column-head">
            <div className="credit-col-1" data-label="ID">
              <span>{transactions?.transaction_id}</span>
            </div>
            <div className="credit-col-2" data-label="CREDIT">
              {transactions?.type === 'credit' ? (
                <span>${parseFloat(transactions?.amount)}</span>
              ) : (
                '-'
              )}
            </div>
            <div className="credit-col-3" data-label="DEBIT">
              {transactions?.type === 'debit' ? (
                <span>${parseFloat(transactions?.amount)}</span>
              ) : (
                '-'
              )}{' '}
            </div>
            <div className="credit-col-4" data-label="DETAILS">
              <span>{transactions?.details}</span>
            </div>
            <div className="credit-col-5" data-label="DATE">
              <span>{moment(transactions?.date).format('MMMM DD, YYYY')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default TransactionCard
