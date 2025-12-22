import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });

  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });

  const [error, setError] = useState(null);
  const {selectedLocation} = useContext(LocationContext);


  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setLoading(prev => ({
        ...prev,
        state: true,
        message: "Fetching weather data...",
      }));

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Fetching weather data failed: ${response.status}`);
      }

      const data = await response.json();

      setWeatherData({
        location: data?.name,
        climate: data?.weather[0]?.main,
        temperature: data?.main?.temp,
        maxTemperature: data?.main?.temp_max,
        minTemperature: data?.main?.temp_min,
        humidity: data?.main?.humidity,
        cloudPercentage: data?.clouds?.all,
        wind: data?.wind?.speed,
        time: data?.dt,
        longitude,
        latitude,
      });

    } catch (err) {
      setError(err);
    } finally {
      setLoading(prev => ({
        ...prev,
        state: false,
        message: "",
      }));
    }
  };

  useEffect(() => {
    setLoading({
      state: true,
      message: "Finding location..."
    });

    if (selectedLocation.latitude && selectedLocation.longitude) {
      fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)
    }else {
       navigator.geolocation.getCurrentPosition(
      function (position) {
        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      },
      function () {
        setError(new Error("Location permission denied"));
        setLoading({
          state: false,
          message: ""
        });
      }
    );
    }

    
  }, [selectedLocation.latitude, selectedLocation.longitude]);

  return {
    weatherData,
    error,
    loading
  };
};

export default useWeather;
