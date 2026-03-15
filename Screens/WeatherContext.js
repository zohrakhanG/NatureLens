import React, { createContext, useState } from "react";

// Create context
export const WeatherContext = createContext();

// Provider component
export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState({ city: "", country: "" });
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        locationName,
        setLocationName,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
