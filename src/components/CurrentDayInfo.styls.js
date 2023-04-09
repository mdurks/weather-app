import styled from "styled-components"
import { mediaQuery } from "../utilities/mediaQueries"

export const CurrentDayInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1040px;
    margin: auto;
    padding: 20px;
    text-align: center;
    border-radius: 15px;
    background: linear-gradient(318deg, rgb(88, 207, 240) 0%, rgb(0 119 199) 80%);
    box-shadow: 5px 5px 40px 14px rgba(255,255,255,0.4);

    ${mediaQuery.min_tablet} {
        flex-direction: row;
        padding: 20px 120px 40px;
    }
`

export const TitleWrapper = styled.div`
    flex: 1 1 50%;

    ${mediaQuery.min_tablet} {
        padding: 0;
    }
`

export const ContentWrapper = styled.div`
    flex: 1 1 50%;
    display: flex;
    flex-direction: row;
    place-content: center;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 0 10px;

    ${mediaQuery.min_tablet} {
        padding: 0;
    }
`

export const ContentHeading = styled.p`
    margin: 0;
    padding: 0 5px 0 0;
    flex: 1 1 50%;
    text-align: right;
`

export const ContentValue = styled.p`
    margin: 10px 0;
    padding: 0 0 0 5px;
    font-size: 32px;
    font-weight: bold;
    line-height: 32px;
    flex: 1 1 50%;
    text-align: left;

    ${mediaQuery.min_tablet} {
        margin: 14px 0;
        padding: 0;
        font-size: 35px;
        line-height: 35px;
    }
`

export const WeatherUnit = styled.span`
    font-size: 12px;
`

export const TitleHeading = styled.h1`
`

export const LocationSelect = styled.select`
    width: 75%;
    padding: 12px 10px;
    border-radius: 8px;
    border: none;

    ${mediaQuery.min_tablet} {
        padding: 7px 10px;
    }
`

export const TitleDay = styled.div`
    font-size: 35px;
`

export const TitleDate = styled.div`
    font-size: 18px;
`

export const TitleWeatherSummary = styled.p`
    flex: 1 0 100%;
    font-weight: bold;
`

export const WindDirection = styled.span`
    flex: 1 1 50%;
    padding: 0 0 0 5px;
    text-align: left;

    img {
        width: 40px;
        height: 40px;
        rotate: ${props => props.windDirection}deg;
        transition: all ease .75s;
    }
`

export const WeatherIcon = styled.div`
    width: 55%;
    margin: 0 auto -80px;

    img {
        width: 100%;
        height: auto;
        margin-top: -20px;
    }
`