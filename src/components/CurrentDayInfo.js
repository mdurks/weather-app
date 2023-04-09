import { weatherCodes, weatherCodesText } from '../utilities/weatherCodes'
import { returnDayName, getDateDDMMYYYString } from '../utilities/dates'

import {
    CurrentDayInfoWrapper,
    WeatherIcon,
    TitleWrapper,
    TitleHeading,
    LocationSelect,
    TitleDay,
    TitleDate,
    TitleWeatherSummary,
    ContentWrapper,
    ContentHeading,
    ContentValue,
    WeatherUnit,
    WindDirection,
} from './CurrentDayInfo.styls'

import CompassSVG from '../images/compass.svg'

const CurrentDayInfo = ({data, locations, setCurrentLocation}) => {
    const { current_weather, daily_units} = data
    const handleSelect = (e) => {
        const locationName = e.target.value
        setCurrentLocation(locations.find(location => location.value === locationName))
    }

    return (
        <CurrentDayInfoWrapper>
            <TitleWrapper>
                <WeatherIcon>
                    {weatherCodes[current_weather.weathercode]}
                </WeatherIcon>
                <TitleHeading>
                    <TitleDay>{returnDayName(current_weather.time)}</TitleDay>
                    <TitleDate>{getDateDDMMYYYString(current_weather.time)}</TitleDate>
                </TitleHeading>
                <LocationSelect onChange={handleSelect}>
                    {
                        locations.map(location => (
                            <option
                                key={location.value}
                                value={location.value}
                            >
                                {location.value}
                            </option>
                        ))
                    }
                </LocationSelect>
            </TitleWrapper>
            <ContentWrapper>
                <TitleWeatherSummary>
                    {weatherCodesText[current_weather.weathercode]}
                </TitleWeatherSummary>
                <ContentHeading>Temperature:</ContentHeading>
                <ContentValue>{current_weather.temperature}{daily_units.temperature_2m_max}</ContentValue>
                <ContentHeading>Wind speed:</ContentHeading>
                <ContentValue>{current_weather.windspeed}<WeatherUnit> km/h</WeatherUnit></ContentValue>
                <ContentHeading>Wind direction:</ContentHeading>
                <WindDirection windDirection={current_weather.winddirection}>
                    <img
                        src={CompassSVG}
                        alt={`Wind direction ${current_weather.winddirection} degrees`}
                    />
                </WindDirection>
            </ContentWrapper>
        </CurrentDayInfoWrapper>
    )
}

export default CurrentDayInfo