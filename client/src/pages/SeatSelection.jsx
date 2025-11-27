import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMonitor, FiInfo } from 'react-icons/fi';
import { formatCurrency } from '../utils/helpers';

const SeatSelection = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [selectedSeats, setSelectedSeats] = useState([]);

    // Fallback if accessed directly
    if (!state) {
        navigate('/');
        return null;
    }

    const { movie, theater, time, date } = state;

    // Seat Configuration
    const seatConfig = [
        { type: 'Standard', price: 200, rows: ['A', 'B', 'C'] },
        { type: 'Premium', price: 350, rows: ['D', 'E', 'F'] },
        { type: 'VIP', price: 500, rows: ['G', 'H'] }
    ];

    const getSeatPrice = (row) => {
        const config = seatConfig.find(c => c.rows.includes(row));
        return config ? config.price : 200;
    };

    const handleSeatClick = (seatId, row) => {
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length >= 5) {
                alert("You can only select up to 5 seats.");
                return;
            }
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const calculateTotal = () => {
        return selectedSeats.reduce((total, seatId) => {
            const row = seatId.charAt(0);
            return total + getSeatPrice(row);
        }, 0);
    };

    const handleProceed = () => {
        navigate('/checkout', {
            state: {
                booking: {
                    movie,
                    theater,
                    time,
                    date,
                    seats: selectedSeats,
                    price: calculateTotal(), // Total price for all seats
                    total: calculateTotal()
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 pb-32 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold gradient-text mb-2">{movie.title}</h1>
                    <p className="text-gray-400 text-sm tracking-wide uppercase">
                        {theater.name} • <span className="text-primary-400">{time}</span> • {date}
                    </p>
                </div>

                {/* Curved Screen Effect */}
                <div className="relative mb-16 perspective-1000">
                    <div className="w-3/4 mx-auto h-16 bg-gradient-to-b from-primary-500/20 to-transparent rounded-[50%] transform rotate-x-12 shadow-[0_-20px_60px_rgba(239,68,68,0.3)] border-t border-primary-500/30"></div>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-primary-500/50 text-xs tracking-[0.5em] font-light">
                        SCREEN
                    </div>
                </div>

                {/* Seats Container */}
                <div className="flex flex-col items-center gap-8 mb-12">
                    {seatConfig.map((category) => (
                        <div key={category.type} className="w-full flex flex-col items-center gap-2">
                            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                                {category.type} - {formatCurrency(category.price)}
                            </div>

                            {category.rows.map(row => (
                                <div key={row} className="flex gap-3 md:gap-4 items-center justify-center">
                                    <span className="w-6 text-gray-600 text-xs font-mono text-right">{row}</span>
                                    <div className="flex gap-2 md:gap-3">
                                        {Array.from({ length: 10 }, (_, i) => {
                                            const seatNum = i + 1;
                                            const seatId = `${row}${seatNum}`;
                                            const isSelected = selectedSeats.includes(seatId);
                                            const price = category.price;

                                            // Simulate occupied seats
                                            const isOccupied = (row === 'D' && seatNum === 5) || (row === 'E' && seatNum === 6) || (row === 'H' && seatNum === 4);

                                            return (
                                                <button
                                                    key={seatId}
                                                    disabled={isOccupied}
                                                    onClick={() => handleSeatClick(seatId, row)}
                                                    className={`
                                                        group relative w-8 h-8 md:w-10 md:h-10 rounded-t-lg text-[10px] md:text-xs font-medium transition-all duration-300
                                                        ${isOccupied
                                                            ? 'bg-gray-800 cursor-not-allowed text-transparent'
                                                            : isSelected
                                                                ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.6)] translate-y-[-2px]'
                                                                : 'bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.1)]'}
                                                    `}
                                                >
                                                    {/* Chair Armrests (Visual) */}
                                                    <div className={`absolute -left-1 bottom-0 w-1 h-3/4 rounded-tl-sm rounded-bl-sm transition-colors ${isSelected ? 'bg-primary-600' : isOccupied ? 'bg-gray-800' : 'bg-white/5 group-hover:bg-white/10'}`}></div>
                                                    <div className={`absolute -right-1 bottom-0 w-1 h-3/4 rounded-tr-sm rounded-br-sm transition-colors ${isSelected ? 'bg-primary-600' : isOccupied ? 'bg-gray-800' : 'bg-white/5 group-hover:bg-white/10'}`}></div>

                                                    {/* Seat Number */}
                                                    <span className="relative z-10">{seatNum}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <span className="w-6 text-gray-600 text-xs font-mono text-left">{row}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-gray-400 mb-8 p-4 glass rounded-full max-w-2xl mx-auto">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-t-lg bg-white/10 border border-white/5"></div>
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-t-lg bg-primary-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
                        <span>Selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-t-lg bg-gray-800"></div>
                        <span>Sold</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 p-4 transition-transform duration-500 z-50 ${selectedSeats.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Selected Seats</p>
                            <p className="text-xl font-bold text-white">{selectedSeats.join(', ')}</p>
                        </div>
                        <div className="h-8 w-px bg-white/10"></div>
                        <div>
                            <p className="text-gray-400 text-xs uppercase tracking-wider">Total Price</p>
                            <p className="text-2xl font-bold text-primary-400">
                                {formatCurrency(calculateTotal())}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleProceed}
                        className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl font-bold shadow-lg shadow-primary-600/20 transition-all transform hover:scale-105"
                    >
                        Proceed to Pay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatSelection;
