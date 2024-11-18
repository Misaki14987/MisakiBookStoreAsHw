import React from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../api/booksAPI";
import useCartStore from "../store/cartStore";

const HomePage: React.FC = () => {
  const { data: books, error, isLoading } = useBooks();
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return <div>少女祈祷中</div>;
  }
  if (error) {
    return <div>哼哼，啊啊啊啊</div>;
  }

  return (
    <div>
      <h1>Misaki's BOOkStore</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {books?.map((book) => (
          <div key={book.id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link to={`/book/${book.id}`}>
                <button>View Details</button>
              </Link>
              <button onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;