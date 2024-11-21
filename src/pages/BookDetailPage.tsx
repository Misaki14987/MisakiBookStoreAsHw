import React from 'react';
import { useOneBook } from '../api/booksAPI';
import { useParams, Link } from "react-router-dom";
import useCartStore from '../store/cartStore';
import { Button } from 'antd';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, error, isLoading } = useOneBook(Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen text-9xl text-gray-500'>少女祈祷中</div>;
  }
  if (error) {
    return <div className='flex justify-center items-center min-h-screen text-9xl text-red-500'>哼哼，啊啊啊啊</div>;
  }
  if (!book) {
    return <div className='flex justify-center items-center min-h-screen text-4xl text-red-500'>404MotherNotFound</div>;
  }

  const handleAddToCartAndAlert = (book: Book) => {
    addToCart(book);
    alert('加入购物车了( •̀ ω •́ )y');
  };

  return (
    <div className="flex flex-col items-center bg-cover bg-center p-8 min-h-screen" style={{ backgroundImage: 'url(https://your-image-url.com)' }}>
      <h1 className="text-6xl text-yellow-400 drop-shadow-xl mb-6">《{book.title}》</h1>
      <div className="text-center mb-10 text-white shadow-lg px-6 py-4 bg-opacity-60 rounded-lg">
        <p className="text-3xl font-semibold mb-2">Author: {book.author}</p>
        <p className="text-2xl mb-4">Price: ${book.price}</p>
      </div>

      <div className="flex justify-center space-x-6 mt-10">
        <button
          onClick={() => handleAddToCartAndAlert(book)}
          className="text-lg py-3 px-8 bg-blue-500 text-white rounded-xl shadow-md transform transition-all duration-300 hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Add to Cart!
        </button>

        <Link to="/cart">
          <button
            className="text-lg py-3 px-8 bg-green-500 text-white rounded-xl shadow-md transform transition-all duration-300 hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          >
            Check your cart
          </button>
        </Link>
      </div>

      <div className="mt-16">
        <Link to="/">
          <Button
            className="text-lg py-3 px-8 bg-purple-500 text-white rounded-xl shadow-md transform transition-all duration-300 hover:bg-purple-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
          >
            返回主页喵~
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetailPage;
