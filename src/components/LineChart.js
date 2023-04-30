import { useState, useRef, useEffect } from 'react'
import * as d3 from "d3";
import { LinePath } from './LinePath';
import { arrayOfWeatherAndTimeObjs } from '../utilities/formatWeatherData';

import {
	LineChartWrapper,
	Heading,
	HeadingItem,
	Tooltip,
	TooltipItem,
} from './LineChart.styles'

const ChartInner = ({ data }) => {
	const { hourly } = data
	const { temperature_2m, relativehumidity_2m, precipitation_probability, time } = hourly

	const [isTablet, setIsTablet] = useState(true)

	const [toolTipVisible, setToolTipVisible] = useState(isTablet ? true : false)
	const [toolTipHour, setToolTipHour] = useState()
	const [toolTipTemp, setToolTipTemp] = useState()
	const [toolTipHumidity, setToolTipHumidity] = useState()
	const [toolTipRainChance, setToolTipRainChance] = useState()
	const [toolTipX, setToolTipX] = useState()
	const [toolTipY, setToolTipY] = useState()

	let hoverRectangleLocations = [0]
	const [touchedRectanglePrevious, setTouchedRectanglePrevious] = useState(0)

	const svgOpt = {
		width: 1040,
		innerWidth: undefined,
		height: 270,
		margin: {
			top: 50,
			right: 20,
			bottom: 120,
			left: 30,
		},
		strokecolor: ["white", "#33eb33", "yellow", "#b4e6ff"],
		fillcolor: ["white", "#33eb33", "yellow", "#b4e6ff"],
		chartCircleSize: isTablet ? "6" : "4",
		chartCircleSizeActive: isTablet ? "20" : "9",
	}

	svgOpt.innerWidth = svgOpt.width - svgOpt.margin.left - svgOpt.margin.right

	const hoverRectangleWidth = (svgOpt.innerWidth / temperature_2m.length) + 2

	// Chart Refs:

	const temperatureRef = useRef(null);
	const humidityRef = useRef(null);
	const pChanceRef = useRef(null);
	const hoverRectanglesRef = useRef(null);
	const lineChartSVGRef = useRef(null);

	// Weather Charts Line Data:

	const hourlyTempData = arrayOfWeatherAndTimeObjs(temperature_2m, time, 'temperature')
	const hourlyHumidityData = arrayOfWeatherAndTimeObjs(relativehumidity_2m, time, 'humidity')
	const hourlyPChanceData = arrayOfWeatherAndTimeObjs(precipitation_probability, time, 'pChance')

	const chartXScale = d3
		.scaleLinear()
		.domain([hourlyTempData[0].date, hourlyTempData.at(-1).date])
		.range([svgOpt.margin.left, svgOpt.width - svgOpt.margin.right])

	// Define Charts to show:

	const lineCharts = [
		{ id: "temperature", data: temperature_2m, chartXScale, ref: temperatureRef },
		{ id: "humidity", data: relativehumidity_2m, chartXScale, ref: humidityRef },
		{ id: "pChance", data: precipitation_probability, chartXScale, ref: pChanceRef },
	]


	// Functions:

	const setHourOnChart = (hour) => {
		setTouchedRectanglePrevious(hour)
		resetChartCircles(touchedRectanglePrevious)
		setToolTipVisible(true)
		setToolTipHour(hour)
		setToolTipTemp(hourlyTempData[hour].temperature)
		setToolTipHumidity(hourlyHumidityData[hour].humidity)
		setToolTipRainChance(hourlyPChanceData[hour].pChance)
		lineCharts.forEach(chart => {
			const target = chart.ref.current
			target.children[hour].setAttribute('r', svgOpt.chartCircleSizeActive)
		})
	}

	const resetChartCircles = (hour) => {
		lineCharts.forEach(chart => {
			const target = chart.ref.current
			target.children[hour].setAttribute('r', svgOpt.chartCircleSize)
		})
	}

	const mouseOverHour = (hour) => setHourOnChart(hour)
	const mouseOutHour = (hour) => !isTablet && resetChartCircles(hour)

	const moveToolTip = (e) => {
		const svgLeftPos = lineChartSVGRef.current.getBoundingClientRect().left
		const mouseToSvgOffset = e.clientX - svgLeftPos
		if (mouseToSvgOffset < 320) setToolTipX(e.clientX + 70)
		else setToolTipX(e.clientX - 280)
		setToolTipY(e.clientY - 50)
	}

	const touchOver = (e) => {
		resetChartCircles(touchedRectanglePrevious)
		const touchX = e.touches[0].clientX - (svgOpt.margin.left)
		const touchedRectangle = hoverRectangleLocations.findIndex(item => item > touchX)
		if (touchedRectangle >= 0) {
			setTouchedRectanglePrevious(touchedRectangle)
			setHourOnChart(touchedRectangle)
		}
	}


	// Effects:

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
		const hoverRectangleWidth = Math.round(
			hoverRectanglesRef.current.children[0].getBoundingClientRect().width
		)
		for (let i = 1; i < 24; i++) {
			hoverRectangleLocations[i] = hoverRectangleWidth + hoverRectangleLocations[i-1]
		}
	})

	return (
		<LineChartWrapper>
			<Heading>
				<HeadingItem color={svgOpt.fillcolor[0]}>Hourly: Temperature</HeadingItem>{' / '}
				<HeadingItem color={svgOpt.fillcolor[1]}>Humidity</HeadingItem>{' / '}
				<HeadingItem color={svgOpt.fillcolor[2]}>Rain Chance</HeadingItem>
			</Heading>

			<svg
				ref={lineChartSVGRef}
				viewBox={`0 0 ${svgOpt.width} ${svgOpt.height}`}
				onMouseOut={() => !isTablet && setToolTipVisible(false)}
				onMouseMove={(e) => moveToolTip(e)}
				onTouchMove={(e) => touchOver(e)}
			>

				{/* Draw all the charts */}
				{lineCharts.map((chart, index) => (
					<LinePath
						key={chart.id}
						svgOpt={svgOpt}
						time={time}
						data={chart.data}
						count={index}
						refValue={chart.ref}
						chartXScale={chart.chartXScale}
					/>
				))}

				<g ref={hoverRectanglesRef}>
					{hourlyTempData.map((time, index) => {
						return (
							<g key={`${index}hoverRectangle`}>
								{/* Rectangle to catch hover event for tooltip */}
								<rect
									width={hoverRectangleWidth}
									height="100%"
									x={chartXScale(time.date) - (hoverRectangleWidth / 2)}
									y="0"
									fill="#ffffff00"
									onMouseOver={() => mouseOverHour(index)}
									onMouseOut={() => mouseOutHour(index)}
								/>
								{/* Hour number on X axis */}
								<text
									x={chartXScale(time.date)}
									y={svgOpt.height - 20}
									fill={svgOpt.fillcolor[0]}
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
					<TooltipItem color={svgOpt.fillcolor[3]}>
						Hour : <span>{toolTipHour}:00</span>
					</TooltipItem>
					<TooltipItem color={svgOpt.fillcolor[0]}>
						Temperature : <span>{toolTipTemp}°C</span>
					</TooltipItem>
					<TooltipItem color={svgOpt.fillcolor[2]}>
						Rain Chance : <span>{toolTipRainChance}%</span>
					</TooltipItem>
					<TooltipItem color={svgOpt.fillcolor[1]}>
						Humidity : <span>{toolTipHumidity}%</span>
					</TooltipItem>
				</Tooltip>
			)}
		</LineChartWrapper>
	)
}

export default ChartInner