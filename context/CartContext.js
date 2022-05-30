import { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', {})
  const [items, setItems] = useState(cart)

  useEffect(() => {
    setCart(items)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => {
  const { items: objItems } = useContext(CartContext)
  const products = Object.values(objItems)
  const countItems = products.reduce((sum, item) => sum + item.quantity, 0)
  const total = products.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.price),
    0
  )
  return {
    items: products,
    countItems,
    total: total.toFixed(2),
  }
}

export const useCartMutation = () => {
  const { items, setItems } = useContext(CartContext)

  const addProduct = (item) => {
    const existingCartItem = items[item.id]
    let newItems = {}

    if (existingCartItem != undefined) {
      const quantity = (existingCartItem.quantity += 1)
      newItems = {
        ...items,
        [item.id]: {
          ...existingCartItem,
          quantity,
        },
      }
      setItems(newItems)
      return
    }

    setItems({
      ...items,
      [item.id]: {
        ...item,
      },
    })
  }

  const removeProduct = (item) => {
    const existingCartItem = items[item.id]
    let newItems = {}

    if (existingCartItem != undefined && existingCartItem.quantity > 1) {
      const quantity = existingCartItem.quantity - 1
      newItems = {
        ...items,
        [item.id]: {
          ...existingCartItem,
          quantity,
        },
      }
      setItems(newItems)
      return
    }

    newItems = { ...items }
    delete newItems[item.id]
    setItems(newItems)
  }

  const clearCart =() => setItems({})

  return {
    addProduct,
    removeProduct,
    clearCart
  }
}
