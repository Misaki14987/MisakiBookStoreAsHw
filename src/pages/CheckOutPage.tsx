import React from 'react';
import useCartStore from '../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = cart.reduce((total, book) => total + book.price, 0);
  const navigate = useNavigate();
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const handleOrderSubmit = () => {
    alert('购买成功( •̀ ω •́ )y');
    cart.forEach((book) => removeFromCart(book.id));
    navigate('/');
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      {cart.length === 0 ? (
        <p>空空如也呢</p>
      ) : (
        <div>
          {cart.map((book) => (
            <div key={book.id} style={{ border: '1px solid #ccc', marginBottom: '1rem', padding: '1rem' }}>
              <h2>{book.title}</h2>
              <p>Price: {book.price}</p>
            </div>
          ))}
          <h2>Total Price: {totalPrice.toFixed(2)}</h2>
          <button onClick={handleOrderSubmit}>Submit Order</button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;