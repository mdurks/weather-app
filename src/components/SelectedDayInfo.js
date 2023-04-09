import { motion } from 'framer-motion'

import {
    SelectedDayInfoWrapper,
    ContentWrapper,
    DetailsWrapper,
    DetailsItem,
    DetailsLabel,
    SvgWrapper,
} from './SelectDayInfo.styles'

const SelectedDayInfo = ({dayData}) => {
    const { hourly, daily } = dayData
    const { relativehumidity_2m } = hourly

    const humidityAvg = Math.round(relativehumidity_2m.reduce((a,b) => (a+b)) / relativehumidity_2m.length)
    let rainChance
    if (daily.precipitation_probability_max < 10) {
        rainChance = Number(`0.0${daily.precipitation_probability_max}`)
    } else if (daily.precipitation_probability_max < 100) {
        rainChance = Number(`0.${daily.precipitation_probability_max}`)
    } else {
        rainChance = 1
    }

    const sunRiseTime = String(daily.sunrise).slice(String(daily.sunrise).indexOf('T')+1)
    const sunSetTime = String(daily.sunset).slice(String(daily.sunset).indexOf('T')+1)

    return (
        <SelectedDayInfoWrapper>
            <ContentWrapper>
                <SvgWrapper>
                    <svg width="116" height="116" viewBox="0 0 116 116">
                        <motion.circle
                            initial={{ pathLength: 0, rotate: -90 }}
                            animate={{ pathLength: Number(`0.${humidityAvg}`) }}
                            transition={{ duration: 1 }}
                            r="50"
                            cx="58"
                            cy="58"
                            fill="none"
                            stroke="white"
                            strokeWidth="16"
                        />
                        <text
                            x="50%"
                            y="55%"
                            textAnchor='middle'
                            className='circleChart__numberValue'
                            fill="white"
                        >
                            {humidityAvg}%
                        </text>
                        <text
                            x="50%"
                            y="135%"
                            textAnchor='middle'
                            className='circleChart__label'
                            fill="white"
                        >
                            Humidity
                        </text>
                    </svg>
                </SvgWrapper>
                <SvgWrapper>
                    <svg width="116" height="116" viewBox="0 0 116 116">
                        <motion.circle
                            initial={{ pathLength: 0, rotate: -90 }}
                            animate={{ pathLength: rainChance }}
                            transition={{ duration: 1 }}
                            r="50"
                            cx="58"
                            cy="58"
                            fill="none"
                            stroke="white"
                            strokeWidth="16"
                        />
                        <text
                            x="50%"
                            y="55%"
                            textAnchor='middle'
                            className='circleChart__numberValue'
                            fill="white"
                        >
                            {daily.precipitation_probability_max}%
                        </text>
                        <text
                            x="50%"
                            y="135%"
                            textAnchor='middle'
                            className='circleChart__label'
                            fill="white"
                        >
                            Rain Chance
                        </text>
                    </svg>
                </SvgWrapper>
                <DetailsWrapper>
                    <DetailsItem>{sunRiseTime}</DetailsItem>
                    <DetailsLabel>Sunrise</DetailsLabel>
                </DetailsWrapper>
                <DetailsWrapper>
                    <DetailsItem>{sunSetTime}</DetailsItem>
                    <DetailsLabel>Sunset</DetailsLabel>
                </DetailsWrapper>
            </ContentWrapper>
        </SelectedDayInfoWrapper>
    )
}

export default SelectedDayInfo