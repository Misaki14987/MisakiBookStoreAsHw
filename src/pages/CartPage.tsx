import React from 'react';
import useCartStore from '../store/cartStore';
import {Link} from 'react-router-dom';

const CartPage: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

return(
  <div>
    <h1>Your Cart</h1>
    {cart.length === 0 ? (
      <p>空空如也呢</p>
    ):(
      <div>
        {cart.map((book) => (
          <div key={book.id} style={{border: '1px solid #ccc',marginBottom: '1rem',padding: '1rem'}}>
          <h2>{book.title}</h2>
          <p>Price:{book.price}</p>
          <button onClick={() => removeFromCart(book.id)}>Delete</button>
          </div>
        ))}
        <h2>Total Price: {totalPrice.toFixed(2)}</h2>
        <Link to="/checkout">
          <button>CheckOut!</button>
        </Link>
      </div>
    )}
  </div>
);
};

export default CartPage;