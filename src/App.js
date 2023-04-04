import { useEffect, useState } from 'react';
// import { motion } from "framer-motion";

import CurrentDayInfo from './components/CurrentDayInfo';
import LineChart from './components/LineChart';
import DayPicker from './components/DayPicker';
import SelectedDayInfo from './components/SelectedDayInfo'

import { getWeatherData } from './utilities/getWeatherData';

import './App.css';

function App() {

	const [weatherData, setWeatherData] = useState()
	// eslint-disable-next-line no-unused-vars
	const [weatherWeekData, setWeatherWeekData] = useState()

	const svgLineChartOpt = {
		width: 800,
		height: 270,
		margin: {
			top: 50,
			right: 20,
			bottom: 120,
			left: 30,
		}
	}

	useEffect(() => {
		getWeatherData(new Date(), setWeatherData, setWeatherWeekData)
	}, [])

	return (
		<>
			{weatherData && (
				<CurrentDayInfo
					key={`CurrentDayInfo${weatherData}`}
					data={weatherData.data}
					/>
			)}
			{weatherWeekData && (
				<DayPicker
					key={`DayPicker${weatherWeekData}`}
					weekData={weatherWeekData.data}
					setWeatherData={setWeatherData}
				/>
			)}
			{weatherData && (
				<LineChart
					key={weatherData.data}
					data={weatherData.data}
					svgOpt={svgLineChartOpt}
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
