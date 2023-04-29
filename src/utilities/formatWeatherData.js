export const arrayOfWeatherAndTimeObjs = (data, time, weatherType) => {
    const tempArr = []

    data.forEach((element, index) => {
		tempArr.push({
			date: new Date(time[index]),
			[weatherType]: element,
		})
	})

    return tempArr
}