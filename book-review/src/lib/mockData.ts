export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  aboutAuthor: string;
  genre: string;
  publishedYear: number;
}

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Jay Gatsby’s love for Daisy Buchanan in the Jazz Age.',
    aboutAuthor: 'F. Scott Fitzgerald, iconic 20th-century American novelist.',
    coverUrl: 'https://books.google.com/books/content?id=9S4zEAAAQBAJ&printsec=frontcover&img=1&zoom=1',
    genre: 'Literary Fiction',
    publishedYear: 1925,
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'Scout Finch navigates racial inequality in the American South.',
    aboutAuthor: 'Harper Lee, Pulitzer Prize-winning American novelist.',
    coverUrl: 'https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1',
    genre: 'Literary Fiction',
    publishedYear: 1960,
  },
  {
    id: '3',
    title: 'Dune',
    author: 'Frank Herbert',
    description: 'Paul Atreides’ epic journey on the desert planet Arrakis.',
    aboutAuthor: 'Frank Herbert, renowned for his Dune series.',
    coverUrl: 'https://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1',
    genre: 'Science Fiction',
    publishedYear: 1965,
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description: 'Elizabeth Bennet’s romantic journey in 18th-century England.',
    aboutAuthor: 'Jane Austen, celebrated English novelist.',
    coverUrl: 'https://books.google.com/books/content?id=s1gVAAAAYAAJ&printsec=frontcover&img=1&zoom=1',
    genre: 'Romance',
    publishedYear: 1813,
  },
];