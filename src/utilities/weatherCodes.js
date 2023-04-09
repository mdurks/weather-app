import png_sunny from '../images/sunny.png';
import png_sunnyToCloudy from '../images/sunny to cloudy.png';
import png_fog from '../images/fog.png';
import png_showers from '../images/showers.png';
import png_heavyRain from '../images/heavy rain.png';
import png_snow from '../images/snowy.png';
import png_thunder from '../images/thunder.png';

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

const img_clearSky = <img src={png_sunny} alt={text_clearSky} />
const img_mainlyClear = <img src={png_sunnyToCloudy} alt={text_mainlyClear} />
const img_fog = <img src={png_fog} alt={text_fog} />
const img_drizzle = <img src={png_showers} alt={text_drizzle} />
const img_freezingDrizzle = <img src={png_showers} alt={text_freezingDrizzle} />
const img_rain = <img src={png_heavyRain} alt={text_rain} />
const img_freezingRain = <img src={png_heavyRain} alt={text_freezingRain} />
const img_snowFall = <img src={png_snow} alt={text_snowFall} />
const img_snowGrains = <img src={png_snow} alt={text_snowGrains} />
const img_rainShowers = <img src={png_showers} alt={text_rainShowers} />
const img_snowShowers = <img src={png_snow} alt={text_snowShowers} />
const img_thunderstorm = <img src={png_thunder} alt={text_thunderstorm} />
const img_thunderstormHail = <img src={png_thunder} alt={text_thunderstormHail} />

export const weatherCodes = {
    0: { image: img_clearSky, text: text_clearSky },
    1: { image: img_mainlyClear, text: text_mainlyClear },
    2: { image: img_mainlyClear, text: text_mainlyClear },
    3: { image: img_mainlyClear, text: text_mainlyClear },
    45: { image: img_fog, text: text_fog },
    48: { image: img_fog, text: text_fog },
    51: { image: img_drizzle, text: text_drizzle },
    53: { image: img_drizzle, text: text_drizzle },
    55: { image: img_drizzle, text: text_drizzle },
    56: { image: img_freezingDrizzle, text: text_freezingDrizzle },
    57: { image: img_freezingDrizzle, text: text_freezingDrizzle },
    61: { image: img_rain, text: text_rain },
    63: { image: img_rain, text: text_rain },
    65: { image: img_rain, text: text_rain },
    66: { image: img_freezingRain, text: text_freezingRain },
    67: { image: img_freezingRain, text: text_freezingRain },
    71: { image: img_snowFall, text: text_snowFall },
    73: { image: img_snowFall, text: text_snowFall },
    75: { image: img_snowFall, text: text_snowFall },
    77: { image: img_snowGrains, text: text_snowGrains },
    80: { image: img_rainShowers, text: text_rainShowers },
    81: { image: img_rainShowers, text: text_rainShowers },
    82: { image: img_rainShowers, text: text_rainShowers },
    85: { image: img_snowShowers, text: text_snowShowers },
    86: { image: img_snowShowers, text: text_snowShowers },
    95: { image: img_thunderstorm, text: text_thunderstorm },
    96: { image: img_thunderstormHail, text: text_thunderstormHail },
    99: { image: img_thunderstormHail, text: text_thunderstormHail },
}