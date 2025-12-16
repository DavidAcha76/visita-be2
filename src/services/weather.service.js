import axios from 'axios';

export const getWeather = async (lat, lon) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast`;
    
    const params = {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'America/La_Paz',
      forecast_days: 3
    };

    const response = await axios.get(url, { params, timeout: 5000 });
    
    return {
      current: {
        temperature: response.data.current.temperature_2m,
        feelsLike: response.data.current.apparent_temperature,
        humidity: response.data.current.relative_humidity_2m,
        precipitation: response.data.current.precipitation,
        windSpeed: response.data.current.wind_speed_10m,
        weatherCode: response.data.current.weather_code
      },
      hourly: response.data.hourly,
      daily: response.data.daily,
      units: response.data.current_units
    };
  } catch (error) {
    console.error('Error obteniendo clima:', error.message);
    throw new Error('No se pudo obtener información del clima');
  }
};
