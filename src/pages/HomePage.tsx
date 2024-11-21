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
    <div className="container mx-auto px-4">
      <h1 className="font-bold text-center my-6 text-6xl">Misaki's BookStore</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentBooks?.map((book) => (
          <div
            key={book.id}
            className="w-auto h-64 bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition m-10"
          >
            <div>
              <h2 className="text-xl font-semibold mb-16">{book.title}</h2>
              <p className="text-gray-700 mb-2">Author:</p>
              <p className=""> {book.author}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Link to={`/book/${book.id}`}>
                <Button type="primary">View Details</Button>
              </Link>
              <Button
                type="default"
                onClick={() => handleAddToCartAndAlert(book)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 space-x-4">
        <Button
          type="default"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Left
        </Button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="default"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="green"
        >
          Right
        </Button>
      </div>

      <Link to="/cart">
        <FloatButton className="fixed bottom-6 right-6" />
      </Link>
    </div>
  );
};

export default HomePage;