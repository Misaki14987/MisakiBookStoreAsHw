import { useQuery } from '@tanstack/react-query';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

const fetchAllBooks = async (): Promise<Book[]> => {
  const response = await fetch('http://localhost:1145/books');
  if (!response.ok) {
    throw new Error('哼哼，啊啊啊啊');
  }
  return response.json();
};

const fetchOneBooks = async (id:number):Promise<Book> => {
  const response = await fetch(`http://localhost:1145/books/${id}`)
  if(!response.ok) {
    throw new Error('哼哼，啊啊啊啊')
  }
  return response.json();
};

export const useBooks = () => {
  return useQuery<Book[]>({ 
    queryKey: ['books'], 
    queryFn: fetchAllBooks 
  });
};

export const useOneBook = (id:number) => {
  return useQuery<Book>({
    queryKey:['book',id],
    queryFn: () => fetchOneBooks(id),
  });
}

