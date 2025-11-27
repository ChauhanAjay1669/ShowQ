const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
        </div>
    );
};

export const SkeletonCard = () => {
    return (
        <div className="glass rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-[2/3] bg-dark-200"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-dark-200 rounded w-3/4"></div>
                <div className="h-3 bg-dark-200 rounded w-1/2"></div>
                <div className="h-4 bg-dark-200 rounded w-1/3"></div>
            </div>
        </div>
    );
};

export default Loading;
