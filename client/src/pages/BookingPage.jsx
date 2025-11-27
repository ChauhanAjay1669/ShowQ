import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiClock, FiCalendar } from 'react-icons/fi';
import api from '../utils/api';
import { movies as dummyMovies } from '../assets/data/dummyData';

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [selectedDate, setSelectedDate] = useState(0);

    // Dummy Theaters Data
    const theaters = [
        { id: 1, name: "PVR Cinemas", location: "Downtown Mall", times: ["10:00 AM", "01:00 PM", "04:00 PM", "07:00 PM", "10:00 PM"] },
        { id: 2, name: "INOX", location: "City Center", times: ["11:00 AM", "02:00 PM", "05:00 PM", "08:00 PM", "11:00 PM"] },
        { id: 3, name: "Cinepolis", location: "Grand Plaza", times: ["09:30 AM", "12:30 PM", "03:30 PM", "06:30 PM", "09:30 PM"] },
        { id: 4, name: "IMAX", location: "Tech Park", times: ["10:30 AM", "01:30 PM", "04:30 PM", "07:30 PM", "10:30 PM"] },
    ];

    // Generate next 5 days
    const dates = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const { data } = await api.get(`/movies/${id}`);
                setMovie(data.movie);
            } catch (error) {
                const found = dummyMovies.find(m => m.id == id);
                if (found) setMovie(found);
            }
        };
        fetchMovie();
    }, [id]);

    const handleTimeSelect = (theaterId, time) => {
        navigate(`/booking/${id}/seats`, {
            state: {
                movie,
                theater: theaters.find(t => t.id === theaterId),
                time,
                date: dates[selectedDate].toDateString()
            }
        });
    };

    if (!movie) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-dark text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <p className="text-gray-400 mb-8">{movie.genre || movie.genres?.join(', ')} • {movie.language}</p>

                {/* Date Selection */}
                <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
                    {dates.map((date, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDate(index)}
                            className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition ${selectedDate === index
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white/5 hover:bg-white/10 text-gray-300'
                                }`}
                        >
                            <span className="text-sm">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="text-xl font-bold">{date.getDate()}</span>
                            <span className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</span>
                        </button>
                    ))}
                </div>

                {/* Theaters List */}
                <div className="space-y-6">
                    {theaters.map((theater) => (
                        <div key={theater.id} className="glass p-6 rounded-xl">
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <FiMapPin className="text-primary-400" />
                                        {theater.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm ml-6">{theater.location}</p>
                                </div>
                                <div className="text-green-400 text-sm mt-2 md:mt-0">
                                    M-Ticket Available
                                </div>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                {theater.times.map((time, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleTimeSelect(theater.id, time)}
                                        className="py-2 px-4 border border-white/20 rounded-lg hover:bg-primary-600 hover:border-primary-600 transition text-sm font-medium"
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
