import * as d3 from "d3";
import { motion } from "framer-motion";
import { arrayOfWeatherAndTimeObjs } from "../utilities/formatWeatherData";

export const LinePath = ({svgOpt, time, data, count, refValue, chartXScale }) => {

	const weatherData = arrayOfWeatherAndTimeObjs(data, time, 'weatherValue')

	const chartYScale = d3
		.scaleLinear()
		// domain = min/max of weather values
        // uses d3 extent to find those values for us
		.domain(d3.extent(weatherData.map(item => item.weatherValue)))
        // range = min/max of SVG dimensions
		// flip height and starting value around so chart Y position is at the bottom, not the top
		.range([svgOpt.height - svgOpt.margin.bottom, svgOpt.margin.top])

	const line = d3
		.line()
		.x(item => chartXScale(item.date))
		.y(item => chartYScale(item.weatherValue))

	const lineData = line(weatherData)

    return (
        <g>
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
                d={lineData}
                fill="none"
                stroke={svgOpt.strokecolor[count]}
                strokeWidth="2"
            />
            <g ref={refValue}>
                {weatherData.map((time, index) => (
                    <motion.circle
                        key={index+time}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.15, delay: 0.05 * index }}
                        r={svgOpt.chartCircleSize}
                        cx={chartXScale(time.date)}
                        cy={chartYScale(time.weatherValue)}
                        fill={svgOpt.fillcolor[count]}
                    />
                ))}
            </g>
        </g>
    )
}