const tenDayCleaner = data => {
  return data.forecast.simpleforecast.forecastday.map(day => {
    return {
      dateTime: day.date.weekday_short,
      iconAlt: day.icon,
      iconURL: day.icon_url,
      temp: `High: ${day.high.fahrenheit}°F Low: ${day.low.fahrenheit}°F`
    };
  });
};

export default tenDayCleaner;