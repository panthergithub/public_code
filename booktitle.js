function Book(title, author, ISBN, status = 'available') {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
    this.status = status; // 'available' or 'checked out'
  }
  const library = [];
  function addBook(book) {
    library.push(book);
    console.log(`Book titled "${book.title}" added to the library.`);
  }
  function removeBook(ISBN) {
    const index = library.findIndex(book => book.ISBN === ISBN);
    if (index !== -1) {
      console.log(`Book titled "${library[index].title}" removed from the library.`);
      library.splice(index, 1);
    } else {
      console.log('Book not found.');
    }
  }
  function searchBooks(query) {
    const results = library.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    return results.length ? results : 'No books found matching your query.';
  }
  function checkOutBook(ISBN) {
    const book = library.find(book => book.ISBN === ISBN);
    if (book && book.status === 'available') {
      book.status = 'checked out';
      console.log(`Book titled "${book.title}" is now checked out.`);
    } else if (book) {
      console.log(`Book titled "${book.title}" is already checked out.`);
    } else {
      console.log('Book not found.');
    }
  }
  
  function checkInBook(ISBN) {
    const book = library.find(book => book.ISBN === ISBN);
    if (book && book.status === 'checked out') {
      book.status = 'available';
      console.log(`Book titled "${book.title}" is now available.`);
    } else if (book) {
      console.log(`Book titled "${book.title}" was not checked out.`);
    } else {
      console.log('Book not found.');
    }
  }
  const book1 = new Book('Eloquent JavaScript', 'Marijn Haverbeke', '9781593279509');
  const book2 = new Book('JavaScript: The Good Parts', 'Douglas Crockford', '9780596517748');
  const book3 = new Book('You Don’t Know JS', 'Kyle Simpson', '9781491904244');
  
  addBook(book1);
  addBook(book2);
  addBook(book3);
  
  console.log(searchBooks('JavaScript'));
  checkOutBook('9781593279509');
  checkInBook('9781593279509');
  removeBook('9780596517748');
            