import { weatherCodes } from '../utilities/weatherCodes'
import { getDateString } from '../utilities/dates'


const CurrentDayInfo = ({data}) => {
    const { hourly, current_weather, daily_units} = data
    const { weathercode } = hourly

    return (
        <>
            <h1>Current Weather:</h1>
            <p>{getDateString(current_weather.time)}</p>
            <p>Temperature: {current_weather.temperature}{daily_units.temperature_2m_max}</p>
            <p>Wind speed: {current_weather.windspeed}</p>
            <p>Wind direction: {current_weather.winddirection}</p>
            <p>Weather code: {weatherCodes[weathercode[current_weather.weathercode]]}</p>
        </>
    )
}

export default CurrentDayInfo