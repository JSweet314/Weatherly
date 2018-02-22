const hourlyWeatherCleaner = data => {
  const sevenHours = data.hourly_forecast.splice(0,7);
  return sevenHours.map(hour => {
    return {
      dateTime: hour.FCTTIME.civil,
      iconURL: hour.icon_url,
      iconAlt: hour.icon,
      temp: hour.temp.english + '°F'
    };
  });

}

export default hourlyWeatherCleaner;