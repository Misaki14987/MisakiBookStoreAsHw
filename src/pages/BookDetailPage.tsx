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
    return <div>少女祈祷中</div>;
  }
  if (error) {
    return <div>哼哼，啊啊啊啊</div>;
  }
  if (!book) {
    return <div>BAKA,没有这本书</div>;
  }

  const handleAddToCartAndAlert = (book: Book) => {
    addToCart(book);
    alert('加入购物车了( •̀ ω •́ )y');
  };

  return (
    <div style={{ textAlign: 'center', 
      padding: '2rem',
      backgroundImage: `url('/public/1201131750_p0.png')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat' }}>
      <h1 style={{
        fontSize: '4rem',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)'
      }}>
        {book.title}
      </h1>

      <p style={{
        fontSize: '2rem',
        margin: '10px 0',
        color: 'lightgray'
      }}>
        Author: {book.author}
      </p>
      <p style={{
        fontSize: '1.7rem',
        margin: '10px 0',
        color: 'lightgray'
      }}>
        Price: {book.price}
      </p>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => handleAddToCartAndAlert(book)}
          style={{
            fontSize: '1.2rem',
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: '#1E90FF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add to Cart!
        </button>

        <Link to="/cart">
          <Button
            style={{
              fontSize: '1.2rem',
              margin: '0 10px',
              backgroundColor: '#007ACC',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            Check your cart
          </Button>
        </Link>
      </div>

      <div style={{ marginTop: '50px' }}>
        <Link to="/">
          <Button
            style={{
              fontSize: '1.2rem',
              padding: '10px 20px',
              backgroundColor: '#32CD32',
              color: 'white',
              borderRadius: '5px'
            }}
          >
            返回主页喵~
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BookDetailPage;
