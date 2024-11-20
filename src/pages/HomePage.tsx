import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../api/booksAPI";
import useCartStore from "../store/cartStore";
import { FloatButton, Button } from "antd";


interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}
const HomePage: React.FC = () => {
  const { data: books, error, isLoading } = useBooks();
  const addToCart = useCartStore((state) => state.addToCart);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8; 
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = books ? Math.ceil(books.length / booksPerPage) : 1;

  if (isLoading) {
    return <div>少女祈祷中</div>;
  }
  if (error) {
    return <div>哼哼，啊啊啊啊</div>;
  }

  const handleAddToCartAndAlert = (book: Book) => {
    addToCart(book);
    alert('加入购物车了( •̀ ω •́ )y');
  };

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', color: 'blue', fontWeight: 'bold' }}>Misaki's BookStore</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {currentBooks?.map((book) => (
          <div
            key={book.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '250px',
            }}
          >
            <div>
              <h2 style={{ marginBottom: '10px' }}>{book.title}</h2>
              <p>Author: {book.author}</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 'auto',
              }}
            >
              <Link to={`/book/${book.id}`}>
                <Button type="primary">View Details</Button>
              </Link>
              <Button
                type="default"
                onClick={() => handleAddToCartAndAlert(book)}
              >
                Add to Cart
              </Button>
              <Link to={'/cart'}>
                <FloatButton />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
        <Button
          type="default"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Left
        </Button>
        <span style={{ margin: '0 1rem' }}>Page {currentPage} of {totalPages}</span>
        <Button
          type="default"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Right
        </Button>
      </div>
    </div>
  );
};

export default HomePage;