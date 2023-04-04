import * as d3 from "d3";
import { motion } from "framer-motion";
import { weatherCodes } from '../utilities/weatherCodes'

const ChartInner = ({data, svgOpt}) => {
		// console.log('data', data);
		const {hourly} = data
		const {temperature_2m, time, weathercode} = hourly

		let hourlyTempData = []
		temperature_2m.forEach((element, index) => {
			hourlyTempData.push({
				date: new Date(time[index]),
				temperature: element,
			})
		});

		let xScale = d3
		.scaleLinear()
		// use d3 function to get min/max values
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
			<>
				<svg viewBox={`0 0 ${svgOpt.width} ${svgOpt.height}`} width={svgOpt.width} height={svgOpt.height}>
					<motion.path
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{ duration: 1 }}
						d={d}
						fill="none"
						stroke="black"
						strokeWidth="2"
					/>
					{/* {yScale.ticks().map((temp) => (
						<g
							transform={`translate(0,${yScale(temp)})`}
							key={temp}
						>
							<line
								x1={svgOpt.margin.left}
								x2={width - svgOpt.margin.right}
								stroke='black'
								// strokeDasharray="1,3"
							/>
							<text
								alignmentBaseline='middle'
							>
								{temp}
							</text>
						</g>
					))} */}
					{/* {xScale.ticks().map((date, index) => (
						<g
							transform={`translate(${xScale(date)},${height-5})`}
							key={date}
						>
							<text>
								{hourlyTempData[index].date.getHours()}
							</text>
						</g>
					))} */}
					{hourlyTempData.map((time, index) => (
						<g key={index+time}>
							<motion.circle
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.15, delay: 0.05 * index }}
								r="3"
								cx={xScale(time.date)}
								cy={yScale(time.temperature)}
							/>
							<motion.text
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.15, delay: 0.05 * index }}
								x={xScale(time.date)}
								y={yScale(time.temperature) - 20}
								textAnchor='middle'
								>
								{hourlyTempData[index].temperature}
							</motion.text>
							<text
								className='weatherIcon'
								x={xScale(time.date)}
								y={svgOpt.height - 60}
								textAnchor='middle'
							>
								{ weathercode[index-1] !== weathercode[index] && weatherCodes[weathercode[index]] }
							</text>
							<text
								x={xScale(time.date)}
								y={svgOpt.height - 20}
								textAnchor='middle'
							>
								{hourlyTempData[index].date.getHours()}
							</text>
						</g>
					))}
				</svg>
			</>
		)
	}

    export default ChartInner