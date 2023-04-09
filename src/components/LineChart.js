import * as d3 from "d3";
import { motion } from "framer-motion";

import {
	LineChartWrapper,
	Heading,
} from './LineChart.styles'

const ChartInner = ({data}) => {
	const {hourly} = data
	const {temperature_2m, time} = hourly

	const svgOpt = {
		width: 1040,
		height: 270,
		margin: {
			top: 50,
			right: 20,
			bottom: 120,
			left: 30,
		}
	}

	let hourlyTempData = []
	temperature_2m.forEach((element, index) => {
		hourlyTempData.push({
			date: new Date(time[index]),
			temperature: element,
		})
	});

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

	let d = line(hourlyTempData)

	return (
		<LineChartWrapper>
			<Heading>Hourly Temperature:</Heading>
			<svg viewBox={`0 0 ${svgOpt.width} ${svgOpt.height}`}>
				<motion.path
					initial={{ pathLength: 0 }}
					animate={{ pathLength: 1 }}
					transition={{ duration: 1 }}
					d={d}
					fill="none"
					stroke="white"
					strokeWidth="2"
				/>
				{hourlyTempData.map((time, index) => (
					<g key={index+time}>
						<motion.circle
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.05 * index }}
							r="3"
							cx={xScale(time.date)}
							cy={yScale(time.temperature)}
							fill="white"
						/>
						<motion.text
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.15, delay: 0.05 * index }}
							x={xScale(time.date)}
							y={yScale(time.temperature) - 20}
							fill="white"
							textAnchor='middle'
						>
							{hourlyTempData[index].temperature}
						</motion.text>
						<text
							x={xScale(time.date)}
							y={svgOpt.height - 20}
							fill="white"
							textAnchor='middle'
						>
							{hourlyTempData[index].date.getHours()}
						</text>
					</g>
				))}
			</svg>
		</LineChartWrapper>
	)
}

export default ChartInner