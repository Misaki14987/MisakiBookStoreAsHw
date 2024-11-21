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
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-center text-5xl font-bold text-yellow-500 mb-12">Checkout Page</h1>
        {cart.length === 0 ? (
          <p className="text-center text-3xl text-gray-400 mt-40">空空如也呢 (´・ω・｀)</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cart.map((book) => (
                <div
                  key={book.id}
                  className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <h2 className="text-xl font-bold text-yellow-400 text-center mb-2">《{book.title}》</h2>
                  <p className="text-lg text-center text-gray-300 mb-4">Price: ${book.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 bg-gray-900 shadow-lg fixed bottom-0 left-0 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-yellow-400">
            Total Price: <span className="text-white">${totalPrice.toFixed(2)}</span>
          </h2>
          <button
            onClick={handleOrderSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-md transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
