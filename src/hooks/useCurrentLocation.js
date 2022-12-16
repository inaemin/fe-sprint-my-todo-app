import { useState, useEffect } from 'react';

const useCurrentLocation = async () => {
  const [location, setLocation] = useState();

  const handleSucess = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ lat: latitude, lon: longitude });
  };

  const handleError = () => {
    // 위치정보를 못 불러오면 기본값 쿠퍼티노
    setLocation({ lat: 37.3229978, lon: -122.0321823 });
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      handleError();
      return;
    }
    geolocation.getCurrentPosition(handleSucess, handleError);
  }, []);
  return location;
};

export default useCurrentLocation;
