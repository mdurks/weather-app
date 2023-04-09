import { useState } from 'react'
import { returnDayName } from '../utilities/dates'
import { weatherCodes } from '../utilities/weatherCodes'
import { getWeatherDayData } from '../utilities/getWeatherData'

import {
    DayPickerWrapper,
    ButtonContainer,
    DayButton,
    WeatherImg,
    DayText,
    TemperatureWrapper,
    TempHigh,
    TempLow,
    TempUnit,
} from './DayPicker.styles'

const DayPicker = ({weekData, setWeatherData, setSelectedDay, currentLocation}) => {
    const { daily, daily_units } = weekData
    const { time, temperature_2m_min, temperature_2m_max, weathercode } = daily
    const [selectedButton, setSelectedButton] = useState(0)

    const handlePickADay = (day, index) => {
		getWeatherDayData(day, setWeatherData, currentLocation)
        setSelectedDay(day)
        setSelectedButton(index)
    }

    return (
        <DayPickerWrapper>
            <ButtonContainer>
            {time.map((day, index) => (
                <DayButton
                    key={day}
                    type="button"
                    onClick={() => handlePickADay(day, index)}
                    className={selectedButton === index && 'activeButton'}
                >
                    <WeatherImg>{weatherCodes[weathercode[index]].image}</WeatherImg>
                    <DayText>{returnDayName(day)}</DayText>
                    <TemperatureWrapper>
                        <TempHigh>
                            {Math.round(temperature_2m_max[index])}
                            <TempUnit>{daily_units.temperature_2m_max}</TempUnit>
                        </TempHigh>
                        <TempLow>
                            {Math.round(temperature_2m_min[index])}
                            <TempUnit>{daily_units.temperature_2m_max}</TempUnit>
                        </TempLow>
                    </TemperatureWrapper>
                </DayButton>
                ))
            }
            </ButtonContainer>
        </DayPickerWrapper>
    )
}

export default DayPicker