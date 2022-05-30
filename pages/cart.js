import Head from 'next/head'
import React from 'react'
import { Table } from 'reactstrap'
import Layout from '../components/layout/Layout'
import { useCart, useCartMutation } from '../context/CartContext'
import Link from 'next/link'

export default function Cart() {
  const { items, total } = useCart()
  const { removeProduct } = useCartMutation()
  return (
    <Layout>
      <Head>Cart</Head>
      <div className='bg-black bd-radius col-12'>
        <h1 className="text-center mb-5">Cart</h1>
        <Table responsive >
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Price</th>
              <th className="text-center">Quantity</th>
              <th className="text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <th scope="row">
                  <button
                    onClick={() => removeProduct(item)}
                    className="btn btn-danger"
                  >
                    X
                  </button>
                </th>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-right">$ {item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">Total</td>
              <td className="text-right">$ {total}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-right">
                <Link href="/page-checkout">
                  <a className="btn btn-secondary">proceed to checkout</a>
                </Link>
              </td>
            </tr>
          </tfoot>
        </Table>
      </div>
    </Layout>
  )
}
