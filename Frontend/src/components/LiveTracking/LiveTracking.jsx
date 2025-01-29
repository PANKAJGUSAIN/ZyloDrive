import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const indiaCenter = {
    lat: 20.5937,
    lng: 78.9629
};

const isLocationInIndia = (lat, lng) => {
    // Rough bounding box for India
    const indiaBounds = {
        north: 37.6,
        south: 6.7,
        west: 68.7,
        east: 97.25
    };
    return lat >= indiaBounds.south && lat <= indiaBounds.north && lng >= indiaBounds.west && lng <= indiaBounds.east;
};

const LiveTracking = () => {
    const [center, setCenter] = useState(indiaCenter);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        if (isLocationInIndia(latitude, longitude)) {
                            setCenter({ lat: latitude, lng: longitude });
                            setUserLocation({ lat: latitude, lng: longitude });
                        }
                    },
                    (error) => {
                        console.error("Error getting user's location:", error);
                    }
                );
            }
        };

        // Initial location update
        updateLocation();

        // Update location every 10 seconds
        const intervalId = setInterval(updateLocation, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {userLocation && <Marker position={userLocation} />}
            </GoogleMap>
        </LoadScript>
    );
}

export default LiveTracking;