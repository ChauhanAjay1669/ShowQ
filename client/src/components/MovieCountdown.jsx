import { useState, useEffect } from 'react';

const MovieCountdown = ({ releaseDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = new Date(releaseDate) - new Date();

        if (difference <= 0) {
            return { expired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            expired: false
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [releaseDate]);

    if (timeLeft.expired) {
        return (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                <span className="text-green-400 text-sm font-semibold">Released</span>
            </div>
        );
    }

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-500/30">
            {timeLeft.days > 0 && (
                <div className="flex flex-col items-center">
                    <span className="text-primary-400 font-bold text-lg leading-none">{timeLeft.days}</span>
                    <span className="text-gray-400 text-xs">days</span>
                </div>
            )}
            {(timeLeft.days > 0 || timeLeft.hours > 0) && (
                <>
                    {timeLeft.days > 0 && <span className="text-gray-500">:</span>}
                    <div className="flex flex-col items-center">
                        <span className="text-primary-400 font-bold text-lg leading-none">{timeLeft.hours}</span>
                        <span className="text-gray-400 text-xs">hrs</span>
                    </div>
                </>
            )}
            <span className="text-gray-500">:</span>
            <div className="flex flex-col items-center">
                <span className="text-primary-400 font-bold text-lg leading-none">{timeLeft.minutes}</span>
                <span className="text-gray-400 text-xs">min</span>
            </div>
        </div>
    );
};

export default MovieCountdown;
