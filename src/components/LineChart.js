import { useState } from 'react'
import * as d3 from "d3";
import { motion } from "framer-motion";

import {
	LineChartWrapper,
	Heading,
	Tooltip,
} from './LineChart.styles'
import { useEffect } from "react";

const ChartInner = ({ data }) => {
	const { hourly } = data
	const { temperature_2m, relativehumidity_2m, precipitation_probability, time } = hourly

	const [isTablet, setIsTablet] = useState(true)

	const svgOpt = {
		width: 1040,
		height: 270,
		margin: {
			top: 50,
			right: 20,
			bottom: 120,
			left: 30,
		},
		strokeColour: ["white", "#33eb33", "yellow"],
		fillColour: ["white", "#33eb33", "yellow"],
		chartCircleSize: isTablet ? "6" : "3.5",
		chartCircleSizeActive: isTablet ? "20" : "9",
	}

	svgOpt.innerWidth = svgOpt.width - svgOpt.margin.left - svgOpt.margin.right

	const [toolTipVisible, setToolTipVisible] = useState(isTablet ? true : false)
	const [toolTipHour, setToolTipHour] = useState()
	const [toolTipTemp, setToolTipTemp] = useState()
	const [toolTipHumidity, setToolTipHumidity] = useState()
	const [toolTipRainChance, setToolTipRainChance] = useState()

	const [toolTipX, setToolTipX] = useState()
	const [toolTipY, setToolTipY] = useState()

	let hoverRectangleLocations = [0]
	const [touchedRectanglePrevious, setTouchedRectanglePrevious] = useState(0)




	// Temperature:

	let hourlyTempData = []
	temperature_2m.forEach((element, index) => {
		hourlyTempData.push({
			date: new Date(time[index]),
			temperature: element,
		})
	});

	const hoverRectangleWidth = (svgOpt.innerWidth / hourlyTempData.length) + 2

	let xScale = d3
	.scaleLinear()
	.domain([hourlyTempData[0].date, hourlyTempData.at(-1).date])
	.range([svgOpt.margin.left, svgOpt.width - svgOpt.margin.right])

	let yScale = d3
		.scaleLinear()
		// use d3 function to get min/max values
		.domain(d3.extent(hourlyTempData.map(d => d.temperature)))
		// flip height and starting value around to fix origin problem
		.range([svgOpt.height - svgOpt.margin.bottom, svgOpt.margin.top])

	let line = d3
		.line()
		.x(d => xScale(d.date))
		.y(d => yScale(d.temperature))

	let lineData = line(hourlyTempData)



	// Humidity:

	let hourlyHumidityData = []
	relativehumidity_2m.forEach((element, index) => {
		hourlyHumidityData.push({
			date: new Date(time[index]),
			humidity: element,
		})
	});

	let xScaleHumidity = d3
	.scaleLinear()
	.domain([hourlyHumidityData[0].date, hourlyHumidityData.at(-1).date])
	.range([svgOpt.margin.left, svgOpt.width - svgOpt.margin.right])

	let yScaleHumidity = d3
		.scaleLinear()
		// use d3 function to get min/max values
		.domain(d3.extent(hourlyHumidityData.map(d => d.humidity)))
		// flip height and starting value around to fix origin problem
		.range([svgOpt.height - svgOpt.margin.bottom, svgOpt.margin.top])

	let lineHumidity = d3
		.line()
		.x(d => xScaleHumidity(d.date))
		.y(d => yScaleHumidity(d.humidity))

	let lineDataHumidity = lineHumidity(hourlyHumidityData)



	// Precipitation Chance:
	let hourlyPChanceData = []

	precipitation_probability.forEach((element, index) => {
		hourlyPChanceData.push({
			date: new Date(time[index]),
			pChance: element,
		})
	});

	let xScalePChance = d3
		.scaleLinear()
		.domain([hourlyPChanceData[0].date, hourlyPChanceData.at(-1).date])
		.range([svgOpt.margin.left, svgOpt.width - svgOpt.margin.right])

	let yScalePChance = d3
		.scaleLinear()
		// use d3 function to get min/max values
		.domain(d3.extent(hourlyPChanceData.map(d => d.pChance)))
		// flip height and starting value around to fix origin problem
		.range([svgOpt.height - svgOpt.margin.bottom, svgOpt.margin.top])

	let linePChance = d3
		.line()
		.x(d => xScalePChance(d.date))
		.y(d => yScalePChance(d.pChance))

	let lineDataPChance = linePChance(hourlyPChanceData)


	const setHourOnChart = (hour) => {
		setTouchedRectanglePrevious(hour)
		resetChartCircles(touchedRectanglePrevious)
		setToolTipVisible(true)
		setToolTipHour(hour)
		setToolTipTemp(hourlyTempData[hour].temperature)
		setToolTipHumidity(hourlyHumidityData[hour].humidity)
		setToolTipRainChance(hourlyPChanceData[hour].pChance)
		document.getElementById('tempCircles').children[hour].setAttribute('r', svgOpt.chartCircleSizeActive)
		document.getElementById('humidityCircles').children[hour].setAttribute('r', svgOpt.chartCircleSizeActive)
		document.getElementById('pChanceCircles').children[hour].setAttribute('r', svgOpt.chartCircleSizeActive)
	}

	const resetChartCircles = (hour) => {
		document.getElementById('tempCircles').children[hour].setAttribute('r', svgOpt.chartCircleSize)
		document.getElementById('humidityCircles').children[hour].setAttribute('r', svgOpt.chartCircleSize)
		document.getElementById('pChanceCircles').children[hour].setAttribute('r', svgOpt.chartCircleSize)
	}

	const mouseOverHour = (hour) => setHourOnChart(hour)
	const mouseOutHour = (hour) => !isTablet && resetChartCircles(hour)

	const moveToolTip = (e) => {
		const svgLeftPos = document.getElementById('lineChartSVG').getBoundingClientRect().left
		const mouseToSvgOffset = e.clientX - svgLeftPos
		if (mouseToSvgOffset < 320) setToolTipX(e.clientX + 70)
		else setToolTipX(e.clientX - 280)
		setToolTipY(e.clientY - 50)
	}

	const touchOver = (e) => {
		resetChartCircles(touchedRectanglePrevious)
		const touchX = e.touches[0].clientX - (svgOpt.margin.left)
		const touchedRectangle = hoverRectangleLocations.findIndex((item, index) => item > touchX)
		if (touchedRectangle >= 0) {
			setTouchedRectanglePrevious(touchedRectangle)
			setHourOnChart(touchedRectangle)
		}
	}

	useEffect(() => {
		if(window.innerWidth < 768) mouseOverHour(12)
	}, [])

	useEffect(() => {
		if (window.innerWidth > 768) {
			setIsTablet(false)
			setToolTipVisible(false)
		}
	}, [isTablet])

	useEffect(() => {
		const hoverRectangleWidth = Math.round(document.getElementById('hoverRectangles').children[0].getBoundingClientRect().width)
		for (let i = 1; i < 24; i++) {
			hoverRectangleLocations[i] = hoverRectangleWidth + hoverRectangleLocations[i-1]
		}
	})


	return (
		<LineChartWrapper>
			<Heading>
				<span style={{ color: svgOpt.fillColour[0]}}>
					Temperature
				</span>
				  &nbsp;/&nbsp;
				<span style={{ color: svgOpt.fillColour[1]}}>
				 	Humidity
				</span>
				   &nbsp;/&nbsp;
				<span style={{ color: svgOpt.fillColour[2]}}>
				 	Rain Chance:
				</span>
			</Heading>

			<svg
				id="lineChartSVG"
				viewBox={`0 0 ${svgOpt.width} ${svgOpt.height}`}
				onMouseOut={() => !isTablet && setToolTipVisible(false)}
				onMouseMove={(e) => moveToolTip(e)}
				onTouchMove={(e) => touchOver(e)}
			>

				{/* Temperature: */}

				<motion.path
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 1 }}
					d={lineData}
					fill="none"
					stroke={svgOpt.strokeColour[0]}
					strokeWidth="2"
				/>
				<g id="tempCircles">
					{hourlyTempData.map((time, index) => (
						<motion.circle
							key={index+time}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.05 * index }}
							r={svgOpt.chartCircleSize}
							cx={xScale(time.date)}
							cy={yScale(time.temperature)}
							fill={svgOpt.fillColour[0]}
						/>
					))}
				</g>


				{/* Humidity: */}

				<motion.path
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 1, delay: 0.2 }}
					d={lineDataHumidity}
					fill="none"
					stroke={svgOpt.strokeColour[1]}
					strokeWidth="2"
				/>
				<g id="humidityCircles">
					{hourlyHumidityData.map((time, index) => (
						<motion.circle
							key={index+time+'_humidity'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.05 * index }}
							r={svgOpt.chartCircleSize}
							cx={xScaleHumidity(time.date)}
							cy={yScaleHumidity(time.humidity)}
							fill={svgOpt.fillColour[1]}
						/>
					))}
				</g>

				{/* Precipitation Chance: */}

				{precipitation_probability && (
					<motion.path
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{ duration: 1, delay: 0.4 }}
						d={lineDataPChance}
						fill="none"
						stroke={svgOpt.strokeColour[2]}
						strokeWidth="2"
					/>
				)}
				<g id="pChanceCircles">
					{hourlyPChanceData.map((time, index) => (
						<motion.circle
							key={index+time+'_pchance'}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.05 * index }}
							r={svgOpt.chartCircleSize}
							cx={xScalePChance(time.date)}
							cy={yScalePChance(time.pChance)}
							fill={svgOpt.fillColour[2]}
						/>
					))}
				</g>

				{/* Hover rectangle for tooltip */}
				<g id="hoverRectangles">
					{hourlyTempData.map((time, index) => {
						return (
							<g key={index+time+'hoverRectangle'}>
								<rect
									width={hoverRectangleWidth}
									height="100%"
									x={xScale(time.date) - (hoverRectangleWidth / 2)}
									y="0"
									fill="#ffffff00"
									onMouseOver={() => mouseOverHour(index)}
									onMouseOut={() => mouseOutHour(index)}
								/>
								<text
									x={xScale(time.date)}
									y={svgOpt.height - 20}
									fill={svgOpt.fillColour[0]}
									textAnchor='middle'
								>
									{hourlyTempData[index].date.getHours()}
								</text>
							</g>
						)})
					}
				</g>
			</svg>
			{toolTipVisible && (
				<Tooltip
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					style={{
						left: `${toolTipX}px`,
						top: `${toolTipY}px`,
				}}>
					{isTablet && (<small>Tap chart for stats</small>)}
					{isTablet && (
						<p style={{ color: "#b4e6ff"}}>Hour : <span>{toolTipHour}:00</span></p>
					)}
					<p style={{ color: svgOpt.fillColour[0]}}>Temperature : <span>{toolTipTemp}°C</span></p>
					<p style={{ color: svgOpt.fillColour[2]}}>Rain Chance : <span>{toolTipRainChance}%</span></p>
					<p style={{ color: svgOpt.fillColour[1]}}>Humidity : <span>{toolTipHumidity}%</span></p>
				</Tooltip>
			)}
		</LineChartWrapper>
	)
}

export default ChartInner