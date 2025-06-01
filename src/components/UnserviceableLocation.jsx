function UnserviceableLocation() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                alt="Location Unserviceable"
                className="w-48 h-48 md:w-60 md:h-60 mb-4"
            />
            <p className="text-xl font-bold text-gray-800">Location Unserviceable!</p>
            <p className="text-gray-600 text-sm md:text-base max-w-sm mt-2">
                We don't have any services here yet. Try changing your location.
            </p>
        </div>
    );
}

export default UnserviceableLocation