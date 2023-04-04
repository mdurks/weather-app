import { motion } from 'framer-motion'
import { returnDayName } from '../utilities/dates'
import { weatherCodes } from '../utilities/weatherCodes'
import { getWeatherDayData } from '../utilities/getWeatherData'

const DayPicker = ({weekData, setWeatherData}) => {
    const { daily, daily_units } = weekData
    const { time, temperature_2m_min, temperature_2m_max, weathercode } = daily

    const handleClick = (time) => {
		getWeatherDayData(time, setWeatherData)
    }

    return (
        <div>
            {time.map((day, index) => (
                <button
                    key={day}
                    type="button"
                    onClick={() => handleClick(day)}
                >
                    <div>{returnDayName(day)}</div>
                    <div>{weatherCodes[weathercode[index]]}</div>
                    {`
                        ${temperature_2m_max[index]} to
                        ${temperature_2m_min[index]}
                    `}
                </button>
                ))
            }
        </div>
    )

}

export default DayPicker