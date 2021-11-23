
const monthToString = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
}

const monthDays = {
  "Jan": 31,
  "Feb": 28, // Will be checked differently
  "Mar": 31,
  "Apr": 30,
  "May": 31,
  "Jun": 30,
  "Jul": 31,
  "Aug": 31,
  "Sep": 30,
  "Oct": 31,
  "Nov": 30,
  "Dec": 31,
}

/*
  If day, month, year parameters are provided => returns the date "dd mon yyyy"
  day => Number 
  month => String: "01" - "12"
  year => Number

  If day, month, year are not provided, it returns Today in same format
*/
const getStringDate = (customDay, customMonth, customYear) => {
  
  if (customDay && customMonth && customYear)
    return `${customDay} ${monthToString[customMonth]} ${customYear}`
    
  let today = new Date()
  let day = String(today.getDate()).padStart(2, '0')
  let month = String(today.getMonth() + 1).padStart(2, '0')
  let year = today.getFullYear()
  return `${day} ${monthToString[month]} ${year}`
} 

const extractMonthAndYear = (dateString) => {

  return dateString.split(" ").slice(1).join(" ")
}

const isLeapYear = (year) => {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

/*
  dateString => Jan 2021
*/
const isFromThisMonth = (dayNumber, dateString) => {

  let [month, year] = dateString.split(" ")
  let daysInMonth = undefined
  if (month === "Feb" && isLeapYear(Number(year)))
    daysInMonth = 29
  else 
    daysInMonth = monthDays[month]

  if (dayNumber <= daysInMonth)
    return true 
  
  return false
}

const daysInMonth = (monthYear) => {
  
  let [month, year] = monthYear.split(" ")
  let daysInMonth = undefined
  if (month === "Feb" && isLeapYear(Number(year)))
    daysInMonth = 29
  else 
    daysInMonth = monthDays[month]

  return daysInMonth
}

const numberToMonthName = (number) => {

  let numberStr = number < 10 ? "0" + String(number) : String(number) 
  return monthToString[numberStr]
}

export { getStringDate, extractMonthAndYear, isFromThisMonth, isLeapYear, daysInMonth, numberToMonthName }