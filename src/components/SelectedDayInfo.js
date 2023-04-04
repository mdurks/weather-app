import { motion } from 'framer-motion'
import { returnDayName } from '../utilities/dates'

const SelectedDayInfo = ({dayData}) => {
    const { hourly, daily, daily_units } = dayData
    const { relativehumidity_2m } = hourly
    const humidityAvg = Math.round(relativehumidity_2m.reduce((a,b) => (a+b)) / relativehumidity_2m.length)

    return (
        <div>
            <h2>{returnDayName(daily.time)}</h2>

            <p>Temp high: {daily.temperature_2m_max}{daily_units.temperature_2m_max}</p>
            <p>Temp low: {daily.temperature_2m_min}{daily_units.temperature_2m_max}</p>
            <p>Rain chance: {daily.precipitation_probability_max}%</p>
            <p>Sun rise: {daily.sunrise}</p>
            <p>Sun set: {daily.sunset}</p>
            <p>UV index: {daily.uv_index_max}</p>

            <svg width="116" height="116" viewBox="0 0 116 116">
                <motion.circle
                    initial={{ pathLength: 0, rotate: -90 }}
                    animate={{ pathLength: Number(`0.${humidityAvg}`) }}
                    transition={{ duration: 1 }}
                    r="50"
                    cx="58"
                    cy="58"
                    fill="none"
                    stroke="black"
                    strokeWidth="16"
                    />
            </svg>
            <p>{`Humidity ${humidityAvg}%`}</p>
        </div>
    )
}

export default SelectedDayInfo