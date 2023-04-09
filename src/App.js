import { useEffect, useState } from 'react';

import CurrentDayInfo from './components/CurrentDayInfo';
import LineChart from './components/LineChart';
import DayPicker from './components/DayPicker';
import SelectedDayInfo from './components/SelectedDayInfo'

import { getWeatherData, getWeatherDayData } from './utilities/getWeatherData';
import { locations } from './utilities/locations'
import { formatDate } from './utilities/dates'

import './App.css';

function App() {

	const todaysDate = formatDate(new Date())
	const [selectedDay, setSelectedDay] = useState(todaysDate)
	const [weatherData, setWeatherData] = useState()
	const [weatherWeekData, setWeatherWeekData] = useState()
    const [currentLocation, setCurrentLocation] = useState(locations[0])

	useEffect(() => {
		getWeatherData(new Date(), setWeatherData, setWeatherWeekData, currentLocation)
		getWeatherDayData(selectedDay, setWeatherData, currentLocation)
	}, [currentLocation, selectedDay])

	return (
		<>
			{weatherData && (
				<CurrentDayInfo
					key={`CurrentDayInfo${weatherData}`}
					data={weatherData.data}
					locations={locations}
					currentLocation={currentLocation}
					setCurrentLocation={setCurrentLocation}
				/>
			)}
			{weatherWeekData && (
				<DayPicker
					key={`DayPicker${weatherWeekData}`}
					weekData={weatherWeekData.data}
					setWeatherData={setWeatherData}
					setSelectedDay={setSelectedDay}
					currentLocation={currentLocation}
				/>
			)}
			{weatherData && (
				<LineChart
					key={selectedDay}
					data={weatherData.data}
				/>
			)}
			{weatherData && (
				<SelectedDayInfo
					key={`SelectedDayInfo${weatherData}`}
					dayData={weatherData.data}
				/>
			)}
		</>
	);
}

export default App;
