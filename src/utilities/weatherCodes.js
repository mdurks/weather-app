
// const clearSky = 'Clear sky'
// const mainlyClear = 'Mainly clear, partly cloudy, and overcast'
// const fog = 'Fog and depositing rime fog'
// const drizzle = 'Drizzle: Light, moderate, and dense intensity'
// const freezingDrizzle = 'Freezing Drizzle: Light and dense intensity'
// const rain = 'Rain: Slight, moderate and heavy intensity'
// const freezingRain = 'Freezing Rain: Light and heavy intensity'
// const snowFall = 'Snow fall: Slight, moderate, and heavy intensity'
// const snowGrains = 'Snow grains'
// const rainShowers = 'Rain showers: Slight, moderate, and violent'
// const snowShowers = 'Snow showers slight and heavy'
// const thunderstorm = 'Thunderstorm: Slight or moderate'
// const thunderstormHail = 'Thunderstorm with slight and heavy hail'

const clearSky = '☀'
const mainlyClear = '🌥'
const fog = '🌫'
const drizzle = '🌧'
const freezingDrizzle = '🌨'
const rain = '🌧'
const freezingRain = '🌧'
const snowFall = '🌨'
const snowGrains = '🌨'
const rainShowers = '🌧'
const snowShowers = '🌨'
const thunderstorm = '🌩'
const thunderstormHail = '🌩'

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
    77:	snowGrains,
    80: rainShowers,
    81: rainShowers,
    82: rainShowers,
    85: snowShowers,
    86: snowShowers,
    95:	thunderstorm,
    96: thunderstormHail,
    99: thunderstormHail,
}