import React from 'react';
import useCartStore from '../store/cartStore';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-center text-5xl font-bold text-yellow-500 mb-12">Your Cart</h1>
        {cart.length === 0 ? (
          <p className="text-center text-3xl mt-40 text-gray-400">空空如也呢 (´・ω・｀)</p>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {cart.map((book) => (
                <div
                  key={book.id}
                  className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">《{book.title}》</h2>
                  <p className="text-xl text-center text-gray-300 mb-6">Price: ${book.price.toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="block mx-auto bg-red-500 hover:bg-red-600 text-white text-lg font-medium px-6 py-2 rounded-md transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div className="sticky bottom-0 bg-gray-900 text-white py-6 shadow-inner">
          <div className="container mx-auto flex justify-between items-center px-6">
            <h2 className="text-3xl font-bold text-yellow-500">
              Total Price: <span className="text-white">${totalPrice.toFixed(2)}</span>
            </h2>
            <Link to="/checkout">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-md transition">
                Check Out!
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
