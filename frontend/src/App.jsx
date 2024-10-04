import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThumbsUp, Loader } from 'lucide-react';

const AudiobookDashboard = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudiobooks();
  }, []);

  const fetchAudiobooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/audiobooks');
      setAudiobooks(response.data);
    } catch (error) {
      console.error('Error fetching audiobooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (bookId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/vote/${bookId}`);
      setAudiobooks(audiobooks.map(book => 
        book.id === bookId ? { ...book, votes: response.data.new_votes } : book
      ));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-blue-500 w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Audiobook Voting Dashboard</h1>
          <p className="text-xl text-gray-600">Vote for your favorite audiobooks!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {audiobooks.map(book => (
            <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
              <div className="relative h-64">
                <img src={book.cover_image} alt={book.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => handleVote(book.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center space-x-2 transform hover:scale-110 transition-transform duration-300"
                  >
                    <ThumbsUp size={20} />
                    <span>Vote</span>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{book.title}</h2>
                <p className="text-gray-600 mb-4">{book.author}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-500 flex items-center">
                    <ThumbsUp size={20} className="mr-2" />
                    {book.votes} votes
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudiobookDashboard;