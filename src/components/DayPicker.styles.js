import styled from "styled-components"
import { mediaQuery } from "../utilities/mediaQueries"

export const DayPickerWrapper = styled.div`
    position: relative;
    height: 190px;
    width: 100%;
    max-width: 1036px;
    margin: 20px auto 0;
    padding: 20px 0;
    text-align: center;
    overflow-x: auto;
    overflow-y: hidden;

    ${mediaQuery.min_tablet} {
        height: 220px;
    }
`

export const ButtonContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 190px;
    width: 1036px;

    ${mediaQuery.min_tablet} {
        height: 220px;
    }

    button:first-of-type {
        margin-left: 0;
    }
    button:last-of-type {
        margin-right: 0;
    }
`

export const DayButton = styled.button`
    position: relative;
    margin: 7px;
    padding: 12px;
    background: rgb(255 255 255 / 15%);
    border: none;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 10px;
    cursor: pointer;
    color: white;
    font-size: 16px;
    transition: all ease .3s;

    &.activeButton,
    &:hover,
    &:focus {
        background: rgb(255 255 255 / 50%);
        border: 1px solid rgb(255 255 255 / 70%);
    }

    &.activeButton:before {
        content: ' ';
        position: absolute;
        bottom: -15px;
        left: calc(50% - 15px);
        width: 0;
        height: 0;
        border-width: 0 15px 15px 15px;
        border-color: transparent transparent #FFFFFF transparent;
        border-style: solid;
        transform: rotate(180deg);
    }
`

export const WeatherImg = styled.div`
    margin: -20px auto 0;

    ${mediaQuery.min_tablet} {
        margin: -10px auto 0;
    }
`

export const DayText = styled.p`
    margin: -20px auto 10px;
    font-weight: bold;

    ${mediaQuery.min_tablet} {
        margin: -10px auto 10px;
    }
`

export const TemperatureWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    margin: auto;
`

export const TempHigh = styled.p`
    margin: 0;
    font-size: 22px;
    font-weight: bold;
`

export const TempLow = styled.p`
    margin: 0;
    font-size: 14px;
`

export const TempUnit = styled.span`
    padding: 0 0 0 1px;
    font-size: 12px;
    vertical-align: top;
`