import axios from 'axios';
import { getFutureDateByDays, formatDate } from './dates'

export const getWeatherData = (date, setWeatherData, setWeatherWeekData, currentLocation) => {
    // todays data:
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${formatDate(date)}&end_date=${formatDate(date)}&timezone=auto`)
    .then(function (response) {
        setWeatherData(response)
    })
    .catch(function (error) {
        console.log(error);
    })

    // week of data:
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${formatDate(date)}&end_date=${getFutureDateByDays(6)}&timezone=auto`)
    .then(function (response) {
        setWeatherWeekData(response)
    })
    .catch(function (error) {
        console.log(error);
    })
}

// selected day of data
export const getWeatherDayData = (date, setWeatherData, currentLocation) => {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${date}&end_date=${date}&timezone=auto`)
    .then(function (response) {
        setWeatherData(response)
    })
    .catch(function (error) {
        console.log(error);
    })
}
