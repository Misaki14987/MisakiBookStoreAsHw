import React from 'react';
import { useOneBook } from '../api/booksAPI';
import { useParams,Link } from "react-router-dom";
import useCartStore from '../store/cartStore';
import { Button } from 'antd';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const {data: book, error, isLoading} = useOneBook(Number(id));
  const addToCart = useCartStore((state) => state.addToCart);

  if(isLoading) {
    return <div>少女祈祷中</div>;
  }
  if(error) {
    return <div>哼哼，啊啊啊啊</div>;
  }
  if(!book) {
    return <div>BAKA,没有这本书</div>;
  }

  const handleAddToCartAndAlert = (book:any) =>{
    addToCart(book);
    alert('加入购物车了( •̀ ω •́ )y');
  }

return <div>
  <h1>{book.title}</h1>
  <p>Author:{book.author}</p>
  <p>Price:{book.price}</p>
  <button onClick={() => handleAddToCartAndAlert(book)}>Add to Cart!</button>
  <Link to ="/cart">
    <Button>Check your cart</Button>
  </Link>
  <div style={{ padding: '15rem' }}>
  <Link to ="/">
    <Button>返回主页喵~</Button>
  </Link>
  </div>
</div>
}
export default BookDetailPage;