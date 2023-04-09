
// const clearSky = '☀'
// const mainlyClear = '🌥'
// const fog = '🌫'
// const drizzle = '🌧'
// const freezingDrizzle = '🌨'
// const rain = '🌧'
// const freezingRain = '🌧'
// const snowFall = '🌨'
// const snowGrains = '🌨'
// const rainShowers = '🌧'
// const snowShowers = '🌨'
// const thunderstorm = '🌩'
// const thunderstormHail = '🌩'

import img_sunny from '../images/sunny.png';
import img_sunnyToCloudy from '../images/sunny to cloudy.png';
import img_fog from '../images/fog.png';
import img_showers from '../images/showers.png';
import img_heavyRain from '../images/heavy rain.png';
import img_snow from '../images/snowy.png';
import img_thunder from '../images/thunder.png';

const clearSky = <img src={img_sunny} alt="" />
const mainlyClear = <img src={img_sunnyToCloudy} alt="" />
const fog = <img src={img_fog} alt="" />
const drizzle = <img src={img_showers} alt="" />
const freezingDrizzle = <img src={img_showers} alt="" />
const rain = <img src={img_heavyRain} alt="" />
const freezingRain = <img src={img_heavyRain} alt="" />
const snowFall = <img src={img_snow} alt="" />
const snowGrains = <img src={img_snow} alt="" />
const rainShowers = <img src={img_showers} alt="" />
const snowShowers = <img src={img_snow} alt="" />
const thunderstorm = <img src={img_thunder} alt="" />
const thunderstormHail = <img src={img_thunder} alt="" />

export const weatherCodes = {
    0: clearSky,
    1: mainlyClear,
    2: mainlyClear,
    3: mainlyClear,
    45: fog,
    48: fog,
    51: drizzle,
    53: drizzle,
    55: drizzle,
    56: freezingDrizzle,
    57: freezingDrizzle,
    61: rain,
    63: rain,
    65: rain,
    66: freezingRain,
    67: freezingRain,
    71: snowFall,
    73: snowFall,
    75: snowFall,
    77: snowGrains,
    80: rainShowers,
    81: rainShowers,
    82: rainShowers,
    85: snowShowers,
    86: snowShowers,
    95: thunderstorm,
    96: thunderstormHail,
    99: thunderstormHail,
}

const text_clearSky = 'Clear sky'
const text_mainlyClear = 'Mainly clear, partly cloudy, and overcast'
const text_fog = 'Fog and depositing rime fog'
const text_drizzle = 'Drizzle: Light, moderate, and dense intensity'
const text_freezingDrizzle = 'Freezing Drizzle: Light and dense intensity'
const text_rain = 'Rain: Slight, moderate and heavy intensity'
const text_freezingRain = 'Freezing Rain: Light and heavy intensity'
const text_snowFall = 'Snow fall: Slight, moderate, and heavy intensity'
const text_snowGrains = 'Snow grains'
const text_rainShowers = 'Rain showers: Slight, moderate, and violent'
const text_snowShowers = 'Snow showers slight and heavy'
const text_thunderstorm = 'Thunderstorm: Slight or moderate'
const text_thunderstormHail = 'Thunderstorm with slight and heavy hail'

export const weatherCodesText = {
    0: text_clearSky,
    1: text_mainlyClear,
    2: text_mainlyClear,
    3: text_mainlyClear,
    45: text_fog,
    48: text_fog,
    51: text_drizzle,
    53: text_drizzle,
    55: text_drizzle,
    56: text_freezingDrizzle,
    57: text_freezingDrizzle,
    61: text_rain,
    63: text_rain,
    65: text_rain,
    66: text_freezingRain,
    67: text_freezingRain,
    71: text_snowFall,
    73: text_snowFall,
    75: text_snowFall,
    77: text_snowGrains,
    80: text_rainShowers,
    81: text_rainShowers,
    82: text_rainShowers,
    85: text_snowShowers,
    86: text_snowShowers,
    95: text_thunderstorm,
    96: text_thunderstormHail,
    99: text_thunderstormHail,
}