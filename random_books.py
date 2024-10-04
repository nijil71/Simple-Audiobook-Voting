from main import app, db, Audiobook

sample_books = [
 {
    "author": " Paulo Coelho",
    "cover_image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
    "title": "The Alchemist",
  },
  {
    "author": "J. R. R. Tolkien",
    "cover_image": "https://i.ebayimg.com/images/g/HW4AAOSwYDZgjoaO/s-l400.jpg",
    "title": "The Hobbit",
  },
  {
    "author": "George R. R. Martin",
    "cover_image": "https://assets-prd.ignimgs.com/2022/11/01/world-1667334141452.jpg",
    "title": "A Game of Thrones",
  },
  {
    "author": "J. K. Rowling",
    "cover_image": "https://m.media-amazon.com/images/I/81q77Q39nEL._AC_UF1000,1000_QL80_.jpg",
    "title": "Harry Potter and the Philosopher's Stone",
  }
]

with app.app_context():
    db.create_all()
    for book in sample_books:
        new_book = Audiobook(**book)
        db.session.add(new_book)
    db.session.commit()

print("Database initialized with sample data.")