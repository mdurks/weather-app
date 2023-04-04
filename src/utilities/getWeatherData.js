import axios from 'axios';
import { getFutureDateByDays, formatDate } from './dates'

export const getWeatherData = (date, setWeatherData, setWeatherWeekData) => {
    // todays data:
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=53.48&longitude=-2.24&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${formatDate(date)}&end_date=${formatDate(date)}&timezone=Europe%2FLondon`)
    .then(function (response) {
        // console.log('today:', response.data);
        setWeatherData(response)
    })
    .catch(function (error) {
        console.log(error);
    })

    // week of data:
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=53.48&longitude=-2.24&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${formatDate(date)}&end_date=${getFutureDateByDays(6)}&timezone=Europe%2FLondon`)
    .then(function (response) {
        // console.log('week:', response.data);
        setWeatherWeekData(response)
    })
    .catch(function (error) {
        console.log(error);
    })
}

export const getWeatherDayData = (date, setWeatherData) => {
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=53.48&longitude=-2.24&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&start_date=${date}&end_date=${date}&timezone=Europe%2FLondon`)
    .then(function (response) {
        // console.log('today:', response.data);
        setWeatherData(response)
    })
    .catch(function (error) {
        console.log(error);
    })
}

