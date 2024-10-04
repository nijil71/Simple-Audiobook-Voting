from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///audiobooks.db'
db = SQLAlchemy(app)

# Model for the Audiobook table
class Audiobook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(100), nullable=False)
    cover_image = db.Column(db.String(200), nullable=False)
    votes = db.Column(db.Integer, default=0)


# API Route for adding a new audiobook
@app.route('/api/audiobooks', methods=['POST'])
def create_audiobook():
    data = request.get_json()
    new_book = Audiobook(
        title=data['title'],
        author=data['author'],
        cover_image=data['cover_image']
    )
    db.session.add(new_book)
    db.session.commit()
    return jsonify({'message': 'Audiobook created', 'id': new_book.id})

# API Route for getting all audiobooks
@app.route('/api/audiobooks', methods=['GET'])
def get_audiobooks():
    audiobooks = Audiobook.query.all()
    return jsonify([
        {
            'id': book.id,
            'title': book.title,
            'author': book.author,
            'cover_image': book.cover_image,
            'votes': book.votes
        } for book in audiobooks
    ])

# API Route for voting on an audiobook
@app.route('/api/vote/<int:book_id>', methods=['POST'])
def vote_audiobook(book_id):
    book = Audiobook.query.get_or_404(book_id)
    book.votes += 1
    db.session.commit()
    return jsonify({'message': 'Vote recorded', 'new_votes': book.votes})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)