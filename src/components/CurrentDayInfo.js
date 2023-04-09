import { weatherCodes } from '../utilities/weatherCodes'
import { returnDayName, getDateDDMMYYYString } from '../utilities/dates'

import {
    CurrentDayInfoWrapper,
    WeatherIcon,
    TitleWrapper,
    TitleHeading,
    LocationWrapper,
    LocationSelect,
    LocationChevBtn,
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
import ChevronSVG from '../images/chevron.svg'

const CurrentDayInfo = ({data, locations, currentLocation, setCurrentLocation}) => {
    const { current_weather, daily_units} = data

    const selectedIndex = locations.findIndex((item) => item.value === currentLocation.value)
    const isPreviousBtnDisabled = selectedIndex === 0 ? true : false
    const isNextBtnDisabled = selectedIndex < locations.length -1 ? false : true

    const handleGoPrevious = () => setCurrentLocation(locations[selectedIndex - 1])
    const handleGoNext = () => setCurrentLocation(locations[selectedIndex + 1])

    const handleSelect = (e) => {
        const locationName = e.target.value
        setCurrentLocation(locations.find(location => location.value === locationName))
    }

    return (
        <CurrentDayInfoWrapper>
            <TitleWrapper>
                <WeatherIcon>
                    {weatherCodes[current_weather.weathercode].image}
                </WeatherIcon>
                <TitleHeading>
                    <TitleDay>{returnDayName(current_weather.time)}</TitleDay>
                    <TitleDate>{getDateDDMMYYYString(current_weather.time)}</TitleDate>
                </TitleHeading>
                <LocationWrapper>
                    <LocationChevBtn
                        type="button"
                        onClick={handleGoPrevious}
                        disabled={isPreviousBtnDisabled}
                    >
                        <img
                            src={ChevronSVG}
                            alt="Previous location"
                        />
                    </LocationChevBtn>
                    <LocationSelect
                        value={currentLocation.value}
                        onChange={handleSelect}
                    >
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
                    <LocationChevBtn
                        type="button"
                        onClick={handleGoNext}
                        disabled={isNextBtnDisabled}
                    >
                        <img
                            src={ChevronSVG}
                            alt="Next location"
                        />
                    </LocationChevBtn>
                </LocationWrapper>
            </TitleWrapper>
            <ContentWrapper>
                <TitleWeatherSummary>
                    {weatherCodes[current_weather.weathercode].text}
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