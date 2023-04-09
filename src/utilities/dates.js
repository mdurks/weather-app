export const formatDate = (date) => {
    const year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day
    return `${year}-${month}-${day}`
}

export const getFutureDateByDays = (numberOfDaysTime) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + numberOfDaysTime);
    return formatDate(newDate)
}

export const getTodaysDate = () => {
    const newDate = new Date();
    return formatDate(newDate)
}

export const returnDayName = (date) => {
    const newDate = new Date(date)
    const day = newDate.getDay()
    switch (day) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'
        default:
            break;
    }
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const returnMonthName = (date) => {
    const newDate = new Date(date)
    return monthNames[newDate.getMonth()]
}

export const getDateString = (date) => {
    const newDate = new Date(date)
    return `
        ${returnDayName(newDate)}
        ${newDate.getDate()}
        ${returnMonthName(newDate)}
        ${newDate.getFullYear()}
    `
}

export const getDateDDMMYYYString = (date) => {
    const newDate = new Date(date)
    return `
        ${newDate.getDate()}
        ${returnMonthName(newDate)}
        ${newDate.getFullYear()}
    `
}