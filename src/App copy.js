import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { select, line, axisBottom, scaleLinear } from "d3"
import './App.css';

function App() {

	// const [weatherData, setWeatherData] = useState()
	let weatherData

	axios.get('https://api.open-meteo.com/v1/forecast?latitude=53.48&longitude=-2.24&hourly=temperature_2m,relativehumidity_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=Europe%2FLondon')
	.then(function (response) {
		weatherData = response
		// setWeatherData(response)
	})
	.catch(function (error) {
		console.log(error);
	})

	const logData = () => {
		console.log('weatherData', weatherData.data);
	}


	const timeData = ["2023-04-02T00:00","2023-04-02T01:00","2023-04-02T02:00","2023-04-02T03:00","2023-04-02T04:00","2023-04-02T05:00","2023-04-02T06:00","2023-04-02T07:00","2023-04-02T08:00","2023-04-02T09:00","2023-04-02T10:00","2023-04-02T11:00","2023-04-02T12:00","2023-04-02T13:00","2023-04-02T14:00","2023-04-02T15:00","2023-04-02T16:00","2023-04-02T17:00","2023-04-02T18:00","2023-04-02T19:00","2023-04-02T20:00","2023-04-02T21:00","2023-04-02T22:00","2023-04-02T23:00"]

	const svgRef = useRef()
	const svgOpt = {
		width: 800,
		height: 300,
		labelYOffset: 15,
	}

	// const [testData] = useState([25, 30, 45, 60, 20, 65, 75])
	const [testData] = useState([7.3,6.9,6.6,6.5,6.4,6.4,6.5,6.6,6.7,7.2,7.8,8.5,9.4,10.2,10.8,11.2,11.3,11.1,10.6,9.7,8.5,7.3,6.2,5.4])

	// define x scale based upon data and svg width
	const xScale = scaleLinear()
	.domain([0, testData.length -1])
	.range([0, svgOpt.width])
	console.log('xScale', xScale.ticks());

	// define y scale based upon largest value in the data and svg height
	const yScale = scaleLinear()
	.domain([0, Math.max(...testData)])
	.range([svgOpt.height, 0])


	useEffect(() => {
		// console.log('testData', testData);
		if(!testData) return

		// get the svg element ref
		const svg = select(svgRef.current)

		const xAxis = axisBottom(xScale)
		svg
			.select('.x-axis')
			.style("transform", `translateY(${svgOpt.height}px)`)
			.call(xAxis)

		// set basic svg properties
		svg
			.attr('width', svgOpt.width)
			.attr('height', svgOpt.height)
			.style('background', 'teal')
			.style('margin', '30')
			.style('overflow', 'visible')

		// define the line using data
		const myLine = line()
			.x((value, index) => xScale(index))
			.y(yScale)

		// apply the line to the svg
		svg
			.selectAll(".line")
			.data([testData])
			.join("path")
			.attr("class", 'line')
			.attr("d", myLine)
			.attr("fill", 'none')
			.attr("stroke", "blue")

	}, [testData, xScale, yScale, svgOpt.width, svgOpt.height])

	return (
		<div className="App">
			<div><button type='button' onClick={logData}>Data</button></div>
			<svg ref={svgRef}>
				<g className='x-axis'></g>
				<g className='labels'>
					{testData.map((label, index) => (
							<text
								key={timeData[index] + testData[index]}
								x={xScale(index)}
								y={yScale(testData[index]) - svgOpt.labelYOffset}
							>
								{testData[index]}
							</text>
					))}
				</g>
			</svg>
		</div>
	);
}

export default App;
