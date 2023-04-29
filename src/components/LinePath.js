import { motion } from "framer-motion";
import * as d3 from "d3";
import { arrayOfWeatherAndTimeObjs } from "../utilities/formatWeatherData";

export const LinePath = ({svgOpt, time, data, count, refValue, xScale }) => {

	let weatherData = arrayOfWeatherAndTimeObjs(data, time, 'weatherValue')

	let yScale = d3
		.scaleLinear()
		// use d3 function to get min/max values
		.domain(d3.extent(weatherData.map(d => d.weatherValue)))
		// flip height and starting value around to fix origin problem
		.range([svgOpt.height - svgOpt.margin.bottom, svgOpt.margin.top])

	let line = d3
		.line()
		.x(d => xScale(d.date))
		.y(d => yScale(d.weatherValue))

	let lineData = line(weatherData)

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
                        cx={xScale(time.date)}
                        cy={yScale(time.weatherValue)}
                        fill={svgOpt.fillcolor[count]}
                    />
                ))}
            </g>
        </g>
    )
}