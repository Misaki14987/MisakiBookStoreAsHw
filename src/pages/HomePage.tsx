import React from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../api/booksAPI";
import useCartStore from "../store/cartStore";
import { FloatButton,Button } from "antd";

const HomePage: React.FC = () => {
  const { data: books, error, isLoading } = useBooks();
  const addToCart = useCartStore((state) => state.addToCart);

  if (isLoading) {
    return <div>少女祈祷中</div>;
  }
  if (error) {
    return <div>哼哼，啊啊啊啊</div>;
  }

  const handleAddToCartAndAlert = (book: any) => {
    addToCart(book);
    alert('加入购物车了( •̀ ω •́ )y');
  };

  return (
    <div className="font-sans">
  <h1 className="text-rose-300 font-light">Misaki's BOOkStore</h1>
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
    }}
  >
    {books?.map((book) => (
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
          <h2 style={{marginBottom:'10px'}}>{book.title}</h2>
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
</div>

  );
};

export default HomePage;